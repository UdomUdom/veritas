# Veritas - Server

This is the server-side application for the Veritas project. It is built using Bun, ElysiaJS, and PostgreSQL.

# Table of Contents

- [Veritas - Server](#veritas---server)
- [Table of Contents](#table-of-contents)
- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Database](#database)
- [Running the Server](#running-the-server)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [License](#license)

# Requirements

- [Bun](https://bun.sh/)
- [Docker](https://www.docker.com/)

# Installation

1. Clone the repository:

```sh
$ git clone https://github.com/naxn1a/veritas.git

$ cd veritas/server
```

2. Install dependencies:

```sh
$ bun install
```

# Configuration

Create a `.env` file in the server directory with the following content:

```sh
# Application
NODE_ENV=development
PORT={PORT}
SECRET_KEY={YOUR-SECRET-KEY}

# Database
DATABASE_URL="postgres://{USER}:{PASS}@{HOST}:{PORT}/{DB}"
```

# Database

1. Push the schema to the database:

```sh
$ bun db:push
```

2. Seed the database with initial data:

```sh
$ bun db:seed
```

3. (Optional) Open Drizzle Studio to explore the database:

```sh
$ bun db:std
```

# Running the Server

1. Start the server in development mode:

```sh
bun dev
```

2. Start the server in production mode:

```sh
bun start
```

# API Documentation

The API documentation is generated using Swagger. Once the server is running, you can access the documentation at:

```sh
http://{HOST}/swagger
```

# Project Structure

```sh
server/
├── src/
│   ├── app.ts
│   ├── config/
│   │   └── index.ts
│   ├── controllers/
│   │   └── *
│   ├── db/
│   │   ├── index.ts
│   │   ├── schema/
│   │   ├── raw/
│   │   └── seed.ts
│   ├── middlewares/
│   │   └── index.ts
│   ├── routes/
│   │   └── index.ts
│   ├── services/
│   │   └── users/
│   │       └── *
│   ├── tests/
│   │   └── helloworld.test.js
│   └── utils/
│       ├── Auth.ts
│       ├── ErrorHandler.ts
│       ├── Hash.ts
│       ├── UserProfile.ts
│       └── Year.ts
├── .env
├── .gitignore
├── drizzle.config.js
├── package.json
├── tsconfig.json
└── README.md
```

# License

This project is licensed under the MIT License. See the [LICENSE](https://github.com/naxn1a/veritas/blob/main/LICENSE) file for details.
