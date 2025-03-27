# Notes Manager

A modern, full-featured notes application built with React, TypeScript, and Vite. This application allows users to create, edit, delete, and organize their notes with a clean and intuitive interface.

## Features

- 📝 Create, edit, and delete notes
- 🌙 Dark/Light theme toggle
- 🌐 Multi-language support (i18n)
- 📱 Responsive design for all devices
- 🔄 State management with Zustand
- 💾 Local storage persistence
- 🎨 Beautiful UI with Tailwind CSS and Framer Motion

## Prerequisites

- Node.js (v16.0.0 or higher)
- npm (v7.0.0 or higher) or yarn

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/notes-manager.git
   cd notes-manager
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Building for Production

```bash
npm run build
# or
yarn build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

### Deploying to Vercel

1. Install Vercel CLI:

   ```bash
   npm install -g vercel
   ```

2. Log in to Vercel:

   ```bash
   vercel login
   ```

3. Deploy to Vercel:

   ```bash
   vercel
   ```

   Or for production:

   ```bash
   vercel --prod
   ```

Alternatively, you can connect your GitHub repository to Vercel for automatic deployments.

### Deploying to Netlify

1. Install Netlify CLI:

   ```bash
   npm install -g netlify-cli
   ```

2. Log in to Netlify:

   ```bash
   netlify login
   ```

3. Initialize and deploy:

   ```bash
   netlify init
   netlify deploy
   ```

   For production:

   ```bash
   netlify deploy --prod
   ```

You can also connect your GitHub repository to Netlify for continuous deployment.

## Environment Variables

No environment variables are required for basic functionality.

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **State Management**: Zustand
- **Internationalization**: i18next
- **Code Quality**: ESLint, Prettier

## Project Structure

```
src/
├── components/       # Shared UI components
├── contexts/         # React context providers
├── features/         # Feature modules
│   └── notes/        # Notes feature
│       ├── components/  # Note-specific components
│       └── store/       # Notes state management
├── hooks/            # Custom React hooks
├── locales/          # Translation files
├── utils/            # Utility functions
├── App.tsx           # Main app component
├── i18n.ts           # i18n configuration
├── index.css         # Global styles
└── main.tsx          # Application entry point
```

## License

[MIT](LICENSE)
