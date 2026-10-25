# Pixora

**React Regular Exam Project – SoftUni**

Pixora is a photography-sharing single-page application (SPA) developed using React, React Router, and Supabase.

**Live Application:** https://dobriyan-atanasov.github.io/ReactProject/

**GitHub Repository:** https://github.com/Dobriyan-Atanasov/ReactProject

---

## 1. Project Overview

**Application Name:** Pixora

**Application Category:** Photography Sharing Platform / Social Network

**Main Purpose:**

Pixora is a web application where users can explore, share, and interact with photographs. Visitors can browse a gallery, view individual photo details, and discover photographs published by other users.

Registered users can create, edit, and delete their own photographs, as well as like or unlike photographs. The application provides authentication, user profiles, and persistent data storage through Supabase.

## 2. User Access & Permissions

### Guest (Not Authenticated)

Guests can access the public sections of the application without registration.

**Available pages:**
- Home (`/`)
- Portfolio (`/portfolio`)
- Photo Details (`/photos/:id`)
- About (`/about`)
- Services (`/services`)
- Contact (`/contact`)
- Login (`/login`)
- Register (`/register`)

**Public data displayed:**
- Photograph images, titles, categories, and descriptions.
- Author information for user-created photographs.
- Total number of likes for each photograph.
- Public gallery content.

Guests can browse photographs using the interactive carousel and open individual photo details.

Guests cannot create, edit, delete, or like photographs. Attempting to access protected pages redirects them to Login.

### Authenticated User

Authenticated users have access to all public pages and additional functionality.

**Additional pages:**
- Profile (`/profile`)
- Create Photo button in Portfolio (`/photos/create`)
- Edit Photo (`/photos/:id/edit`)

**Available actions:**
- Create new photographs.
- Edit their own photographs.
- Delete their own photographs.
- Like or unlike photographs.
- View their personal profile.
- Log out.

Only the author of a photograph can edit or delete it. Default showcase photographs cannot be modified or deleted through the application.

## 3. Authentication & Session Handling

### Authentication Flow

Authentication is implemented using Supabase Authentication and React Context API.

**Application initialization:**

1. When the application loads, the authentication provider initializes.
2. The application checks whether an existing Supabase authentication session is available.
3. The authenticated user information is stored in React Context.
4. Components access the authentication state through the custom `useAuth` hook.
5. The navigation and protected pages update according to the user's authentication status.

**Registration:**

Users register by providing:
- First name
- Last name
- Nickname
- Email
- Password
- Password confirmation
- Optional profile image URL

After successful registration, the user is redirected to Login.

Registration does not automatically log the user in.

**Login:**

1. The user enters their email and password.
2. Supabase validates the credentials.
3. The application updates the authentication state.
4. The user is redirected to Profile.
5. The navigation displays authenticated-user options.

**Logout:**

1. The user selects Logout from the navigation.
2. The application requests sign-out through Supabase.
3. The authentication state is updated.
4. Protected functionality becomes unavailable.

If logout fails (e.g. connection problems), an error popup is displayed.

### Session Persistence

Supabase manages authentication sessions and restores valid sessions after a page refresh.

React Context shares the current authentication state between components.

This allows authenticated users to remain logged in when refreshing or reopening the application, provided their session remains valid.

## 4. Routing Structure

The application uses React Router with hash-based routing for GitHub Pages compatibility.

### Route Guards Logic

Routes are separated into three categories:

**Public routes:** Accessible to everyone, regardless of authentication status.

**Guest-only routes:** Login and Register. Authenticated users attempting to access these pages are redirected to Profile.

**Private routes:** Profile and Create Photo require authentication. Unauthenticated users are redirected to Login.

The Edit Photo page additionally verifies that the authenticated user is the photograph's author.

### Main Routes

