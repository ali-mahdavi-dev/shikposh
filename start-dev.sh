#!/bin/bash

echo "🚀 Starting Shikpush Development Environment..."
echo ""

# Function to cleanup processes on exit
cleanup() {
    echo ""
    echo "🛑 Shutting down servers..."
    kill $JSON_SERVER_PID 2>/dev/null
    kill $NEXTJS_PID 2>/dev/null
    exit 0
}

# Set up signal handlers
trap cleanup SIGINT SIGTERM

# Start JSON Server in background
echo "📡 Starting JSON Server on port 3001..."
yarn json-server &
JSON_SERVER_PID=$!

# Wait a moment for JSON Server to start
sleep 3

# Start Next.js in background
echo "⚛️  Starting Next.js on port 3000..."
yarn dev &
NEXTJS_PID=$!

echo ""
echo "✅ Servers started successfully!"
echo "🌐 Website: http://localhost:3000"
echo "📡 API: http://localhost:3001"
echo "📚 API Docs: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Wait for both processes
wait
