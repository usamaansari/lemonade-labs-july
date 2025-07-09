#!/bin/bash

# Install project dependencies
echo "🚀 Installing project dependencies..."
npm install

# Install development dependencies
echo "📦 Installing development dependencies..."
npm install -D tailwindcss postcss autoprefixer @tailwindcss/forms

# Initialize Tailwind CSS
echo "🎨 Initializing Tailwind CSS..."
npx tailwindcss init -p

echo "✨ Project setup complete! Run 'npm run dev' to start the development server."
