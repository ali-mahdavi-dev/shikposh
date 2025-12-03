'use client';

import React, { useState } from 'react';

const Questions: React.FC<{ productId: string | number }> = ({ productId }) => {
  const [question, setQuestion] = useState('');
  const [items, setItems] = useState<Array<{ id: number; text: string }>>([]);

  const submit = () => {
    const text = question.trim();
    if (!text) return;
    setItems((prev) => [{ id: Date.now(), text }, ...prev]);
    setQuestion('');
  };

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <input
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="سوال خود را بپرسید"
          className="flex-1 rounded-lg border px-3 py-2"
        />
        <button onClick={submit} className="rounded-lg bg-pink-600 px-4 py-2 text-white">
          ارسال
        </button>
      </div>
      <ul className="space-y-2">
        {items.map((q) => (
          <li key={q.id} className="rounded-lg border bg-white px-3 py-2 text-sm text-gray-700">
            {q.text}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Questions;

