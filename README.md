# German Words of the Day 📚
A simple Next.js app for learning German vocabulary with a daily word feature, user favorites, and Google login. Built as a personal project to practice Firebase integration and authentication.
## 📝 Description
This app fetches a "word of the day" from Firebase Realtime Database (updated daily via Cloud Functions), allows users to add words to favorites, and includes a clean interface with tabbed navigation for today's and yesterday's words. It supports Google Sign-In for personalized features and uses reCAPTCHA for security.
Inspired by language learning challenges, this project combines frontend development with backend services for a reflective daily practice tool.
## 🚀 Features
* 🔄 Daily Word: Automatically updated word with translation, transcription, description, and examples.
* ❤️ Favorites: Add words to a personal list (requires login).
* 👤 Google Authentication: Secure login with profile photo integration.
* 🛡️ Security: Firebase App Check with reCAPTCHA v3 for API protection.
* 📱 Tabbed Navigation: Switch between "Today" and "Yesterday", "Favorites" views.

## 🛠️ Tech Stack

* Frontend: Next.js 15 (App Router, SSR), React 18
* Backend: Firebase (Realtime Database, Cloud Functions for daily updates, Authentication)
* Security: Google reCAPTCHA v3, Firebase App Check
* Styling: CSS Modules
* Deployment: Netlify

## 📦 Installation

Clone the repository:
```
git clone https://github.com/minddwe11er/german_words.git
cd german_words
```
Install dependencies:
```
npm install
```
Set up environment variables. Create .env.local in the root:
```
NEXT_PUBLIC_RECAPTCHA_SITE_KEY = your_key
NEXT_PUBLIC_FIREBASE_API_KEY = your_key
```

Get Firebase config from Firebase Console > Project Settings > Your Apps.
Get reCAPTCHA keys from Google reCAPTCHA Admin Console.


Run locally:
```
npm run dev
```
Open http://localhost:3000.



## 🎮 Usage

* Daily Word: View the word of the day on the home page, updated automatically via Cloud Functions.
* Login: Click "Continue with Google" to sign in and access favorites.
* Favorites: After login, add words to your list (stored in Firebase per user).
* Tabs: Switch between "Today" and "Yesterday" views and Favorites.
# 📸 Follow me on Instagram
If you liked this project and want to see my daily adventures, follow me on Instagram: @minddwe11er.
