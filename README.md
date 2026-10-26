# Sekhon Farm — Production-Quality Frontend

A modern, responsive, agricultural and sustainable frontend application for **Sekhon Farm**, built with **Next.js (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## 🌾 Tech Stack & Architectural Overview

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS with custom agricultural theme (`farm-green`, `harvest-gold`, `earth-stone`)
- **Form Management**: React Hook Form + Zod
- **Icons**: Lucide React
- **Authentication**: React Context + Session Persistence (API-ready for JWT Bearer Tokens)
- **API Service Layer**: Centralized `api-client.ts`, `auth.service.ts`, `user.service.ts`, and `contact.service.ts`

---

## 📁 Project Directory Structure

```text
Farm_frontend/
├── public/
│   ├── favicon.ico
│   ├── icon.svg
│   └── robots.txt
├── src/
│   ├── app/
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   ├── signup/page.tsx
│   │   │   ├── forgot-password/page.tsx
│   │   │   └── reset-password/page.tsx
│   │   ├── profile/page.tsx
│   │   ├── under-construction/page.tsx
│   │   ├── globals.css
│   │   ├── icon.svg
│   │   ├── layout.tsx
│   │   ├── not-found.tsx
│   │   └── page.tsx
│   ├── components/
│   │   ├── auth/
│   │   │   ├── AuthLayout.tsx
│   │   │   └── ProtectedRoute.tsx
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AboutSection.tsx
│   │   │   ├── HighlightsSection.tsx
│   │   │   ├── GallerySection.tsx
│   │   │   └── ContactSection.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   └── Footer.tsx
│   │   └── ui/
│   │       ├── Badge.tsx
│   │       ├── Button.tsx
│   │       ├── Card.tsx
│   │       ├── ErrorMessage.tsx
│   │       ├── Input.tsx
│   │       ├── Loader.tsx
│   │       ├── PasswordInput.tsx
│   │       ├── PasswordRequirements.tsx
│   │       └── SuccessMessage.tsx
│   ├── contexts/
│   │   └── AuthContext.tsx
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── lib/
│   │   ├── constants.ts
│   │   ├── storage.ts
│   │   └── utils.ts
│   ├── schemas/
│   │   ├── auth.schema.ts
│   │   ├── contact.schema.ts
│   │   └── user.schema.ts
│   ├── services/
│   │   ├── api-client.ts
│   │   ├── auth.service.ts
│   │   ├── contact.service.ts
│   │   └── user.service.ts
│   └── types/
│       ├── api.types.ts
│       ├── auth.types.ts
│       ├── contact.types.ts
│       └── user.types.ts
├── .env.example
├── .env.local
├── .eslintrc.json
├── .gitignore
├── next.config.mjs
├── package.json
├── postcss.config.mjs
├── tailwind.config.ts
└── tsconfig.json
```

---

## 🚀 Key Features

1. **Homepage (`/`)**:
   - **Navbar**: Sekhon Farm branding, links (`Home`, `About`, `Highlights`, `Gallery`, `Contact`), mobile hamburger drawer, and dynamic auth status (Login / Sign Up or Patron profile dropdown).
   - **Hero Section**: High-resolution farm imagery, certified organic badges, primary & secondary CTAs, and counter statistics.
   - **About Section**: Multi-generational story, chemical-free mission, 4 philosophical pillars, and quality checklist.
   - **Farm Highlights**: 4 distinct value cards (*Uncompromising Quality*, *100% All-Natural*, *Generational Trust*, *Ecological Stewardship*).
   - **Farm Gallery**: Responsive image gallery with category filter tabs and interactive lightbox modal.
   - **Contact Section**: Phone, email, farmstead address, gate hours, social links, and interactive contact form with React Hook Form + Zod.
   - **Footer**: Full navigation, agricultural certifications, social media links, and copyright info.

2. **Authentication Suite**:
   - **Login (`/login`)**: Image split-screen, email & password with toggle visibility, pre-filled demo account hint, link to forgot password & signup.
   - **Signup (`/signup`)**: Full Name, Email, Phone, Password, Confirm Password.
     - 8–18 characters, 1 uppercase, 1 lowercase, 1 number, 1 special character.
     - Live password requirement checklist with checkmarks.
     - 4-tier visual password strength bar (Weak, Fair, Good, Strong).
     - Duplicate email test support (`exists@sekhonfarm.com` triggers backend 409 simulation).
   - **Forgot Password (`/forgot-password`)**: Email recovery link request.
   - **Reset Password (`/reset-password`)**: Secure token-based password reset using the same validation rules.

3. **Patron Experience & Protected Routes**:
   - **Under Construction (`/under-construction`)**: Main landing page for authenticated patrons in v1.0. Highlights coming-soon CSA boxes, farm stays, telemetry, and email notification signup.
   - **Profile (`/profile`)**: Displays Patron Name, Verified Email, Phone, Account Status badge, Member Since date, and Last Login timestamp. Features an inline profile edit form and logout.

---

## 🔌 API Service Layer & Future Backend Integration

All API calls are strictly routed through `src/services/` using standard REST contracts:
- `apiClient<T>(endpoint, options)` handles Bearer token attachment, timeouts, standard JSON errors, and network errors.
- In development/offline mode without a backend, the service layer gracefully falls back to persistent mock storage so all user flows (login, register, update profile, reset password) are 100% testable immediately.
- When the **Node.js + Fastify + Prisma + MySQL** backend is ready, simply point `NEXT_PUBLIC_API_URL` to the API gateway (e.g. `http://localhost:5000/api`) without modifying any UI component.

---

## 🛠️ Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Build for production
npm run build

# 4. Start production server
npm start
```

