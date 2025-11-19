# Found My Friend 🐕

A React + Amplify app for reuniting lost dogs with their owners via QR code scanning.

## Tech Stack

- **Frontend:** React 19, Vite, React Router, Tailwind CSS v4
- **Backend:** AWS Amplify Gen2, DynamoDB, Cognito Auth
- **Deployment:** AWS Amplify Hosting
- **Icons:** lucide-react

## Getting Started

### Local Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Start Amplify sandbox (in another terminal)
npx ampx sandbox
```

Visit `http://localhost:5173` to view the app.

### Build for Production

```bash
npm run build
```

## Database Management

Complete CRUD toolkit for managing dog records in DynamoDB:

| Operation | Command | Description |
|-----------|---------|-------------|
| **Create/Update** | `npm run seed` | Add new dogs or update existing ones from `seed-live-db.js` |
| **Read** | `npm run fetch-dog <uuid>` | View a dog's record by UUID |
| **Update** | `npm run update-dog <uuid> field=value` | Modify specific fields |
| **Delete** | `npm run delete-dog <uuid>` | Remove a dog from the database |

### Usage Examples

```bash
# Seed/update all dogs
npm run seed

# Fetch Cipher's record
npm run fetch-dog 019fbd5b-22a8-4415-a11c-08e26c46708e

# Update Kingsley's name
npm run update-dog 90321c29-1993-4715-a32c-7fe78686ee84 name=Kingsley

# Delete a dog
npm run delete-dog 9f2893bc-5517-4929-a228-2559d28569d1
```

## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally
- `npm run seed` - Seed/update database with dogs
- `npm run fetch-dog <uuid>` - Fetch a dog by UUID
- `npm run update-dog <uuid> field=value` - Update dog fields
- `npm run delete-dog <uuid>` - Delete a dog


## Features

- 🐕 View lost dog profiles by UUID-based routes
- 📞 One-click call button to reach dog owners
- 💬 SMS location sharing for found dogs
- 🗺️ Google Maps integration for location links
- 📱 Mobile-responsive design
- 🔐 Secure Amplify Data access with guest authorization
- ⚡ Fast Vite builds

## Deployment

This app is deployed on AWS Amplify Hosting. Push to the `main` branch to trigger an automatic build and deployment.

```bash
git add .
git commit -m "Your message"
git push
```

## Environment Variables

The app automatically loads `amplify_outputs.json` which contains:
- GraphQL API endpoint
- Cognito auth configuration
- DynamoDB table references

This is handled by both the HTML script and `main.jsx` with fallback support.
