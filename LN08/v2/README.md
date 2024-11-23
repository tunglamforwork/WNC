## How to start

```bash
npm install @reduxjs/toolkit react-redux
```

Tailwind support:

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

```js
tailwind.config.js;
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

```css
index.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
