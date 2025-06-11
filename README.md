# 💸 Dirhamly

Dirhamly abudgeting app built to help you track your expenses, plan goals, and grow your savings effortlessly.

---

## 🧰 Tech Stack

- [TanStack Start](https://tanstack.com/start/latest)
- [Tanstack query](https://tanstack.com/query/latest)
- [Tanstack Router](https://tanstack.com/router/latest)
- Node.js 22
- TypeScript
- PostgreSQL
- Drizzle ORM
- Better Auth
- TailwindCSS + Shadcn UI
- Docker
- pnpm
- Biomejs

already added zod, rhf and zustand.

---

## ⚙️ Prerequisites

- [Node.js 22+](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [pnpm](https://pnpm.io/) or any package manager of your choice.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dirhamlyinc/dirham.git
cd dirham
```

### 2. Install dependencies

```bash
pnpm install
```

### 3. Set up your environment variables

Create a `.env.local` file in the root of the project:

```env
# Database
DATABASE_URL=postgres://<user>:<password>@<host>:<port>/<database>

# Google OAuth (if applicable)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Better Auth
BETTER_AUTH_SECRET=
BETTER_AUTH_URL=http://localhost:3000

# App base URL
BASE_URL=http://localhost:3000
```

> Replace placeholders with your actual credentials.

---

## 🗄️ PostgreSQL with Docker

Start a local PostgreSQL container:

```bash
docker run -d \
  --name dirhamly-db \
  -e POSTGRES_USER=<user> \
  -e POSTGRES_PASSWORD=<password> \
  -e POSTGRES_DB=<database> \
  -p 5432:5432 \
  postgres
```

---

## 🧱 Database Setup (Drizzle ORM)

### 1. Push schema

```bash
pnpm db push
```

### 2. (Optional) Generate Drizzle client

```bash
pnpm db generate
```

---

## 🧪 Run the Development Server

```bash
pnpm dev
```

Server will boot up at [http://localhost:3000](http://localhost:3000).

---

## 🔧 Docker Commands

- Restart DB:

  ```bash
  docker restart dirhamly-db
  ```

- Stop + remove DB container:

  ```bash
  docker stop dirhamly-db
  docker rm dirhamly-db
  ```

## 📄 License

MIT © 2025 Amine
