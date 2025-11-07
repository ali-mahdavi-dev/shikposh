'use client';
import React from 'react';
import { Card, Typography, Row, Col } from 'antd';

const { Title, Paragraph, Text } = Typography;

export default function AboutClient() {
  return (
    <>
      <div className="mb-8 text-center">
        <Title level={2} className="text-gray-800">درباره شیک‌پوشان</Title>
        <Paragraph className="text-gray-600">کیفیت، تجربه کاربری و پشتیبانی سریع</Paragraph>
      </div>
      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Card className="rounded-2xl shadow-sm">
            <Title level={4} className="text-gray-800">ماموریت ما</Title>
            <Paragraph className="text-gray-600">
              هدف ما ارائه تجربه خرید آنلاین ساده، سریع و لذت‌بخش برای پوشاک زنانه است. با
              انتخاب محصولات باکیفیت و ارائه خدمات پشتیبانی، تلاش می‌کنیم بهترین همراه شما باشیم.
            </Paragraph>
          </Card>
        </Col>
        <Col xs={24} md={12}>
          <Card className="rounded-2xl shadow-sm">
            <Title level={4} className="text-gray-800">ارزش‌ها</Title>
            <ul className="list-disc pr-5 text-gray-600">
              <li>کیفیت و اصالت کالا</li>
              <li>شفافیت در قیمت‌گذاری</li>
              <li>پشتیبانی مسئولانه</li>
              <li>تحویل سریع و مطمئن</li>
            </ul>
          </Card>
        </Col>
        <Col xs={24}>
          <Card className="rounded-2xl shadow-sm">
            <Title level={4} className="text-gray-800">تماس سریع</Title>
            <Paragraph className="text-gray-600">
              برای همکاری یا پرسش‌ها با ما از صفحه تماس با ما در ارتباط باشید.
            </Paragraph>
            <Text className="text-gray-700">ایمیل: support@shikposhan.ir</Text>
          </Card>
        </Col>
      </Row>
    </>
  );
}


