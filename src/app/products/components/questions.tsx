'use client';
import React from 'react';
import { Card, List, Input, Button, Typography, Empty } from 'antd';
import { useAppDispatch } from '@/stores/hooks';
import { pushNotification } from '@/stores/slices/notificationSlice';

const { Text, Title } = Typography;

type Reply = {
  id: string;
  text: string;
  author: string;
  createdAt: string;
};

type Question = {
  id: string;
  text: string;
  author: string;
  createdAt: string;
  replies: Reply[];
};

function loadFromStorage(productId: string): Question[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(`qa:${productId}`);
    return raw ? (JSON.parse(raw) as Question[]) : [];
  } catch {
    return [];
  }
}

function saveToStorage(productId: string, data: Question[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(`qa:${productId}`, JSON.stringify(data));
  } catch {}
}

export default function Questions({ productId }: { productId: string }) {
  const dispatch = useAppDispatch();
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [newQuestion, setNewQuestion] = React.useState<string>('');
  const [replyTextById, setReplyTextById] = React.useState<Record<string, string>>({});

  React.useEffect(() => {
    setQuestions(loadFromStorage(productId));
  }, [productId]);

  const addQuestion = () => {
    if (!newQuestion.trim()) return;
    const q: Question = {
      id: crypto.randomUUID(),
      text: newQuestion.trim(),
      author: 'کاربر مهمان',
      createdAt: new Date().toISOString(),
      replies: [],
    };
    const next = [q, ...questions];
    setQuestions(next);
    saveToStorage(productId, next);
    setNewQuestion('');
    // push notification
    dispatch(
      pushNotification({
        type: 'question',
        title: 'سوال جدید درباره محصول',
        message: q.text,
        meta: { productId },
      }),
    );
  };

  const addReply = (questionId: string) => {
    const text = (replyTextById[questionId] || '').trim();
    if (!text) return;
    const next = questions.map((q) =>
      q.id !== questionId
        ? q
        : {
            ...q,
            replies: [
              {
                id: crypto.randomUUID(),
                text,
                author: 'پاسخ‌دهنده',
                createdAt: new Date().toISOString(),
              },
              ...q.replies,
            ],
          },
    );
    setQuestions(next);
    saveToStorage(productId, next);
    setReplyTextById((s) => ({ ...s, [questionId]: '' }));
    dispatch(
      pushNotification({
        type: 'question',
        title: 'پاسخ جدید به سوال',
        message: text,
        meta: { productId, questionId },
      }),
    );
  };

  return (
    <div className="space-y-4">
      <Card className="rounded-2xl">
        <Title level={4} className="!m-0 text-gray-800">
          پرسش خود را مطرح کنید
        </Title>
        <div className="mt-3 flex gap-2">
          <Input.TextArea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            placeholder="سوال خود را اینجا بنویسید..."
            autoSize={{ minRows: 2, maxRows: 6 }}
          />
          <Button type="primary" onClick={addQuestion} className="self-start rounded-xl">
            ثبت سوال
          </Button>
        </div>
      </Card>

      <Card className="rounded-2xl !border-2 !border-pink-200 !mt-10">
        <Title level={4} className="!mt-0 text-gray-800">
          سوالات کاربران
        </Title>
        {!questions.length ? (
          <Empty description="هنوز سوالی ثبت نشده" />
        ) : (
          <List
            itemLayout="vertical"
            dataSource={questions}
            renderItem={(q) => (
              <List.Item key={q.id}>
                <div className="space-y-2">
                  <div className="rounded-xl bg-gray-50 p-3">
                    <div className="mb-1 text-sm text-gray-500">
                      <Text strong>{q.author}</Text>
                      <span className="mx-2">•</span>
                      <span>{new Date(q.createdAt).toLocaleDateString('fa-IR')}</span>
                    </div>
                    <Text className="text-gray-800">{q.text}</Text>
                  </div>

                  <div className="flex gap-2">
                    <Input
                      placeholder="پاسخ خود را بنویسید..."
                      value={replyTextById[q.id] || ''}
                      onChange={(e) =>
                        setReplyTextById((s) => ({ ...s, [q.id]: e.target.value }))
                      }
                      onPressEnter={() => addReply(q.id)}
                    />
                    <Button onClick={() => addReply(q.id)}>ثبت پاسخ</Button>
                  </div>

                  {!!q.replies.length && (
                    <div className="space-y-2 rounded-xl bg-white p-2">
                      {q.replies.map((r) => (
                        <div key={r.id} className="rounded-lg border border-gray-100 p-2">
                          <div className="mb-1 text-xs text-gray-500">
                            <Text strong>{r.author}</Text>
                            <span className="mx-2">•</span>
                            <span>{new Date(r.createdAt).toLocaleDateString('fa-IR')}</span>
                          </div>
                          <Text className="text-gray-700">{r.text}</Text>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </List.Item>
            )}
          />
        )}
      </Card>
    </div>
  );
}


