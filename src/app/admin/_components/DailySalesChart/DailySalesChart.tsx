'use client';

import React from 'react';
import { Card } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface DailySalesData {
  date: string;
  sales: number;
  orders: number;
}

interface DailySalesChartProps {
  data?: DailySalesData[];
}

// Format date from YYYY-MM-DD to Persian format
const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr + 'T00:00:00');
  const dayName = date.toLocaleDateString('fa-IR', { weekday: 'short' });
  const dayNumber = date.getDate();
  const monthName = date.toLocaleDateString('fa-IR', { month: 'short' });
  return `${dayName} ${dayNumber} ${monthName}`;
};

export default function DailySalesChart({ data }: DailySalesChartProps) {
  // Format dates for display
  const chartData = (data || []).map((item) => ({
    ...item,
    date: formatDate(item.date),
  }));

  // Format number for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('fa-IR').format(value) + ' تومان';
  };

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat('fa-IR').format(value);
  };

  return (
    <Card title="میزان خرید روزانه (۷ روز گذشته)" className="w-full">
      <ResponsiveContainer width="100%" height={350}>
        <LineChart
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: 10,
            bottom: 60,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="date"
            tick={{ fill: '#666', fontSize: 11 }}
            angle={-45}
            textAnchor="end"
            height={80}
            interval={0}
          />
          <YAxis
            yAxisId="sales"
            orientation="right"
            tick={{ fill: '#666', fontSize: 11 }}
            tickFormatter={(value) => {
              if (value >= 1000000) {
                return `${(value / 1000000).toFixed(1)}M`;
              }
              return formatCurrency(value);
            }}
            width={100}
          />
          <YAxis
            yAxisId="orders"
            orientation="left"
            tick={{ fill: '#666', fontSize: 11 }}
            tickFormatter={formatNumber}
            width={60}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#fff',
              border: '1px solid #e8e8e8',
              borderRadius: '8px',
              padding: '8px 12px',
            }}
            formatter={(value: number, name: string) => {
              if (name === 'sales') {
                return [formatCurrency(value), 'مبلغ فروش'];
              }
              return [formatNumber(value), 'تعداد سفارش'];
            }}
            labelStyle={{ color: '#333', fontWeight: 'bold' }}
          />
          <Legend
            wrapperStyle={{ paddingTop: '20px' }}
            formatter={(value) => {
              if (value === 'sales') return 'مبلغ فروش';
              if (value === 'orders') return 'تعداد سفارش';
              return value;
            }}
          />
          <Line
            yAxisId="sales"
            type="monotone"
            dataKey="sales"
            stroke="#ec4899"
            strokeWidth={2}
            dot={{ fill: '#ec4899', r: 4 }}
            activeDot={{ r: 6 }}
            name="sales"
          />
          <Line
            yAxisId="orders"
            type="monotone"
            dataKey="orders"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ fill: '#8b5cf6', r: 4 }}
            activeDot={{ r: 6 }}
            name="orders"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
}

