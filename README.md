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

## Switching between sandbox and production databases

The repo scripts (`seed-live-db.js`, `fetch-dog-by-uuid.js`, `delete-dog-by-uuid.js`) now support selecting which DynamoDB table to operate on so you can safely target a sandbox/development table or the production table.

Resolution order (highest precedence first):

1. TABLE_NAME environment variable — provide a full table name (e.g. `Dog-pkowf7ajanhi5pljnt46p4un6q-NONE`).
2. CLI flag `--env` or `-e` — accepts `sandbox`, `prod`, or a raw table name.
3. DB_ENV environment variable — accepts `sandbox`, `prod`, or a raw table name.
4. Default: `prod` (keeps previous behavior).

Predefined mapping:

- `sandbox` → `Dog-pkowf7ajanhi5pljnt46p4un6q-NONE`
- `prod` → `Dog-a46lcdczfvgt7fl534ifthgk3i-NONE`


Recommended usage (npm scripts)

Use the dedicated npm scripts to seed the sandbox or production database. These avoid passing flags that npm may consume and are cross-platform:

PowerShell / Bash / WSL:

```powershell
# Seed the sandbox table
npm run seed:sandbox

# Seed the production table
npm run seed:prod

# Fetch a dog from the sandbox table (npm script)
npm run fetch-dog:sandbox -- 019fbd5b-22a8-4415-a11c-08e26c46708e

# Fetch a dog from the production table (npm script)
npm run fetch-dog:prod -- 019fbd5b-22a8-4415-a11c-08e26c46708e

# Delete a dog from the sandbox table (npm script)
npm run delete-dog:sandbox -- 019fbd5b-22a8-4415-a11c-08e26c46708e

# Delete a dog from the production table (npm script)
npm run delete-dog:prod -- 019fbd5b-22a8-4415-a11c-08e26c46708e
```

Other supported options (advanced):

- Provide a full table name via env var:

```powershell
$env:TABLE_NAME='Dog-pkowf7ajanhi5pljnt46p4un6q-NONE'; npm run seed
```

- Use DB_ENV env var (e.g., `sandbox` or `prod`):

```powershell
$env:DB_ENV='sandbox'; npm run seed
```

Notes:

- If you provide a raw table name to `TABLE_NAME` or as the first script argument, the helper will use it directly.
- The default behavior remains **prod** to avoid accidental changes to sandbox unless explicitly requested. If you prefer the opposite (default to sandbox), I can flip it.
- The helper logs which table it selected so you can confirm before any write operations occur.


## Available Scripts

- `npm run dev` - Start Vite dev server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build locally

- `npm run seed:sandbox` - Seed sandbox DB
- `npm run seed:prod` - Seed production DB

- `npm run fetch-dog:sandbox <uuid>` - Fetch a dog from sandbox
- `npm run fetch-dog:prod <uuid>` - Fetch a dog from production

- `npm run delete-dog:sandbox <uuid>` - Delete a dog from sandbox
- `npm run delete-dog:prod <uuid>` - Delete a dog from production


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
