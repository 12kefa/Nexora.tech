# Nexora Tech — Portfolio Website

A premium, fully responsive personal portfolio website for **Kflay Tesfay**, founder of Nexora Tech.

Built with vanilla **HTML5, CSS3, JavaScript** — a fully static site with no backend, database, or build step required. Works on any static host (Netlify, Vercel, GitHub Pages, etc.). The contact form emails submissions straight to your inbox via [FormSubmit](https://formsubmit.co).

---

## ✨ Features

- ⚡ Fully responsive (mobile / tablet / desktop)
- 🌙 Dark mode (default) with light theme toggle
- 💎 Glassmorphism cards
- 💡 Neon blue + purple gradient accents
- 🎞 Smooth scroll, scroll-reveal & parallax animations
- ⌨️ Typed-text hero animation
- 📊 Animated skill bars + animated counters
- 🗂 Portfolio project filtering
- ⬆️ Sticky navbar with scroll spy
- 🔝 Back-to-top button
- 🧭 Custom desktop cursor
- 🎨 SEO + Open Graph + Twitter meta tags
- 🎨 Brand-colored social icons (TikTok, WhatsApp, LinkedIn, Facebook, Telegram)
- 📩 Contact form that **emails you directly** — no server, no database

---

## 📁 Project Structure

```
portfolio/
├── index.html              # Main site (all sections)
├── style.css                # Premium theme, dark/light, glassmorphism
├── script.js                # Animations, form submission, sliders
│
└── assets/
    ├── profile.jpg          # Your photo
    ├── hero-bg.jpg           # Hero background (optional, has CSS fallback)
    ├── project-*.jpg         # Portfolio card screenshots
    ├── resume.pdf            # Downloadable CV
    └── favicon.ico
```

---

## 🚀 Deployment (static hosting)

This site is 100% static — there's nothing to install or configure on a server.

1. Upload the entire `portfolio/` folder to Netlify, Vercel, GitHub Pages, or any static host.
2. That's it. No database, no PHP, no build step.

### Netlify (drag & drop)
Go to [app.netlify.com/drop](https://app.netlify.com/drop) and drag the `portfolio` folder in. Done.

### Vercel
```bash
npm i -g vercel
cd portfolio
vercel
```

### GitHub Pages
Push the `portfolio/` contents to a repo, then enable Pages in the repo settings (Settings → Pages → deploy from branch).

---

## 📩 Contact Form (FormSubmit — no backend needed)

The contact form sends straight to **tesfaykflay75@gmail.com** using FormSubmit, a free form-to-email service. The form already posts to:

```
https://formsubmit.co/ajax/tesfaykflay75@gmail.com
```

### ⚠️ One-time activation step
The **first time** anyone submits the form, FormSubmit sends a confirmation email to that inbox. **You must open that email and click "Confirm"** before messages start arriving — this is a one-time step per email address, done automatically by FormSubmit to stop spam signups.

So right after you deploy: submit the form once yourself (test message), then check your inbox (and spam folder) for an email from FormSubmit and confirm it. Every submission after that lands directly in your inbox.

### Changing the destination email
Search `index.html` and `script.js` for `tesfaykflay75@gmail.com` and replace both occurrences with your address, then repeat the one-time confirmation step above.

### Optional: spam protection
FormSubmit supports a hidden honeypot field (already included as `_honey`) and a reCAPTCHA option if you start getting spam — see [formsubmit.co/](https://formsubmit.co/) for the full list of `_` config fields.

---

## 🛠 Tech Stack

| Layer    | Technology                              |
|----------|------------------------------------------|
| Markup   | HTML5                                    |
| Styling  | CSS3 (custom properties, glassmorphism)  |
| Script   | Vanilla JavaScript (no frameworks)       |
| Forms    | FormSubmit (free, no backend)            |

No Node, no build step, no framework, no server — drop it on any static host.

---

## 🎨 Customization

- **Brand name, copy, links** → edit `index.html` directly.
- **Colors** → tweak the CSS variables at the top of `style.css` (`--primary`, `--accent`, etc.).
- **Social handles** → search for `yourusername` in `index.html` and replace with your real handles.
- **Project cards** → duplicate any `<article class="project-card">…</article>` block in `index.html`.
- **Pricing / FAQ / Testimonials** → straightforward to add in their respective sections.

---

## 📜 License

© Kflay Tesfay — Nexora Tech. All rights reserved.
