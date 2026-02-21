# ProShop Clone

A simple e-commerce frontend built with React + Vite + Tailwind CSS.

## Setup

```bash
cd proshop-clone
npm install
npm run dev
```

Opens at http://localhost:5173

## Pages
- `/` — Home / product listing with search
- `/product/:id` — Product detail with add to cart
- `/cart` — Cart with quantity controls
- `/login` — Login form

## Components
- `Header` — Navbar with cart count
- `Footer`
- `ProductCard`
- `Rating` — Star rating display
- `SearchBar`
- `Loader`
- `Message` — Info/error/success alerts

## Screenshot
<img width="1207" height="830" alt="Screenshot 2026-02-21 204530" src="https://github.com/user-attachments/assets/487b5312-9ae5-4d9c-9e52-e2f11de8e650" />

## Features
- Add to cart, remove, update quantity
- Cart persisted in localStorage
- Search products by name/brand/category
- Context API for cart state
- Responsive grid layout

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run preview  # Preview build
```
