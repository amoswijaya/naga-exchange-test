# Naga Exchange Technical Test

## Tech Stack

- Node.js + Express
- PostgreSQL + Prisma
- Docker (PostgreSQL)

## Setup & Run

### 1. Clone Repository

```bash
git clone https://github.com/amoswijaya/naga-exchange-test.git
cd naga-exchange-test
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Setup Database

```bash
docker-compose up -d
cp  .env
```

### 4. Configure Environment Variables

Edit the `.env` file and add the following configuration:

```env
DATABASE_URL="postgresql://nagauser:nagapass@localhost:5432/nagadb"
JWT_SECRET=supersecretjwtkey123
PORT=4000
```

### 5. Run Database Migration

```bash
npx prisma migrate dev
```

### 6. Run Server

```bash
npm run dev
```

## API Endpoints

| Method | Endpoint               | Description               | Authentication |
| ------ | ---------------------- | ------------------------- | -------------- |
| POST   | `/register`            | Create new user           | No             |
| POST   | `/login`               | Login user                | No             |
| GET    | `/transaction`         | View transactions         | Bearer Token   |
| POST   | `/transaction/process` | Create/Update transaction | Bearer Token   |

## Authentication

For protected endpoints, include the Bearer token in the Authorization header:

```
Authorization: Bearer <your-token-here>
```
