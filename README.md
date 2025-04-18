# 📘 Azura Labs – Books Management App
Next.js App Router – MySQL – TypeScript

![Next.js](https://img.shields.io/badge/Next.js-15.3.0-black?logo=next.js)
![MySQL](https://img.shields.io/badge/Database-MySQL-blue?logo=mysql)
![TypeScript](https://img.shields.io/badge/Language-TypeScript-blue?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/UI-TailwindCSS-38B2AC?logo=tailwindcss)
![Zod](https://img.shields.io/badge/Validation-Zod-green)  
![TanStack Table](https://img.shields.io/badge/Table-TanStack%20Table-orange)

---

# NOTE: this project is still development, many concpets is wrong and must be refactor, change, and improve.

## 🧰 Requirements
- Node.js `>=18`
- MySQL Server
- Paket manager (npm/yarn/pnpm)

---

## 🚀 Getting Started

### 1. Clone Repository
```bash
git clone <your-repo-url>
cd azura-labs
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Database

#### ✅ Buat database baru
```sql
CREATE DATABASE db_books;
```

#### ⚡ Import init data

example

```bash
mysql -u root -p db_books < "D:\Documents\Programs\typescript\azura-labs\database\init.sql"
```
> Sesuaikan path ke lokasi `init.sql` di project.

### 4. Configure Environment Variables
Buat file `.env` dan isi:
```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=db_books
```

### 5. Jalankan Development Server
```bash
npm run dev
```
Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

---

## 🗂️ Route Structure (Next.js App Router)

```
└── 📁app
    └── 📁books
        ├── 📁[id]
        │   └── page.tsx               # Detail buku
        ├── 📁categories
        │   ├── 📁[slug]
        │   │   ├── loading.tsx
        │   │   └── page.tsx      # Buku by slug kategori
        │   ├── 📁category
        │   │   └── 📁[id]
        │   │       └── page.tsx  # Detail kategori
        │   ├── loading.tsx
        │   └── page.tsx              # List kategori
        ├── 📁create
        │   └── page.tsx              # Form tambah buku
        ├── 📁edit
        │   └── 📁[id]
        │       └── page.tsx          # Form edit buku
        ├── layout.tsx                    # Layout khusus modul books
        ├── loading.tsx
        └── page.tsx                      # List semua buku
```

---

## 📦 Tech Stack

- **Framework**: Next.js `15.3.0` (App Router)
- **Database**: MySQL `8+`
- **Driver**: `mysql2` (async/await ready)
- **Styling**: Tailwind CSS + shadcn/ui
- **Table/Data**: TanStack Table v8
- **Validation**: Zod
- **Form**: react-hook-form
- **Date Picker**: radix-ui + date-fns

---

## 📸 UI Preview (WIP)
![Preview](/assets/book-management.png)
![Preview](/assets/category-management.png)

---

> Dibuat dengan penuh semangat oleh mahasiswa yang punya harapan besar ❤️

