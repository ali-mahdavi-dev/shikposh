import React from 'react';
import { Button, Card, Typography } from 'antd';
import { WifiOutlined, ReloadOutlined, HomeOutlined } from '@ant-design/icons';
import Link from 'next/link';

const { Title, Paragraph } = Typography;

export default function OfflinePage() {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-pink-50 to-purple-50 p-4">
      <Card className="w-full max-w-md text-center shadow-2xl">
        <div className="mb-6">
          <WifiOutlined className="mb-4 text-6xl text-gray-400" />
          <Title level={2} className="text-gray-800">
            اتصال اینترنت قطع است
          </Title>
          <Paragraph className="text-lg text-gray-600">
            متأسفانه در حال حاضر به اینترنت متصل نیستید. لطفاً اتصال خود را بررسی کنید و مجدداً تلاش
            کنید.
          </Paragraph>
        </div>

        <div className="space-y-3">
          <Button
            type="primary"
            size="large"
            icon={<ReloadOutlined />}
            onClick={handleRefresh}
            className="h-12 w-full rounded-xl"
          >
            تلاش مجدد
          </Button>

          <Link href="/">
            <Button size="large" icon={<HomeOutlined />} className="h-12 w-full rounded-xl">
              بازگشت به صفحه اصلی
            </Button>
          </Link>
        </div>

        <div className="mt-6 rounded-lg bg-blue-50 p-4">
          <Paragraph className="mb-0 text-sm text-blue-800">
            💡 <strong>نکته:</strong> برخی از صفحات ممکن است در حالت آفلاین نیز در دسترس باشند.
          </Paragraph>
        </div>
      </Card>
    </div>
  );
}
