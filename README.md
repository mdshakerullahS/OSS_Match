# OSS Match 🚀

**OSS Match** is a GitHub API–powered platform that matches developers with relevant open-source issues based on their interests and skills. It’s built with a modern full-stack setup focused on performance, scalability, and developer experience.

---

## ✨ Features

- 🔐 **Authentication**
  - Secure authentication using **NextAuth**
  - OAuth login with **GitHub**

- 🧠 **Smart Issue Matching**
  - Fetches and filters GitHub issues using the GitHub API
  - Helps developers discover meaningful open-source contributions

- 🎛️ **Advanced Filtering**
  - Filter issues by labels (e.g. `good first issue`, `help wanted`) & languages (e.g. `TypeScript`, `Python`)
  - Keyword search for precise issue discovery

- 🗄️ **Database**
  - **PostgreSQL** for reliable data storage
  - **Prisma ORM** for type-safe and efficient database access

- ⚡ **Caching & Rate Limiting**
  - **Upstash Redis** for caching GitHub API responses
  - **Upstash Rate Limiting** to prevent abuse and stay within API limits (For unauthenticated users)

- 📝 **Form Handling**
  - Robust and accessible form handling with **React Hook Form**

- 🚀 **Performance-Focused**
  - Reduced API calls via caching
  - Optimized queries with Prisma
  - Secure and scalable architecture

---

## 🛠️ Tech Stack

- **Language:** TypeScript
- **Framework:** Next.js
- **Auth:** NextAuth.js (GitHub OAuth)
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Caching:** Upstash Redis
- **Rate Limiting:** Upstash Rate Limiting
- **Forms:** React Hook Form
- **API:** GitHub REST API
- **Containerization:** Docker

---

## 📦 Installation

```bash
git clone https://github.com/mdshakerullahS/OSS_Match.git
cd OSS_Match
npm install # If running without Docker
```

---

## 🔐 Environment Variables

Create a .env file and add:

```bash
# With Docker
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=

GITHUB_ACCESS_TOKEN=

POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
DATABASE_URL=

REDIS_URL=

# Without Docker
GITHUB_ID=
GITHUB_SECRET=
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET=

GITHUB_ACCESS_TOKEN=

DATABASE_URL=

UPSTASH_REDIS_REST_URL=
UPSTASH_REDIS_REST_TOKEN=
```

---

## ▶️ Running the Project

```bash
#With Docker
docker compose exec app npx prisma migrate dev
docker compose up --build

# Without Docker
npx prisma migrate dev
npm run dev
```

App will be available at:
http://localhost:3000

---

## 📸 Screenshot

![Preview](Screenshot.png)

---

## 📄 License

This project is licensed under the **MIT License**.
See the `LICENSE` file for full details.

---

## 🧑‍💻 Developer

**Md Shakerullah Sourov** Full Stack Developer

- LinkedIn: [https://linkedin.com/in/mdshakerullah](https://linkedin.com/in/mdshakerullah)
- Email: [sourovmdshakerullah@gmail.com](mailto:sourovmdshakerullah@gmail.com)

---

## ⭐ Show Your Support

If you like this project, please give it a ⭐ on GitHub!

Happy Coding 🚀

---
