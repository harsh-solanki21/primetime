# <img src="src/assets/logo.gif" alt="logo" width="300"/>

**PrimeTime 🎬** is a modern movie discovery web app built with React, TypeScript, and Vite. Instantly search, browse, and explore thousands of movies, view trending searches, and get detailed information on every title. Powered by [TMDB](https://www.themoviedb.org/) and [Appwrite](https://appwrite.io/) for trending analytics.

## Video Demo

[![PrimeTime Video Demo](https://i9.ytimg.com/vi_webp/_5rsu3xib8s/mq3.webp?sqp=COyiusIG-oaymwEmCMACELQB8quKqQMa8AEB-AH-CYACsgWKAgwIABABGEQgWyhyMA8=&rs=AOn4CLBEHra6MbO25E1lpRScwuhBoq988g)](https://youtu.be/_5rsu3xib8s)

> 📺 **Click the image above to watch a quick demo of PrimeTime in action!**

<br />

## Features

- 🔍 **Instant Movie Search:** Find movies by title with real-time results.
- 📈 **Trending Now:** See what movies are trending based on user searches.
- 🏆 **Popular Movies:** Browse the most popular movies right now.
- 🎬 **Movie Details:** View rich details, ratings, genres, cast, and more.
- 🖼️ **Beautiful UI:** Responsive, dark-themed interface with smooth animations.
- ⚡ **Infinite Scrolling:** Seamlessly load more movies as you scroll.
- ☁️ **Appwrite Integration:** Trending analytics stored and fetched from Appwrite.

<br />

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/harsh-solanki21/primetime.git
cd primetime
```

### 2. Install dependencies

```typescript
pnpm install
```

### 3. Configure environment variables

Copy `.env.local.example` to `.env.local` and fill in your TMDB and Appwrite credentials.

### 4. Run the development server

```typescript
pnpm dev
```

### Open http://localhost:5173 to view the app.

<br />

## Project Structure

```
src/
  components/      # UI and layout components
  hooks/           # Custom React hooks (search, trending, details)
  lib/             # API config and constants
  services/        # TMDB and Appwrite API logic
  types/           # TypeScript types
  assets/          # Images and icons
  App.tsx          # Main app entry
```

<br />

## Tech Stack

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TMDB API](https://www.themoviedb.org/)
- [Appwrite](https://appwrite.io/)
- [Tanstack Query](https://tanstack.com/query/latest)
