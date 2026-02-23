# Aekansh Khandelwal — Portfolio

A modern, responsive, and high-performance portfolio website built with React and Vite. Features premium animations, a functional contact form, and a polished glassmorphism UI.

## 🚀 Tech Stack

- **Framework:** React 19
- **Build Tool:** Vite 7
- **Email:** EmailJS (`@emailjs/browser`)
- **Styling:** Vanilla CSS (variables, Flexbox, Grid)

## ✨ Features

- Animated Hero, About, Skills, Projects, Certifications & Contact sections
- Staggered scroll-reveal animations
- Interactive skill bubble graph
- Project cards with hover previews
- Contact form with real Gmail delivery via EmailJS
- Fully offline-capable (no backend required)

## 🏗️ Project Structure

```text
portfolio/
├── public/              # Static assets (logo, images)
├── src/
│   ├── components/      # Section components + CSS
│   ├── hooks/           # useReveal scroll hook
│   ├── index.css        # Global design tokens & styles
│   └── main.jsx         # Entry point
├── .env                 # Local secrets (never committed)
├── .env.example         # Template for env variables
└── vite.config.js
```

## 🛠️ Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your [EmailJS](https://www.emailjs.com/) credentials:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### 3. Run Locally

```bash
npm run dev
```

### 4. Production Build

```bash
npm run build       # Outputs to /dist
npm run preview     # Preview the build locally
```

## 🌐 Deployment

### Vercel (Recommended)

1. Push your code to GitHub.
2. Import the repo at [vercel.com](https://vercel.com).
3. Add your `VITE_EMAILJS_*` environment variables in the Vercel dashboard under **Settings → Environment Variables**.
4. Deploy — Vercel auto-detects Vite and sets the build command to `npm run build`.

### Netlify

1. Connect your GitHub repo at [netlify.com](https://netlify.com).
2. Set build command: `npm run build`, publish directory: `dist`.
3. Add `VITE_EMAILJS_*` vars under **Site Settings → Environment Variables**.

### GitHub Pages

1. Install the plugin: `npm install -D vite-plugin-gh-pages`
2. Add `base` option in `vite.config.js` matching your repo name.
3. Run `npm run build && npm run deploy`.

> ⚠️ **Never commit your `.env` file.** It is already listed in `.gitignore`.

## 📜 License

MIT
