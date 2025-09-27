import Link from "next/link";
import { Result, Button } from "antd";

export default function Custom404() {
  return (
    <Result
      status="404"
      title="404 - صفحه یافت نشد"
      subTitle="به نظر می‌رسد این صفحه وجود ندارد."
      extra={
        <Link href="/">
          <Button type="primary">بازگشت به خانه</Button>
        </Link>
      }
    />
  );
}
