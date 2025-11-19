import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, ScanCommand, PutCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb';
import { fromIni } from '@aws-sdk/credential-providers';

// Configure client with the amplify-local profile
const client = new DynamoDBClient({
  region: 'us-east-1',
  credentials: fromIni({ profile: 'amplify-local' }),
});

const docClient = DynamoDBDocumentClient.from(client);

// Get S3 bucket URL from amplify_outputs.json
function getS3BucketUrl() {
  // Always use hardcoded PROD bucket
  return 'https://amplify-d1j7hp8n2ncs5i-ma-dogprofileimagesbucket9a-1f3ccflmpepa.s3.amazonaws.com';
}

const S3_BUCKET_URL = getS3BucketUrl();
console.log(`📦 Using S3 Bucket: ${S3_BUCKET_URL}\n`);

const dogsToAdd = [
  {
    id: 'tesla-001',
    uuid: '1',
    name: 'Tesla',
    image: `${S3_BUCKET_URL}/dog-images/1.webp`,
    tagline: "🪽🐕🪽",
    ownerFirstName: 'Andrew',
    ownerLastName: 'Grube',
    phoneLink: '9133754353',
    temperament: 'Friendly, but anxious.',
    allergies: 'No allergies.',
    dietary: 'Loves peanut butter and cuddling under the blankets.',
    microchipped: 'Yes',
  },
  {
    id: 'cipher-001',
    uuid: '019fbd5b-22a8-4415-a11c-08e26c46708e',
    name: 'Cipher',
    image: `${S3_BUCKET_URL}/dog-images/019fbd5b-22a8-4415-a11c-08e26c46708e.webp`,
    tagline: "I'm lost! Please help me find my humans.",
    ownerFirstName: 'Andrew',
    ownerLastName: 'Grube',
    phoneLink: '9133754353',
    medical: "Needs insulin at 6:00 PM daily.",
    temperament: 'Friendly, but anxious.',
    allergies: 'No allergies.',
    dietary: 'Loves peanut butter!',
    microchipped: 'Yes',
  },
  {
    id: 'benji-001',
    uuid: 'be7e5a93-9abd-4bb3-8ee7-a70fb45bf4b4',
    name: 'Benji',
    image: `${S3_BUCKET_URL}/dog-images/be7e5a93-9abd-4bb3-8ee7-a70fb45bf4b4.webp`,
    tagline: "I'm lost! Please help me find my humans.",
    ownerFirstName: 'Andrew',
    ownerLastName: 'Grube',
    phoneLink: '9133754353',
    temperament: 'Playful and energetic.',
    allergies: 'No allergies.',
    dietary: 'Loves cheese, peanut butter, and kisses.',
    microchipped: 'Yes',
  },
  {
    id: 'paccino-001',
    uuid: 'eb2a745f-d1f8-478b-aa18-38443d998c4f',
    name: 'Paccino',
    image: `${S3_BUCKET_URL}/dog-images/eb2a745f-d1f8-478b-aa18-38443d998c4f.webp`,
    tagline: "I'm lost! Please help me find my humans.",
    ownerFirstName: 'Kayla',
    ownerLastName: 'Curnutte',
    phoneLink: '9139046192',
    temperament: 'Playful and energetic.',
    allergies: 'No allergies.',
    dietary: 'Loves cheese, peanut butter, and kisses.',
    microchipped: 'Yes',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'kingsley-001',
    uuid: '90321c29-1993-4715-a32c-7fe78686ee84',
    name: 'Kingsley',
    image: `${S3_BUCKET_URL}/dog-images/90321c29-1993-4715-a32c-7fe78686ee84.webp`,
    tagline: "I'm lost! Please help me find my humans.",
    ownerFirstName: 'Jesi',
    ownerLastName: 'Dang-Machuca',
    phoneLink: '3104240642',
    temperament: 'Playful and energetic.',
    allergies: 'No allergies.',
    dietary: 'Loves to eat 💩.',
    microchipped: 'Yes',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'charlotte-001',
    uuid: '85815c34-4157-42d3-9cda-0a117707d1e7',
    name: 'Charlotte',
    image: `${S3_BUCKET_URL}/dog-images/85815c34-4157-42d3-9cda-0a117707d1e7.webp`,
    tagline: "I'm lost! Please help me find my humans.",
    ownerFirstName: 'Jesi',
    ownerLastName: 'Dang-Machuca',
    phoneLink: '3104240642',
    temperament: 'Queen Bee 🐝 energy.',
    allergies: 'No allergies.',
    dietary: 'Loves cheese, peanut butter, and kisses.',
    microchipped: 'Yes',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'carmela-001',
    uuid: '5650d757-8136-464b-a9bc-ccc82e6938e6',
    name: 'Carmela!!!!',
    image: `${S3_BUCKET_URL}/dog-images/5650d757-8136-464b-a9bc-ccc82e6938e6.webp`,
    tagline: "I'm lost! Please help me find my humans.",
    ownerFirstName: 'Emily',
    ownerLastName: 'Nold',
    phoneLink: '8165093125',
    temperament: 'Will work for treats.',
    allergies: 'No allergies.',
    dietary: 'Loves cheese, peanut butter, and kisses.',
    microchipped: 'Yes',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

async function seedLiveDatabase() {
  try {
    console.log('🐕 Starting live database seeding...\n');
    
  // Hardcoded table name for production
  const tableName = 'Dog-a46lcdczfvgt7fl534ifthgk3i-NONE';
    
    for (const dog of dogsToAdd) {
      console.log(`Processing ${dog.name}...`);
      
      try {
        // First, check if a dog with this UUID already exists
        const scanCommand = new ScanCommand({
          TableName: tableName,
          FilterExpression: '#uuid = :uuid',
          ExpressionAttributeNames: {
            '#uuid': 'uuid',
          },
          ExpressionAttributeValues: {
            ':uuid': dog.uuid,
          },
        });
        
        const scanResult = await docClient.send(scanCommand);
        const existingDog = scanResult.Items && scanResult.Items.length > 0 ? scanResult.Items[0] : null;
        
        if (existingDog) {
          // Dog exists - UPDATE it
          console.log(`  📝 Updating existing dog (ID: ${existingDog.id})...`);
          
          const updateExpressions = [];
          const expressionAttributeNames = {};
          const expressionAttributeValues = {};
          let hasUpdatedAt = false;
          
          Object.entries(dog).forEach(([key, value]) => {
            if (key !== 'id' && key !== 'createdAt') {
              const attrName = `#${key}`;
              const valueName = `:${key}`;
              
              expressionAttributeNames[attrName] = key;
              expressionAttributeValues[valueName] = value;
              updateExpressions.push(`${attrName} = ${valueName}`);
              
              if (key === 'updatedAt') {
                hasUpdatedAt = true;
              }
            }
          });
          
          // Only add updatedAt if it wasn't already in the dog object
          if (!hasUpdatedAt) {
            updateExpressions.push('#updatedAt = :updatedAt');
            expressionAttributeNames['#updatedAt'] = 'updatedAt';
            expressionAttributeValues[':updatedAt'] = new Date().toISOString();
          }
          
          const updateCommand = new UpdateCommand({
            TableName: tableName,
            Key: { id: existingDog.id },
            UpdateExpression: `SET ${updateExpressions.join(', ')}`,
            ExpressionAttributeNames: expressionAttributeNames,
            ExpressionAttributeValues: expressionAttributeValues,
          });
          
          await docClient.send(updateCommand);
          console.log(`  ✅ Successfully updated ${dog.name}\n`);
        } else {
          // Dog doesn't exist - CREATE it
          console.log(`  ✨ Creating new dog...`);
          
          const command = new PutCommand({
            TableName: tableName,
            Item: {
              ...dog,
              id: `${dog.name.toLowerCase()}-${Date.now()}`,
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          });
          
          await docClient.send(command);
          console.log(`  ✅ Successfully added ${dog.name}\n`);
        }
      } catch (itemError) {
        console.error(`  ❌ Error processing ${dog.name}:`, itemError.message, '\n');
      }
    }
    
    console.log('✅ Live database seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Fatal error during seeding:', error.message);
    process.exit(1);
  }
}

seedLiveDatabase();