| Route | Page | Access |
|---|---|---|
| `/` | Home | Public |
| `/portfolio` | Portfolio | Public |
| `/photos/:id` | Photo Details | Public |
| `/about` | About | Public |
| `/services` | Services | Public |
| `/contact` | Contact | Public |
| `/login` | Login | Guest only |
| `/register` | Register | Guest only |
| `/profile` | Profile | Authenticated |
| `/photos/create` | Create Photo | Authenticated |
| `/photos/:id/edit` | Edit Photo | Author only |

The application contains 11 main route definitions.

### Nested & Parameterized Routes

The application uses parameterized routes to identify individual photographs.

**Photo Details:** `/photos/:id`

**Edit Photo:** `/photos/:id/edit`

The `:id` parameter identifies the photograph that should be retrieved from the database.

The application uses a shared layout with navigation and footer components.

### GitHub Pages Routing

The deployed application uses hash-based URLs.

Example:

https://dobriyan-atanasov.github.io/ReactProject/#/portfolio

This prevents routing problems when opening application pages directly on GitHub Pages.

## 5. List → Details Flow

### Catalog / List Page

The Portfolio page serves as the main photograph catalog.

Photographs are retrieved from Supabase and displayed using an interactive carousel.

Each photograph includes an image and associated information.

**Carousel navigation:**
- Previous and Next buttons.
- Photo indicators.
- Left and right keyboard arrows.
- Touch swipe gestures.
- Automatic slideshow.

The carousel allows users to browse photographs without reloading the page.

The application does not require traditional filtering or searching because photographs are presented through the carousel interface.

### Details Page

Selecting the central photograph opens its dedicated details view.

The selected photograph is identified through the `:id` route parameter.

**Displayed information:**
- Enlarged photograph.
- Title.
- Category.
- Description.
- Author information, where applicable.
- Number of likes.
- Like/Unlike button for authenticated users.

If the current user is the author, Edit Photo and Delete Photo buttons are displayed.

Closing the details view returns the user to Portfolio with the previously selected photograph preserved in the carousel.

## 6. Data Source & Backend

### Backend Type

Pixora uses a real backend provided by Supabase.

Supabase provides:
- PostgreSQL database.
- Authentication services.
- REST API.
- Database functions for application operations.
- Persistent storage of photograph and user information.

### Database Structure

| Table | Purpose |
|---|---|
| `auth.users` | Supabase authentication accounts |
| `public.users` | User profile information |
| `public.photos` | Photograph records and author identifiers |
| `public.photo_likes` | User likes associated with photographs |

The frontend communicates with Supabase using asynchronous API requests.

### Likes Functionality

Authenticated users can like or unlike photographs.

Each user can have only one like per photograph.

The database prevents duplicate photo/user combinations.

The `set_photo_like` database function identifies the authenticated user through their authentication token.

Like counts update after successful operations and remain persistent after refreshing the page.

Deleting a photograph also removes its associated likes.

## 7. Data Operations (CRUD)

The main CRUD resource is the `photos` collection.

### Create (POST)

Authenticated users can create photographs through the Create Photo page.

**Process:**

1. The user opens Portfolio.
2. The user selects Add Photo.
3. The Create Photo form is displayed.
4. The user enters the photograph's title, category, description, and image URL.
5. The application validates the submitted information.
6. The photograph is saved to Supabase.
7. The user is redirected to the newly created photograph's details.

Photographs are stored using image URLs rather than uploaded image files.

### Read (GET)

Photographs are retrieved from Supabase and displayed in Portfolio.

The application retrieves photograph information when opening individual photo details.

The retrieved data includes photograph information and associated author and like information.

Data remains available after page refresh because records are stored in the database.

### Update (PUT/PATCH)

Only the photograph's author can edit it.

**Process:**

1. The author opens their photograph's details.
2. The author selects Edit Photo.
3. The application opens a prefilled form containing the existing photograph information.
4. The author modifies the fields.
5. The application validates the changes.
6. The updated information is saved to Supabase.
7. The updated photograph details are displayed.

