// Tailwind serve solo alla variante /ai (app/[lang]/ai/ai.css). Gli altri CSS non usano direttive Tailwind.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
