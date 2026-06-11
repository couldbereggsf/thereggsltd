# Reagan Fwamba — Portfolio
[![Netlify Status](https://api.netlify.com/api/v1/badges/c8e792f1-ce0f-4bdb-9ba7-769c6802567f/deploy-status)](https://app.netlify.com/projects/thereggsltd/deploys)

**Live site:** [reaganfwamba.com](https://6a27e50fd6b8950008d8bb92--thereggsltd.netlify.app/)  
**Built by:** Reagan Fwamba — Full-Stack Engineer, The Reggs Limited

---

## Overview

Personal portfolio and consulting landing page for The Reggs Limited, built in deliberate phases — starting as a high-performance static site and evolving into a full-stack application backed by Java, Spring Boot, and AWS infrastructure.

The current site is an 8-screen, conversion-optimised experience using a Dark Forest Luxury design system — Cormorant Garamond display type, Outfit body text, and a Forest Green × Warm Amber × Cream brand palette. It is designed to eliminate visitor doubt rather than simply showcase work, with a live interactive stack audit, personalisation widget, and NSE market demo built entirely in vanilla JavaScript.

The broader roadmap migrates the frontend to React, introduces a Node.js + Express API layer, and ultimately replaces it with a production-grade Java and Spring Boot backend deployed on AWS with Kubernetes, Terraform, and full CI/CD — a working demonstration of the exact infrastructure offered to clients.

---

## Features

- **8-screen conversion flow** — Hook, Problem, Personalisation, Solution, Outcomes, Magic Demo, Quick-Win Audit, CTA
- **3D card tilt effects** — CSS `perspective` + JavaScript `mousemove` tracking on project cards, pricing cards, and the hero profile
- **Frosted glass surfaces** — `backdrop-filter: blur()` panels throughout
- **Animated mesh gradient background** — CSS-only radial gradient orbs with `@keyframes`
- **Live NSE ticker demo** — client-side, zero backend, `setInterval` price simulation
- **30-second stack audit** — interactive form with a client-side lookup engine producing personalised recommendations
- **Persona chooser** — four visitor types with dynamic content adaptation
- **Custom cursor** — amber dot + trailing ring with hover-state expansion
- **Scroll-reveal animations** — `IntersectionObserver` on every section
- **Scroll progress bar** — linear gradient indicator at the top of the viewport
- **Fully responsive** — mobile-first, tested at 375px, 768px, 1024px, 1440px
- **WCAG AA compliant** — keyboard navigable, `aria-pressed`, `aria-live` regions, focus-visible outlines

---

## Tech Stack

This project is being built in three deliberate phases — each one expanding the architecture as the product grows.

---

### Phase 1 — Current (Static Foundation)

The live site as it stands today. No build step, no dependencies, deployed directly from GitHub to Netlify.

| Layer | Technology |
|-------|-----------|
| Markup | HTML5, semantic sectioning |
| Styling | CSS custom properties, `clamp()` fluid type, `backdrop-filter` |
| Interactivity | Vanilla JavaScript (ES6+), no frameworks |
| Icons | Phosphor Icons via CDN |
| Fonts | Google Fonts — Cormorant Garamond, Outfit, JetBrains Mono |
| Hosting | Netlify (continuous deploy from GitHub) |
| Version control | Git + GitHub |

---

### Phase 2 — Frontend Migration (In Progress)

Migrating the static site to a component-based React application with a lightweight Node.js + Express backend to support the contact form, stack audit API, and analytics event ingestion.

| Layer | Technology |
|-------|-----------|
| Frontend framework | React (Vite) |
| Routing | React Router |
| Styling | CSS Modules + existing design system |
| Backend runtime | Node.js |
| Backend framework | Express.js |
| API layer | RESTful JSON endpoints |
| Form handling | Express + Nodemailer |
| Dev tooling | ESLint, Prettier, Vitest |
| Hosting | Netlify (frontend) + Render or Railway (Node backend) |

**Branch:** `feat/react-migration` — work in progress off `dev`

---

### Phase 3 — Backend Overhaul (Planned)

Replacing the Node/Express backend with a production-grade Java and Spring Boot service layer, containerised and deployed to AWS with full DevSecOps pipelines.

| Layer | Technology |
|-------|-----------|
| Backend language | Java 21 |
| Backend framework | Spring Boot 3, Spring Security, Spring Data JPA |
| API layer | RESTful + optional GraphQL |
| Database | PostgreSQL (RDS on AWS) |
| Caching | Redis (ElastiCache) |
| Containerisation | Docker, Kubernetes (EKS) |
| Cloud provider | AWS — EC2, ECS/EKS, S3, CloudFront, Route 53, Secrets Manager |
| CI/CD | GitHub Actions → AWS CodePipeline |
| Infrastructure as Code | Terraform |
| Observability | AWS CloudWatch, Datadog |
| Security | OWASP best practices, IAM least-privilege, SSL/TLS, SAST via SonarQube |
| Testing | JUnit 5, Mockito, Testcontainers |

**Goal:** a fully observable, horizontally scalable backend that mirrors production-grade fintech infrastructure — and doubles as a live demonstration of the skills offered to clients.

---

## Project Structure

### Current (Phase 1)

```
portfolio/
├── index.html              # Main entry point — all 8 screens
├── style.css               # Complete design system and component styles
├── assets/
│   └── images/
│       ├── logo.png        # The Reggs Limited logo
│       └── IMG_0095-1.png  # Profile photo
├── netlify.toml            # Security headers and deploy config
├── .gitignore              # Excludes .DS_Store, node_modules, .env
└── README.md               # This file
```

### Planned (Phase 2 — React + Node/Express)

```
portfolio/
├── client/                 # React frontend (Vite)
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route-level page components
│   │   ├── hooks/          # Custom React hooks
│   │   └── assets/         # Images, fonts
│   └── package.json
├── server/                 # Node.js + Express API
│   ├── src/
│   │   ├── routes/         # API route handlers
│   │   ├── middleware/      # Auth, error handling, rate limiting
│   │   └── services/       # Business logic
│   ├── .env.example        # Environment variable template
│   └── package.json
├── netlify.toml
└── README.md
```

### Planned (Phase 3 — Java + Spring Boot)

```
portfolio/
├── client/                 # React frontend (unchanged)
├── backend/                # Java + Spring Boot service
│   ├── src/main/java/
│   │   └── com/thereggs/
│   │       ├── controller/ # REST controllers
│   │       ├── service/    # Business logic layer
│   │       ├── repository/ # Spring Data JPA repos
│   │       ├── model/      # JPA entities
│   │       └── config/     # Security, CORS, AWS config
│   ├── src/test/java/      # JUnit + Testcontainers
│   ├── Dockerfile
│   └── pom.xml
├── infrastructure/         # Terraform IaC for AWS
│   ├── eks/                # Kubernetes cluster config
│   ├── rds/                # PostgreSQL on RDS
│   └── cloudfront/         # CDN + Route 53
├── .github/workflows/      # GitHub Actions CI/CD pipelines
└── docker-compose.yml      # Local full-stack environment
```

---

## Local Development

### Phase 1 — Static site (current)

No build step required. Open the project with any static file server:

**Option A — VS Code Live Server**
Install the Live Server extension, right-click `index.html`, select "Open with Live Server."

**Option B — Terminal**
```bash
npx serve .
```
Then open `http://localhost:3000`.

**Option C — Python**
```bash
python3 -m http.server 8080
```
Then open `http://localhost:8080`.

---

### Phase 2 — React + Node/Express (upcoming)

Requirements: Node.js v20 LTS, npm v10+

```bash
# Frontend (React + Vite)
cd client
npm install
npm run dev
# Runs at http://localhost:5173

# Backend (Node + Express)
cd server
npm install
cp .env.example .env   # fill in your values — never commit .env
npm run dev
# Runs at http://localhost:4000
```

---

### Phase 3 — Java + Spring Boot (planned)

Requirements: Java 21, Maven or Gradle, Docker

```bash
# Backend
cd backend
./mvnw spring-boot:run
# Runs at http://localhost:8080

# Or via Docker
docker compose up --build
```

---

## Branch Strategy

| Branch | Purpose |
|--------|---------|
| `main` | Production — deploys automatically to live site on every push |
| `dev`  | Integration branch — all completed features merge here first |
| `feat/react-migration` | Phase 2 React + Node/Express rewrite |
| `feat/spring-backend` | Phase 3 Java + Spring Boot backend |
| `feat/*` | Any other individual feature branch |
| `fix/*` | Bug fixes |
| `chore/*` | Dependency updates, config changes |

**Daily workflow:**
```bash
# Always branch off dev, never off main
git checkout dev
git checkout -b feat/your-feature-name

# Work, commit regularly
git add .
git commit -m "feat: describe what you changed"
git push origin feat/your-feature-name

# When feature is complete — merge back to dev
git checkout dev
git merge feat/your-feature-name
git push origin dev

# When dev is stable and ready to go live
git checkout main
git merge dev
git push origin main
git checkout dev
```

Netlify deploy previews are enabled on `dev` — each push generates a private preview URL before anything reaches the live site.

---

## Deployment

Hosted on Netlify with continuous deployment from the `main` branch on GitHub.

| Setting | Value |
|---------|-------|
| Build command | *(none — static site)* |
| Publish directory | `/` (root) |
| Production branch | `main` |
| Deploy previews | Enabled on `dev` |
| HTTPS | Automatic via Netlify |
| Asset optimisation | CSS bundle + minify, image compression |

Security headers are configured in `netlify.toml`:
- `X-Frame-Options: DENY`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Content-Security-Policy` scoped to trusted origins

---

## Brand Palette

| Name | Hex |
|------|-----|
| Forest Deep | `#0c1206` |
| Forest Mid | `#283618` |
| Forest Light | `#2D5016` |
| Olive | `#606C38` |
| Warm Amber | `#DDA15E` |
| Burnt Orange | `#BC6C25` |
| Cream | `#FEFAE0` |

---

## Contact

**Reagan Fwamba**  
Full-Stack Engineer — Java, Spring Boot, AWS, DevSecOps  
The Reggs Limited, Naivasha / Ongata Rongai, Kenya

- Email: reaganfwambaa@gmail.com  
- GitHub: [github.com/couldbereggsf](https://github.com/couldbereggsf)
- LinkedIn: [linkedin.com/in/reaganfwamba](www.linkedin.com/in/reagan-f-04a448244)

---

## License

&copy; 2026 Reagan Fwamba / The Reggs Limited. All rights reserved.  
This codebase is personal portfolio work and is not open for reuse or redistribution without written permission.