The Edit page checks ownership before allowing modifications.

The same reusable `PhotoForm` component is used for creating and editing photographs.

### Delete (DELETE)

Only the photograph's author can delete it.

**Process:**

1. The author opens the photograph's details.
2. The author selects Delete Photo.
3. A confirmation dialog is displayed.
4. After confirmation, the application requests deletion from Supabase.
5. The photograph is removed from the database.
6. The application returns to Portfolio.
7. The gallery reloads to reflect the deletion.

Default showcase photographs cannot be deleted through the application.

## 8. Forms & Validation

### Forms Used

The application contains the following forms:

1. Registration form.
2. Login form.
3. Create Photo form.
4. Edit Photo form.

The Create and Edit forms reuse the `PhotoForm` component.

### Validation Rules

**Registration:**

| Field | Validation |
|---|---|
| First name | Required |
| Last name | Required |
| Nickname | Required |
| Email | Required |
| Password | Required, minimum 6 characters |
| Confirm password | Required, must match password |
| Profile image URL | Optional |

**Login:**

Email and password are required.

Invalid credentials result in an authentication error.

**Create / Edit Photo:**

| Field | Validation |
|---|---|
| Title | Required |
| Category | Required |
| Description | Required |
| Image URL | Required; must begin with `http://` or `https://` |

### Form Handling

Forms use controlled React inputs and event handlers.

Validation is performed before submitting data to the backend.

Submission buttons are disabled while requests are running to prevent duplicate submissions.

Loading indicators and error messages provide feedback during asynchronous operations.

## 9. React-Specific Techniques

### Hooks & Component Lifecycle

Pixora uses React hooks to manage application state, lifecycle behavior, and user interactions.

**`useState`**

Used to manage component state such as:
- Photograph collections.
- Loading and error states.
- Form inputs.
- Carousel selection.
- Autoplay status.
- Authentication-related UI behavior.

**`useEffect`**

Used to handle side effects such as:
- Fetching photographs from Supabase.
- Managing carousel autoplay.
- Registering keyboard and touch interactions.
- Updating visual effects.
- Cleaning up event listeners and timers.

**`useContext` and custom hooks**

The custom `useAuth` hook provides access to the authentication context.

Components use this hook to determine whether a user is authenticated and which actions should be available.

### Component Lifecycle Example

The Portfolio carousel demonstrates component lifecycle management.

**Mount:** When Portfolio loads, the application retrieves photographs from Supabase and initializes carousel behavior.

**Update:** When the user selects another photograph, React updates the carousel state and renders the new selection.

**Unmount:** When the component is removed, effect cleanup clears timers and removes registered event listeners to prevent unnecessary background activity.

Effect cleanup also handles cancellation of requests where implemented.

### Context API

The application uses React Context API to share authentication information.

The authentication provider manages the current user and authentication state.

Components consuming this information include:
- Header.
- Login.
- Register.
- Profile.
- Portfolio.
- Photo Details.
- Protected pages.

This avoids passing authentication information manually through multiple component levels.

### Component Styling

The application uses CSS for component styling and responsive layouts.

The visual design is adapted from **TemplateMo 615 Amber Folio**.

The original template has been integrated into React components and extended with application-specific functionality.

The application includes:
- Responsive navigation.
- Interactive photograph carousel.
- Photo details popup.
- Authentication forms.
- Profile page.
- Loading animations.
- Page reveal effects.
- Mobile-friendly layouts.

### Project Architecture

| Location | Responsibility |
|---|---|
| `src/components/` | Pages and reusable UI components |
| `src/context/` | Authentication Context and custom hooks |
| `src/lib/` | API helpers for authentication, photographs, profiles, statistics, and likes |
| `src/App.jsx` | Application routes and shared layout |
| `src/main.jsx` | Application entry point, router, and providers |
| `src/usePageEffects.js` | Page reveal effects |
| `public/templatemo-amber-folio.css` | Application styling |

