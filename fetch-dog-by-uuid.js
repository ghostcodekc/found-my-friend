import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, QueryCommand, ScanCommand } from '@aws-sdk/lib-dynamodb';
import { fromIni } from '@aws-sdk/credential-providers';

// Configure client with the amplify-local profile
const client = new DynamoDBClient({
  region: 'us-east-1',
  credentials: fromIni({ profile: 'amplify-local' }),
});

const docClient = DynamoDBDocumentClient.from(client);

async function fetchDogByUuid(uuid) {
  try {
    console.log(`🔍 Searching for dog with UUID: ${uuid}\n`);

  const tableName = 'Dog-a46lcdczfvgt7fl534ifthgk3i-NONE';

    // Query for the dog by uuid (GSI or scan)
    // First, let's try a scan with filter since uuid might be a GSI
    const command = new QueryCommand({
      TableName: tableName,
      IndexName: 'uuid-index', // Assuming there's a GSI on uuid
      KeyConditionExpression: '#uuid = :uuid',
      ExpressionAttributeNames: {
        '#uuid': 'uuid',
      },
      ExpressionAttributeValues: {
        ':uuid': uuid,
      },
    });

    const result = await docClient.send(command);

    if (result.Items && result.Items.length > 0) {
      const dog = result.Items[0];
      console.log('✅ Dog found:\n');
      console.log(JSON.stringify(dog, null, 2));
      return dog;
    } else {
      console.log('❌ No dog found with that UUID');
      return null;
    }
  } catch (error) {
    // If uuid-index doesn't exist, fall back to scan
    if (error.message.includes('index') || error.message.includes('Index')) {
      console.log('⚠️ UUID index not found, attempting scan...\n');
      return await scanDogByUuid(uuid);
    }
    console.error('❌ Error fetching dog:', error.message);
    process.exit(1);
  }
}

async function scanDogByUuid(uuid) {
  try {
    const tableName = 'Dog-a46lcdczfvgt7fl534ifthgk3i-NONE';

    const command = new ScanCommand({
      TableName: tableName,
      FilterExpression: '#uuid = :uuid',
      ExpressionAttributeNames: {
        '#uuid': 'uuid',
      },
      ExpressionAttributeValues: {
        ':uuid': uuid,
      },
    });

    const result = await docClient.send(command);

    if (result.Items && result.Items.length > 0) {
      const dog = result.Items[0];
      console.log('✅ Dog found:\n');
      console.log(JSON.stringify(dog, null, 2));
      return dog;
    } else {
      console.log('❌ No dog found with that UUID');
      return null;
    }
  } catch (error) {
    console.error('❌ Error scanning for dog:', error.message);
    process.exit(1);
  }
}

// Extract UUID from command line args.
// Support forms:
// 1) node fetch-dog-by-uuid.js <uuid>
// 2) node fetch-dog-by-uuid.js sandbox <uuid>
// 3) npm run fetch-dog:sandbox -- <uuid>
function getUuidFromArgs() {
  const argv = process.argv.slice(2);
  if (argv.length === 0) return undefined;

  const first = argv[0];
  const firstLower = first && typeof first === 'string' ? first.toLowerCase() : '';
  const isEnvLike = firstLower === 'sandbox' || firstLower === 'prod' || first.startsWith('Dog-') || first.includes('-NONE');
  if (isEnvLike) {
    return argv[1];
  }

  // otherwise the first positional arg is the uuid
  return argv[0];
}

const uuid = getUuidFromArgs();

if (!uuid) {
  console.error('❌ Please provide a UUID as an argument');
  console.log('\nUsage:');
  console.log('  node fetch-dog-by-uuid.js <uuid>');
  console.log('  node fetch-dog-by-uuid.js sandbox <uuid>');
  console.log('  npm run fetch-dog:sandbox -- <uuid>');
  console.log('\nExample: node fetch-dog-by-uuid.js 019fbd5b-22a8-4415-a11c-08e26c46708e');
  process.exit(1);
}

fetchDogByUuid(uuid).then(() => {
  process.exit(0);
});
