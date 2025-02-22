# Minimal SvelteKit PocketBase

## Overview

Mobile-first, minimalistic starter template for web applications built with Svelte 5 (Runes mode) and PocketBase designed for fully client-rendered single-page applications (SPAs). This template uses SvelteKit's static adapter and disables server-side rendering (SSR) to focus on client-side rendering (CSR) only. It’s designed to give you a simple foundation for your web applications with essential features and modern UI components.

## Features

- User Authentication:
  - Sign up with email and password or auth providers
  - Log in
  - Forgot password
  - Log out
- User Settings:
  - Change email
  - Change password
  - Delete account
- Theme Switcher: light and dark modes supported
- Sample Pages:
  - Notifications page
  - Create page placeholder

## Screenshots

<img src="static/screenshots/login.png" alt="Login" width="30%"/><br>
<img src="static/screenshots/home.png" alt="Home" width="30%"/><br>
<img src="static/screenshots/notifications.png" alt="Notifications" width="30%"/><br>
<img src="static/screenshots/settings.png" alt="Settings" width="30%"/><br>
<img src="static/screenshots/delete-account.png" alt="Settings" width="30%"/>

## Tech Stack

- [SvelteKit](https://kit.svelte.dev/)
- [Svelte 5](https://svelte-5-preview.vercel.app/docs/introduction)
- [PocketBase](https://pocketbase.io/)
- [Zod](https://zod.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
- [Unplugin Icons](https://github.com/unplugin/unplugin-icons)

## Setup Instructions

To get started with this template, follow these steps:

### 1. Refer to the PocketBase Documentation

- Ensure you have set up PocketBase according to the [PocketBase documentation](https://pocketbase.io/docs/).

### 2. Clone the Project:

```
git clone https://github.com/LucaLetizia/minimal-sveltekit-pocketbase.git
cd minimal-sveltekit-pocketbase
```

### 3. Configure Environment Variables:

- Copy the `.env.example` file to `.env`:
  ```
  cp .env.example .env
  ```
- Edit `.env` and set the `PUBLIC_POCKETBASE_HOST` variable with your PocketBase host.

### 4. Install Dependencies:

```
npm install
```

### 5. Run the Application Locally:

```
npm run dev
```

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.