`PhotoForm` is reused for photograph creation and editing.

`PhotoLikes` manages like and unlike interactions.

## 10. Typical User Flow

A typical user journey through Pixora is:

1. **Explore:** A visitor opens the application, navigates to Portfolio, browses photographs using the carousel, and opens individual photo details.
2. **Register and Login:** The visitor creates an account, logs in, and accesses their personal Profile.
3. **Create:** The authenticated user opens Portfolio, selects Add Photo, completes the form, and publishes a photograph.
4. **Interact:** The user browses photographs and likes or unlikes photographs.
5. **Edit:** The author opens their photograph and modifies its information through Edit Photo.
6. **Delete:** The author deletes their photograph after confirming the operation.
7. **Logout:** The user logs out and returns to guest access.

### Suggested Reviewer Walkthrough

To verify the application's functionality:

1. Open Portfolio as a guest and inspect photograph details.
2. Register a new account and log in.
3. Create a photograph using a publicly accessible image URL.
4. Edit the photograph and refresh the page to verify persistence.
5. Like and unlike a photograph.
6. Log in using a second account and verify that the first account's edit and delete controls are unavailable.
7. Return to the original account and delete the photograph.
8. Log out and verify that protected pages redirect to Login.

## 11. Error & Edge Case Handling

### Authentication Errors

Invalid login credentials produce an error message.

Registration errors are displayed when the authentication request fails.

Protected routes redirect unauthenticated users to Login.

Authenticated users attempting to access Login or Register are redirected to Profile.

If logout fails, the application displays an error popup.

### Network or Data Errors

The application handles asynchronous requests using loading and error states.

When a request fails:
- An error message is displayed.
- Loading indicators are stopped.
- The user can retry the relevant operation.

Submission buttons are disabled during active requests to prevent duplicate operations.

### Empty or Missing Data

The application handles missing or unavailable records through its loading and error states.

When photograph data cannot be retrieved, the application displays feedback rather than assuming the request succeeded.

Photograph edit operations verify that the current user is authorized.

Default showcase photographs are protected from editing and deletion.

### Data Integrity

The backend prevents duplicate likes by enforcing unique photo/user combinations.

Photo operations use authentication information to identify the current user.

Author-only operations prevent users from modifying photographs belonging to other users.

---

## Installation and Local Development

### Prerequisites

- Node.js 22.12 or newer.
- npm.
- A configured Pixora Supabase backend.

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/Dobriyan-Atanasov/ReactProject.git
```

**2. Open the application directory**

Navigate to the folder containing `package.json`.

**3. Install dependencies**

```bash
npm ci
```

**4. Configure environment variables**

Create a `.env.local` file in the same folder as `package.json`.

```dotenv
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_publishable_key
```

Replace the placeholders with the configured Supabase project values.

Use the Supabase publishable key, never the service-role key.

**5. Start the development server**

```bash
npm run dev
```

**6. Open the application**

Open the local URL displayed in the terminal.

**Important:** Environment variables alone do not create the required Supabase database tables, functions, or backend configuration.

### Production Build

Build the application:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

Run code checks:

```bash
npm run lint
```

### Deployment

The frontend is deployed on GitHub Pages.

Authentication and database services are provided by Supabase.

The application uses `/ReactProject/` as its deployment base path and hash routing to support GitHub Pages.

**Live Application:**

https://dobriyan-atanasov.github.io/ReactProject/

---

## Technologies Used

- React
- React Router
- Vite
- JavaScript
- HTML5
- CSS3
- Supabase Authentication
- Supabase PostgreSQL
- Supabase REST API
- GitHub Pages

---

## Attribution

The visual design is adapted from [TemplateMo 615 Amber Folio](https://templatemo.com/tm-615-amber-folio).

Application functionality, authentication integration, database operations, routing, and interactive components are implemented using React and Supabase.

Developed as part of the **SoftUni React Regular Exam Project**.
