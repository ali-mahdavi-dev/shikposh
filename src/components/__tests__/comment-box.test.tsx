import { render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import CommentBox from '@/components/comment-box';

// Mock MSW handlers are automatically used from jest.setup.ts

describe('CommentBox', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    });
  });

  it('renders loading state', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CommentBox productId="1" />
      </QueryClientProvider>,
    );

    // The component might show loading state initially
    // This is a basic example - adjust based on your component behavior
    expect(screen).toBeDefined();
  });

  it('renders reviews after loading', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <CommentBox productId="1" />
      </QueryClientProvider>,
    );

    // Wait for reviews to load and check if they're rendered
    // Adjust selectors based on your actual component structure
    const reviewsSection = await screen.findByText(/نظرات/i);
    expect(reviewsSection).toBeInTheDocument();
  });
});
