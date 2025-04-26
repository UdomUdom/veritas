# Veritas

Veritas is a full-stack application consisting of a client and server . The client is built with Next.js and deployed on Vercel , while the server is designed for serverless deployment using AWS Lambda .

## Project Structure

```
.
├── .github/
│   └── workflows/         # GitHub Actions workflows for CI/CD
├── client/                # Next.js frontend application
└── server/                # Backend application optimized for serverless deployment
```

### Client

The client is a Next.js application located in the `client/` directory. It includes configuration files for ESLint, Prettier, TypeScript and Tailwind CSS.

For more details, see [client/README.md](client/README.md).

### Server

The server is a backend application located in the `server/` directory. It includes configuration for serverless deployment using AWS Lambda and uses Supabase for database management and authentication.

For more details, see [server/README.md](server/README.md).

## Deployment
- **Client**: Deployed on Vercel .
- **Server**: Configured for serverless deployment on AWS Lambda .

## CI/CD with GitHub Actions

This repository uses GitHub Actions to automate the build, test, and deployment processes for both the client and server components.

## Secrets Management

To ensure secure deployment, sensitive information such as API keys and credentials are stored as GitHub Secrets . Below is a list of required secrets:

### Client Secrets
- API_URL
- SUPABASE_URL
- SUPABASE_ANON_KEY
- STRIPE_PUBLIC_KEY
- VERCEL_TOKEN
- VERCEL_ORG_ID
- VERCEL_PROJECT_ID

### Server Secrets
- AWS_ACCESS_KEY_ID
- AWS_SECRET_ACCESS_KEY

These secrets can be added in the Settings > Secrets and Variables > Actions section of your GitHub repository.

## Comment Conventions

- `// TODO`: Describe what needs to be implemented.
- `// FIXME`: Describe known bugs that need to be fixed.
- `// HACK`: Describe temporary workarounds or quick fixes.
- `// OPTIMIZE`: Describe areas for performance improvement.
- `// REVIEW`: Indicate areas that need code or logic review.

## License

This project is licensed under the terms of the [LICENSE](LICENSE) file.
