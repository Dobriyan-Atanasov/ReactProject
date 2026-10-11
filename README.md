# ReactProject
This is my React course project at SoftUni.

# Pixora

Pixora is a photography-sharing single-page application developed for the SoftUni React regular exam.

Visitors can browse photographs and view their details. Registered users can publish photos, manage their own photos, and like or unlike photographs.

## Live Application

https://dobriyan-atanasov.github.io/ReactProject/

## Technologies

- React
- React Router
- Vite
- JavaScript
- CSS
- Supabase Authentication
- Supabase PostgreSQL database and REST API

The frontend is hosted on GitHub Pages. Authentication and database services are hosted by Supabase.

## Installation and Local Development

Use Node.js 22.12 or newer and npm.

1. Clone the repository:

   ```bash
   git clone https://github.com/Dobriyan-Atanasov/ReactProject.git
   ```

2. Open the application folder containing `package.json`.

3. Install dependencies:

   ```bash
   npm ci
   ```

4. Create `.env.local` in the same folder as `package.json`:

   ```dotenv
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
   ```

   Replace the placeholders with the values from the configured Supabase project. Use the publishable key, never the service-role key.

5. Start the development server:

   ```bash
   npm run dev
   ```

6. Open the local URL displayed in the terminal.

The application requires the configured Pixora Supabase backend. Environment variables alone do not create its tables or database functions.

## Production Build

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

Run the code checks:

```bash
npm run lint
```

The application uses `/ReactProject/` as its deployment base path and hash routing to support GitHub Pages.

## Functional Guide

### Guest Users

Guests can:

- Open Home, About, Services and Contact.
- Browse all photographs in Portfolio.
- Open individual photo details.
- View photo information, author information and like counts.
- Register or log in.

Guests cannot create, edit or delete photos, or like photographs. Opening a private page redirects them to Login.

### Registration and Login

Registration requires:

- First name
- Last name
- Nickname
- Email
- Password
- Password confirmation

A profile image URL is optional. Passwords must contain at least six characters, and the confirmation must match.

Successful registration redirects to Login. The application does not automatically log the user in after registration.

After login, the user is redirected to Profile. Authentication state is shared throughout the application and restored after a page refresh.

Logged-in users are redirected to Profile when attempting to open Login or Register.

Logout is available in the navigation menu. A failed logout request displays an error popup.

### Portfolio

Portfolio loads photographs from Supabase and displays them in a carousel.

Users can navigate using:

- Previous and next buttons
- Photo indicators
- Left and right arrow keys
- Touch swipes
- Autoplay

Selecting the central photograph opens its details. Closing the details returns to Portfolio with that photograph selected.

### Photo Details

Each photograph has a dedicated URL and a details popup displaying its image, title, category, description and likes.

For user-created photos, author information is also displayed.

The author sees Edit Photo and Delete Photo buttons. These controls are hidden from guests and other users. Default showcase photos cannot be edited or deleted through the application.

### Create a Photo

Logged-in users can select Add Photo in Portfolio.

The form requires:

- Title
- Category
- Description
- Image URL

The image URL must begin with `http://` or `https://`.

The application stores the image URL rather than uploading an image file. Successful creation opens the new photograph's details.

### Edit and Delete

The author can open a prefilled edit form and save changes. Cancel returns to the photo details.

The edit page checks ownership before displaying the form.

Deleting a photo requires confirmation. After successful deletion, the application returns to Portfolio and reloads its records.

### Likes

Logged-in users can like or unlike photographs.

Each user can have only one like per photo. The database stores the photo/user pair and prevents duplicates.

The Like/Unlike operation calls the Supabase `set_photo_like` function, which identifies the user from their authentication token.

The count and button update after a successful request. Likes persist after refreshing the page. Deleting a photo automatically removes its associated likes.

### Profile

Profile displays the logged-in user's name, nickname, email, profile image, registration date and profile ID.

### Validation and Feedback

The application uses controlled form inputs and React event handlers.

Validation checks required fields, matching passwords and photo image URLs. Loading indicators and error messages provide feedback during remote requests. Submission buttons are disabled while requests are running.

### Suggested Reviewer Walkthrough

1. Browse Portfolio and open photo details as a guest.
2. Register and log in.
3. Create a photograph using a publicly accessible image URL.
4. Edit the photograph and refresh to verify persistence.
5. Like and unlike a photograph.
6. Log in with a second account and confirm the first account's edit/delete controls are unavailable and its edit route is protected.
7. Return to the author's account and delete the created photograph.
8. Log out and confirm private pages redirect to Login.

## Application Routes

| Route | Page |
| --- | --- |
| `/` | Home |
| `/portfolio` | Portfolio catalog |
| `/photos/:id` | Photo details |
| `/photos/create` | Create photo |
| `/photos/:id/edit` | Edit photo |
| `/profile` | User profile |
| `/login` | Login |
| `/register` | Registration |
| `/about` | About |
| `/services` | Services |
| `/contact` | Contact |

Deployed URLs include a hash, for example:

https://dobriyan-atanasov.github.io/ReactProject/#/portfolio

## Project Architecture

- `src/components/` — pages and reusable UI components.
- `src/context/` — authentication context, session management and the authentication hook.
- `src/lib/` — API helpers for authentication, photos, profiles, statistics and likes.
- `src/App.jsx` — application routes and shared layout.
- `src/main.jsx` — application entry point, router and authentication provider.
- `src/usePageEffects.js` — page reveal effects.
- `public/templatemo-amber-folio.css` — external application styling.

`PhotoForm` is shared between Create and Edit. `PhotoLikes` manages photo interactions.

React hooks manage state, remote data loading and lifecycle behavior. Effect cleanup cancels requests and removes timers and event listeners.

## Backend Data

- `auth.users` — Supabase authentication accounts.
- `public.users` — user profile information linked to authentication accounts.
- `public.photos` — photograph records and author identifiers.
- `public.photo_likes` — unique photo/user pairs representing likes.

## Attribution

The visual design is adapted from TemplateMo 615 Amber Folio.

Application functionality is implemented using React and Supabase.
