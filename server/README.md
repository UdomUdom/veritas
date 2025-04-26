# Veritas - Server

The Veritas Server is the backend component of the Veritas application, designed to handle business logic, database interactions, and API endpoints. It is built using Elysia.js, a fast and elegant framework for building APIs in TypeScript, and optimized for deployment on AWS Lambda. The database layer is powered by Supabase, a modern open-source alternative to Firebase.

## Features

- **Fast & Scalable API**: Built with Elysia.js, a lightweight and performant framework for TypeScript.
- **Serverless Deployment**: Optimized for AWS Lambda, ensuring cost-effective and scalable infrastructure.
- **Database Management**: Uses Supabase for seamless database interactions, authentication, and real-time capabilities.
- **Developer-Friendly**: Clean project structure, TypeScript-first approach, and comprehensive documentation.
- **Test Coverage**: Includes a robust test suite for reliability and maintainability.

## Project Structure

```
.
├── node_modules/
├── src/
│   ├── controllers/
│   ├── db/
│   ├── libs/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── test/
│   ├── utils/
│   ├── app.ts
│   ├── index.ts
│   └── server.ts
├── .env
├── .env.example
├── dockerfile
├── drizzle.config.js
├── package.json
├── serverless.yml
└── tsconfig.json
```

## Prerequisites

- Node.js (v16 or higher)
- bun (recommended for faster builds)
- AWS CLI (for deploying to AWS Lambda)
- Supabase Account (for database)

## Setup

1. Install dependencies

```sh
$ bun install
```

2. Configure Environment Variables

Create a `.env` file in the root directory and populate it with the required variables. Refer to `.env.example` for guidance:

```sh
# Application Settings
PORT=
NODE_ENV=
DOMAIN=

# Supabase Configuration
SUPABASE_URL=
SUPABASE_ANON_KEY=

# Payment Gateway
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_KEY=
```

3. Run the Server Locally

```sh
$ bun run dev
```

The server will start on `localhost`.

## Deployment

The server is configured for serverless deployment on AWS Lambda. Follow the steps below to deploy:

1. Build the Server

```sh
$ bun run build
```

This will generate a production-ready build in the `dist/` directory.

2. Run the Server Locally

```sh
$ bun run start
```

After deployment, the output will include the API Gateway endpoint URL.

## Testing

Run the test suite using the following command:

```sh
$ bun test
```

## Technologies Used

- **Elysia.js**: A fast and elegant framework for building APIs in TypeScript.
- **Supabase**: An open-source Firebase alternative for database and authentication.
- **AWS Lambda**: Serverless compute service for running code without managing servers.
- **TypeScript**: A statically typed superset of JavaScript for enhanced developer experience.
- **Serverless Framework**: Simplifies deployment and management of serverless applications.
