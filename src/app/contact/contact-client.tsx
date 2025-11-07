'use client';
import React from 'react';
import { Card, Typography, Form, Input, Button, App } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function ContactClient() {
  const { notification } = App.useApp();
  const [form] = Form.useForm();

  const onFinish = async () => {
    notification.success({ message: 'پیام شما ارسال شد', description: 'به زودی با شما تماس می‌گیریم.' });
    form.resetFields();
  };

  return (
    <>
      <div className="mb-8 text-center">
        <Title level={2} className="text-gray-800">تماس با ما</Title>
        <Paragraph className="text-gray-600">سوال یا پیشنهادی دارید؟ خوشحال می‌شویم بشنویم.</Paragraph>
      </div>

      <Card className="rounded-2xl shadow-sm">
        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item name="name" label="نام" rules={[{ required: true, message: 'نام را وارد کنید' }]}>
            <Input placeholder="نام شما" />
          </Form.Item>
          <Form.Item name="email" label="ایمیل" rules={[{ required: true, message: 'ایمیل را وارد کنید' }, { type: 'email', message: 'ایمیل معتبر نیست' }]}>
            <Input placeholder="ایمیل شما" />
          </Form.Item>
          <Form.Item name="message" label="پیام" rules={[{ required: true, message: 'پیام را وارد کنید' }, { min: 10, message: 'پیام حداقل ۱۰ کاراکتر باشد' }]}>
            <Input.TextArea rows={5} placeholder="پیام شما" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="rounded-xl border-0 bg-gradient-to-r from-pink-500 to-purple-600">
              ارسال پیام
            </Button>
          </Form.Item>
        </Form>
        <div className="mt-6 space-y-1 text-sm text-gray-600">
          <Text>ایمیل پشتیبانی: support@shikposhan.ir</Text>
          <br />
          <Text>تلفن: 021-00000000</Text>
        </div>
      </Card>
    </>
  );
}


