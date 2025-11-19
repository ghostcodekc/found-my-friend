import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, DeleteCommand } from '@aws-sdk/lib-dynamodb';
import { fromIni } from '@aws-sdk/credential-providers';
import { resolveTableName } from './scripts/getTableName.js';

// Configure client with the amplify-local profile
const client = new DynamoDBClient({
  region: 'us-east-1',
  credentials: fromIni({ profile: 'amplify-local' }),
});

const docClient = DynamoDBDocumentClient.from(client);

async function deleteDogByUuid(uuid) {
  try {
    console.log(`🔍 Searching for dog with UUID: ${uuid}\n`);

  const tableName = resolveTableName();

    // First, find the dog by uuid to get its id (primary key)
    const scanCommand = new ScanCommand({
      TableName: tableName,
      FilterExpression: '#uuid = :uuid',
      ExpressionAttributeNames: {
        '#uuid': 'uuid',
      },
      ExpressionAttributeValues: {
        ':uuid': uuid,
      },
    });

    const scanResult = await docClient.send(scanCommand);

    if (!scanResult.Items || scanResult.Items.length === 0) {
      console.log('❌ No dog found with that UUID');
      return null;
    }

    const dog = scanResult.Items[0];
    const dogId = dog.id;
    
    console.log(`✅ Found dog: ${dog.name}`);
    console.log(`⚠️  About to delete this record...\n`);

    // Delete the record
    const deleteCommand = new DeleteCommand({
      TableName: tableName,
      Key: { id: dogId },
    });

    await docClient.send(deleteCommand);
    
    console.log(`🗑️  Successfully deleted ${dog.name} from the database\n`);
    
    return dog;
  } catch (error) {
    console.error('❌ Error deleting dog:', error.message);
    process.exit(1);
  }
}

// Extract UUID from command line args.
// Support forms:
// 1) node delete-dog-by-uuid.js <uuid>
// 2) node delete-dog-by-uuid.js sandbox <uuid>
// 3) npm run delete-dog:sandbox -- <uuid>
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
  console.log('  node delete-dog-by-uuid.js <uuid>');
  console.log('  node delete-dog-by-uuid.js sandbox <uuid>');
  console.log('  npm run delete-dog:sandbox -- <uuid>');
  console.log('\nExample: node delete-dog-by-uuid.js 019fbd5b-22a8-4415-a11c-08e26c46708e');
  process.exit(1);
}

deleteDogByUuid(uuid).then(() => {
  process.exit(0);
});
