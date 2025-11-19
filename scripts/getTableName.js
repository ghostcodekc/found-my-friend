// Helper to resolve which DynamoDB table to use (sandbox vs prod)
// Resolution order (highest precedence first):
// 1. TABLE_NAME environment variable (explicit table name)
// 2. --env or -e CLI flag (values: sandbox|prod)
// 3. DB_ENV environment variable (values: sandbox|prod)
// 4. default: 'prod' (keeps existing behavior safe)

const TABLE_MAP = {
  sandbox: 'Dog-pkowf7ajanhi5pljnt46p4un6q-NONE',
  prod: 'Dog-a46lcdczfvgt7fl534ifthgk3i-NONE',
};

function parseEnvFlag() {
  const argv = process.argv.slice(2);
  if (!argv || argv.length === 0) return undefined;

  // Support --env=val, --env val, -e val
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a.startsWith('--env=')) return a.split('=')[1];
    if (a === '--env' || a === '-e') return argv[i + 1];
    // support alternative flags that npm won't consume
    if (a.startsWith('--db-env=')) return a.split('=')[1];
    if (a === '--db-env' || a === '--db' || a === '-d') return argv[i + 1];
    if (a.startsWith('--target=')) return a.split('=')[1];
  }

  // If npm consumed the flag (e.g. --env) and left a single positional arg like "sandbox",
  // allow passing the env as the first positional arg: `npm run seed -- sandbox`
  const first = argv[0];
  if (first && (first.toLowerCase() === 'sandbox' || first.toLowerCase() === 'prod' || first.includes('Dog-') || first.includes('-NONE'))) {
    return first;
  }
  return undefined;
}

export function resolveTableName() {
  // 1) explicit table name
  if (process.env.TABLE_NAME && process.env.TABLE_NAME.trim() !== '') {
    console.log('Selected table via TABLE_NAME env var:', process.env.TABLE_NAME);
    return process.env.TABLE_NAME.trim();
  }

  // 2) CLI flag
  const cliEnv = parseEnvFlag();
  if (cliEnv) {
    const key = cliEnv.toLowerCase();
    if (TABLE_MAP[key]) {
      console.log('Selected table via CLI --env flag:', key, TABLE_MAP[key]);
      return TABLE_MAP[key];
    }
    // If the CLI provided a raw table name, return it
    if (cliEnv.includes('Dog-') || cliEnv.includes('-NONE')) {
      console.log('Selected table via CLI --env (raw table name):', cliEnv);
      return cliEnv;
    }
  }

  // 3) DB_ENV environment variable
  if (process.env.DB_ENV) {
    const key = process.env.DB_ENV.toLowerCase();
    if (TABLE_MAP[key]) {
      console.log('Selected table via DB_ENV env var:', key, TABLE_MAP[key]);
      return TABLE_MAP[key];
    }
    if (process.env.DB_ENV.includes('Dog-')) {
      console.log('Selected table via DB_ENV (raw table name):', process.env.DB_ENV);
      return process.env.DB_ENV;
    }
  }

  // 4) sensible default (prod to preserve previous scripts' behaviour)
  console.log('No table override found; defaulting to PROD table:', TABLE_MAP.prod);
  return TABLE_MAP.prod;
}

export default resolveTableName;
