# Walt Landing Page

A modern, minimal, dark-themed landing page for **Walt**, a privacy-first mobile app for tracking expenses and income.

## 📱 About Walt

Walt is designed for users who value financial privacy. Unlike traditional trackers, Walt keeps 100% of your data local and private—no cloud, no data harvesting. It leverages local AI to provide deep financial insights directly on your device.

### Key Features

- 🔒 **Biometric Security:** Protect your data with Fingerprint or FaceID.
- 🤖 **AI Financial Insights:** Personalized advice and spending patterns powered by local AI.
- 🛡️ **100% Local & Private:** No cloud storage; your data stays on your device.
- 📊 **Reports & PDF Export:** Visualize spending habits and export high-quality reports.
- 🌙 **Dark Mode:** A beautiful, eye-friendly interface.
- 📱 **Android Exclusive:** Currently distributed via direct APK with Google Play coming soon.

## 🚀 Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Styling:** [Tailwind CSS 4](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)

## 🎨 Design Philosophy

- **Minimalist Aesthetic:** Apple-level simplicity with generous spacing.
- **Dark Mode Default:** Sleek zinc-based colors with purple/indigo accents.
- **Pixel 9 Mockups:** Custom-designed phone frames that align perfectly with the app's screenshots.
- **Smooth Interaction:** Subtle fade-ins and hover effects for a premium feel.

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v20 or higher)
- [Bun](https://bun.sh/) (recommended) or npm

### Installation

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd walt-web
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Run the development server:
   ```bash
   bun dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📂 Project Structure

```text
walt-web/
├── app/               # Next.js App Router (Layout, Page, Globals)
├── components/        # Reusable UI components (Hero, Features, Pixel9Mockup, etc.)
├── public/
│   ├── apks/          # Local APK distribution
│   └── screenshots/   # Actual app screenshots used in mockups
└── tailwind.config.ts # Styling configuration
```

## 📦 Distribution

The landing page is configured to serve the Android APK directly from `/public/apks/walt.apk`. Users can download it using the "Download Walt (APK)" buttons throughout the site.

---

Built with ❤️ for financial privacy. © 2026 Walt.
