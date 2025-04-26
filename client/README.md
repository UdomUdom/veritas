# Veritas - Client

The Veritas Client is the frontend component of the Veritas application, built using Next.js, a powerful React framework for building modern web applications. It is optimized for deployment on Vercel and integrates seamlessly with Supabase Auth for authentication. The styling is handled by Tailwind CSS, ensuring a clean, responsive, and developer-friendly design system.

## Features

- **Next.js Framework**: Leverages server-side rendering (SSR), static site generation (SSG), and client-side rendering for optimal performance.
- **Authentication**: Built-in support for Supabase Auth, providing secure user authentication and session management.
- **Styling**: Styled with Tailwind CSS, offering utility-first classes for rapid UI development.
- **Vercel Deployment**: Optimized for seamless deployment on Vercel, ensuring fast and reliable hosting.
- **Responsive Design**: Fully responsive layouts designed to work across all devices.
- **Developer-Friendly**: Clean project structure, TypeScript-first approach, and comprehensive documentation.

## Project Structure

```sh
.
├── node_modules/
├── public/
├── src/
│   ├── app/
│   │   ├── (route)/
│   │   │   ├── page.tsx
│   │   │   └── layout.tsx
│   │   └── layout.tsx
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   ├── mock/
│   ├── provider/
│   ├── types/
│   └── utils/
├── .env
└── .env.example
```

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js (v16 or higher)
- npm or bun (recommended for faster builds)
- Vercel CLI (optional, for local testing and deployment)
- Supabase Account (for authentication)

## Setup

1. Install Dependencies

```sh
$ bun install
or
$ npm install
```

2. Configure Environment Variables

Create a `.env` file in the root directory and populate it with the required variables. Refer to `.env.example` for guidance:

```sh
# Api
NEXT_PUBLIC_API_URL=

# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=

# Payment Gateway
NEXT_PUBLIC_STRIPE_PUBLIC_KEY=
```

3. Run the Development Server

Start the development server:

```sh
$ bun run dev
```

The app will start on `localhost`.

## Deployment

The client is configured for deployment on Vercel. Follow the steps below to deploy:

1. Build the App

```sh
$ bun run build
```

This will generate a production-ready build in the `.next/` directory.

## Technologies Used

- **Next.js**: A React framework for building modern web applications with SSR, SSG, and CSR support.
- **Supabase Auth**: Secure user authentication and session management.
- **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
- **Vercel**: Hosting platform optimized for Next.js applications.
- **TypeScript**: A statically typed superset of JavaScript for enhanced developer experience.
