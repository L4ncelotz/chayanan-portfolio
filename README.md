# Certificate Portfolio

A modern, professional portfolio for showcasing certificates and achievements. Built with Next.js 14, Tailwind CSS, Framer Motion, and Prisma.

## 🚀 Features

- ✨ Modern UI with Spotlight effects
- 🌓 Dark/Light mode support
- 📱 Fully responsive design
- 🎬 Smooth animations with Framer Motion
- 🔍 Advanced filtering and search
- 📊 View analytics
- ⚡ Optimized performance (Next.js 14 App Router)

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Database:** Prisma + PostgreSQL
- **Deployment:** Vercel

## 📦 Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials

5. Push the database schema:
```bash
npm run db:push
```

6. (Optional) Seed sample data:
```bash
npm run db:seed
```

7. Run the development server:
```bash
npm run dev
```

8. Open [http://localhost:3000](http://localhost:3000)

## 📝 Database Schema

- **User:** Profile information
- **Category:** Certificate categories
- **Certificate:** Main certificate data with images and metadata
- **Tag:** Tags for advanced filtering

## 🎨 Customization

Edit the following files to personalize:
- `app/layout.tsx` - Update metadata and title
- `components/sections/hero.tsx` - Update your name and bio
- `components/sections/about-section.tsx` - Update social links

## 📄 License

MIT License - feel free to use this for your own portfolio!
