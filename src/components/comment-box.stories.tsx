import type { Meta, StoryObj } from '@storybook/react';
import CommentBox from '@/components/comment-box';

const meta: Meta<typeof CommentBox> = {
  title: 'Components/CommentBox',
  component: CommentBox,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommentBox>;

export const Default: Story = {
  args: {
    productId: '1',
  },
};

export const Loading: Story = {
  args: {
    productId: '1',
  },
  parameters: {
    msw: {
      handlers: [
        // You can override MSW handlers here for specific stories
      ],
    },
  },
};
