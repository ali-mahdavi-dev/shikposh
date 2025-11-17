# 🛍️ Shikposh - Modern E-Commerce Frontend

> A cutting-edge e-commerce platform built with Next.js 15, React 19, and TypeScript. Featuring a modern tech stack, optimized performance, and a beautiful user experience.

[![Next.js](https://img.shields.io/badge/Next.js-15.5.4-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1.13-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## 🎬 Demo

![Demo](public/gif/demo.gif)

### 🔗 Related Projects

- **Backend Repository**: [shikposh-backend](https://github.com/ali-mahdavi-dev/shikposh-backend) - Enterprise e-commerce backend built with Go, Fiber, and Clean Architecture

---

## 📑 Table of Contents

- [✨ Features](#-features)
  - [🚀 Performance & Modern Stack](#-performance--modern-stack)
  - [🎨 UI/UX Excellence](#-uiux-excellence)
  - [🔄 State Management & Data](#-state-management--data)
  - [🛠️ Developer Experience](#️-developer-experience)
  - [⚡ Performance Optimizations](#-performance-optimizations)
- [🛠️ Tech Stack](#️-tech-stack)
- [📋 Prerequisites](#-prerequisites)
- [🚀 Quick Start](#-quick-start)
- [📜 Available Scripts](#-available-scripts)
- [📁 Project Structure](#-project-structure)
- [💻 Development Guide](#-development-guide)
- [🧪 Testing](#-testing)
- [🏗️ Build & Deployment](#️-build--deployment)
- [🎯 Key Features & Highlights](#-key-features--highlights)
- [🤝 Contributing](#-contributing)

---

## ✨ Features

### 🚀 Performance & Modern Stack

- ⚡ **Next.js 15** with Turbopack for lightning-fast development
- ⚛️ **React 19** with latest features and optimizations
- 🎯 **TypeScript** for type-safe development
- 🔥 **Turbopack** for ultra-fast bundling

### 🎨 UI/UX Excellence

- 💅 **Tailwind CSS 4** for utility-first styling
- 🎭 **Ant Design 5** for enterprise-grade UI components
- 🎬 **Framer Motion** for smooth animations
- 📱 **PWA Support** - Progressive Web App capabilities
- 🌐 **RTL Support** - Full right-to-left support for Persian/Farsi

### 🔄 State Management & Data

- 🗂️ **Redux Toolkit** for global state management
- 📡 **React Query (TanStack Query)** for server state and caching
- 🔌 **Optimized API Integration** with interceptors and error handling

### 🛠️ Developer Experience

- 📚 **Storybook** for component development and documentation
- 🧪 **Jest & Testing Library** for comprehensive testing
- 🎨 **Vitest** for fast unit testing
- 🔍 **ESLint & Prettier** for code quality
- 🎯 **Path Aliases** for clean imports

### ⚡ Performance Optimizations

- 📦 **Code Splitting** - Automatic chunk optimization
- 🖼️ **Image Optimization** - Next.js Image component
- 🚀 **Lazy Loading** - React.lazy and Suspense
- 🗜️ **Bundle Optimization** - Smart code splitting
- 🎯 **Tree Shaking** - Unused code elimination

---

## 🛠️ Tech Stack

### Core Framework

| Technology     | Version | Purpose                      |
| -------------- | ------- | ---------------------------- |
| **Next.js**    | 15.5.4  | React framework with SSR/SSG |
| **React**      | 19.1.0  | UI library                   |
| **TypeScript** | 5.0     | Type-safe JavaScript         |

### UI & Styling

| Technology        | Version  | Purpose                         |
| ----------------- | -------- | ------------------------------- |
| **Tailwind CSS**  | 4.1.13   | Utility-first CSS framework     |
| **Ant Design**    | 5.27.4   | Enterprise UI component library |
| **Framer Motion** | 12.23.22 | Animation library               |
| **React Slick**   | 0.31.0   | Carousel component              |

### State & Data Management

| Technology        | Version | Purpose                |
| ----------------- | ------- | ---------------------- |
| **Redux Toolkit** | 2.9.2   | State management       |
| **React Query**   | 5.90.5  | Server state & caching |
| **React Redux**   | 9.2.0   | React-Redux bindings   |

### Development Tools

| Technology    | Version | Purpose               |
| ------------- | ------- | --------------------- |
| **Storybook** | 10.0.1  | Component development |
| **Jest**      | 30.2.0  | Testing framework     |
| **Vitest**    | 4.0.5   | Fast unit testing     |
| **ESLint**    | 9.0     | Code linting          |
| **Prettier**  | 3.6.2   | Code formatting       |

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher
- **Yarn** (or npm) package manager
- **Git** for version control

---

## 🚀 Quick Start

### 1️⃣ Clone the Repository

```bash
git clone <repository-url>
cd shikposh/front
```

### 2️⃣ Install Dependencies

```bash
yarn install
# or
npm install
```

### 3️⃣ Start Development Server

**Option A: Full Development Environment** (Recommended)

```bash
yarn dev:full
```

This starts both Next.js and JSON Server (Mock API) simultaneously.

**Option B: Separate Services**

```bash
# Terminal 1: Start Mock API
yarn json-server

# Terminal 2: Start Next.js
yarn dev
```

### 4️⃣ Access the Application

- 🌐 **Next.js App**: http://localhost:3000
- 🔌 **Mock API**: http://localhost:3001
- 📚 **Storybook**: http://localhost:6006 (run `yarn storybook`)

---

## 📜 Available Scripts

### Development

```bash
yarn dev:full      # Start full dev environment (Next.js + Mock API)
yarn dev           # Start Next.js with Turbopack
yarn json-server   # Start JSON Server for Mock API
yarn mock:api      # Alias for json-server
```

### Build & Production

```bash
yarn build         # Build for production
yarn start         # Start production server
```

### Testing

```bash
yarn test          # Run all tests
yarn test:watch    # Run tests in watch mode
yarn test:coverage # Run tests with coverage report
```

### Code Quality

```bash
yarn lint          # Run ESLint
yarn format        # Format code with Prettier
yarn format:check  # Check code formatting
```

### Storybook

```bash
yarn storybook           # Start Storybook dev server
yarn build-storybook     # Build Storybook for deployment
```

### Utilities

```bash
yarn cleanup-ports  # Clean up used ports
```

---

## 📁 Project Structure

```
front/
├── 📂 public/              # Static assets
│   ├── fonts/             # Custom fonts (Vazir)
│   ├── images/            # Image assets
│   ├── icons/             # PWA icons
│   └── manifest.json      # PWA manifest
│
├── 📂 src/
│   ├── 📂 app/            # Next.js App Router
│   │   ├── _components/   # Shared components
│   │   │   ├── layout/   # Layout components
│   │   │   ├── business/ # Business logic components
│   │   │   ├── ui/        # Base UI components
│   │   │   └── skeleton/  # Loading skeletons
│   │   ├── products/      # Product pages
│   │   ├── profile/       # User profile
│   │   ├── cart/          # Shopping cart
│   │   ├── wishlist/      # Wishlist
│   │   └── ...
│   │
│   ├── 📂 configs/        # Configuration files
│   ├── 📂 providers/      # React providers (Redux, Query, Theme)
│   ├── 📂 shared/         # Shared utilities & components
│   ├── 📂 stores/         # Redux store & slices
│   ├── 📂 types/          # TypeScript type definitions
│   └── 📂 utils/          # Helper functions
│
├── 📂 scripts/            # Utility scripts
├── 📂 stories/            # Storybook stories
├── 📂 tailwind/          # Tailwind configuration
│
├── next.config.ts         # Next.js configuration
├── tailwind.config.ts     # Tailwind CSS configuration
├── tsconfig.json          # TypeScript configuration
└── package.json           # Dependencies & scripts
```

### 🗺️ Route Structure

The project uses **Next.js App Router**:

| Route              | Description     |
| ------------------ | --------------- |
| `/`                | Homepage        |
| `/products`        | Product listing |
| `/products/[slug]` | Product details |
| `/cart`            | Shopping cart   |
| `/wishlist`        | User wishlist   |
| `/profile`         | User profile    |
| `/seller/[id]`     | Seller page     |
| `/about`           | About page      |
| `/contact`         | Contact page    |
| `/chat`            | Chat interface  |
| `/notification`    | Notifications   |

---

## 💻 Development Guide

### Path Aliases

The project uses path aliases for cleaner imports:

```typescript
import { Component } from '@/app/_components';
import { Button } from '@shared/components';
import { useAppSelector } from '@stores/hooks';
import { theme } from '@configs/theme';
```

**Available Aliases:**

- `@/*` → `./src/*`
- `@app/*` → `./src/app/*`
- `@shared/*` → `./src/shared/*`
- `@stores/*` → `./src/stores/*`
- `@configs/*` → `./src/configs/*`
- `@providers/*` → `./src/providers/*`
- `@types/*` → `./src/types/*`

### Component Architecture

Components are organized in a modular structure:

- **`layout/`** - Layout components (Header, Footer)
- **`business/`** - Business logic components (ProductCard, CategoryCard)
- **`ui/`** - Base UI components
- **`skeleton/`** - Loading skeleton components

### State Management Strategy

- **Redux Toolkit**: Global state (authentication, cart, user preferences)
- **React Query**: Server state, API data, and caching

### Styling Approach

- **Tailwind CSS**: Utility-first styling
- **Ant Design**: Enterprise UI components
- **Framer Motion**: Smooth animations

**Color Palette:**

- Primary: `#409af5` (Blue)
- Secondary: `#7ed957` (Green)
- Tertiary: `#c699f1` (Purple)

### RTL Support

Full right-to-left support for Persian/Farsi:

- Vazir font for Persian text
- Ant Design RTL configuration
- Tailwind RTL utilities

---

## 🧪 Testing

### Running Tests

```bash
# Run all tests
yarn test

# Watch mode
yarn test:watch

# With coverage
yarn test:coverage
```

### Writing Tests

Tests are written using Jest and React Testing Library:

```typescript
import { render, screen } from '@testing-library/react';
import { Component } from './Component';

describe('Component', () => {
  it('should render correctly', () => {
    render(<Component />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

---

## 🏗️ Build & Deployment

### Production Build

```bash
# Build the project
yarn build

# Start production server
yarn start
```

### Performance Optimizations

The project includes several performance optimizations:

- ✅ **Code Splitting** - Automatic chunk optimization
- ✅ **Tree Shaking** - Unused code elimination
- ✅ **Image Optimization** - Next.js Image component
- ✅ **Bundle Optimization** - Smart code splitting
- ✅ **Lazy Loading** - React.lazy and Suspense
- ✅ **Compression** - Gzip/Brotli compression

### Deployment Options

#### Vercel (Recommended)

The project is optimized for Vercel deployment:

1. Connect your repository to Vercel
2. Automatic Next.js configuration
3. Automatic deployments on push

#### Docker

```bash
# Build Docker image
docker build -t shikposh-front .

# Run container
docker run -p 3000:3000 shikposh-front
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8080
NODE_ENV=development
```

---

## 🎯 Key Features & Highlights

### ⚡ Performance

- React.lazy and Suspense for code splitting
- Optimized images with Next.js Image
- Turbopack for faster development builds
- Smart bundle optimization

### 🔒 Security

- Security headers configured in `next.config.ts`
- Content Security Policy for SVG
- XSS Protection enabled
- Secure cookie handling

### ♿ Accessibility

- Ant Design components are accessible by default
- Storybook with a11y addon for accessibility testing
- Semantic HTML structure
- ARIA attributes where needed

### 📱 Progressive Web App

- Service worker for offline support
- App manifest for installability
- Responsive design for all devices
- Fast loading times

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. 🍴 Fork the repository
2. 🌿 Create a feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 Commit your changes (`git commit -m 'Add amazing feature'`)
4. 📤 Push to the branch (`git push origin feature/amazing-feature`)
5. 🔀 Open a Pull Request

---

<div align="center">

**Built with ❤️ for Shikposh**

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)](https://www.typescriptlang.org/)

</div>
