import { useState, useEffect } from 'react';
import { generateClient } from 'aws-amplify/data';
import { getUrl } from 'aws-amplify/storage';
import { Amplify } from 'aws-amplify';

export const useDogProfile = (uuid) => {
  const [dogProfile, setDogProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDog = async () => {
      if (!uuid) {
        setDogProfile(null);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        
        // Log config for debugging
        const config = Amplify.getConfig();
        console.log('Amplify Config:', config);
        
        if (!config || Object.keys(config).length === 0) {
          throw new Error('Amplify not configured - config is empty');
        }
        
        // Generate a fresh client for this request to ensure credentials are loaded
        const client = generateClient({ userAgentDetails: { userAgent: 'found-my-friend/1.0.0' } });
        
        // Query all dogs and find by UUID (or you can filter by uuid if supported)
        const { data: dogs } = await client.models.Dog.list({
          filter: {
            uuid: {
              eq: uuid,
            },
          },
        });

        if (dogs && dogs.length > 0) {
          const dog = dogs[0];
          
          // Get presigned URL for the dog image
          let imageUrl = dog.image;
          if (dog.image && dog.image.includes('/dog-images/')) {
            try {
              // Extract the S3 key from the full URL
              const key = dog.image.split('/dog-images/')[1];
              const urlResult = await getUrl({
                path: `dog-images/${key}`,
                options: {
                  expiresIn: 3600, // URL expires in 1 hour
                },
              });
              imageUrl = urlResult.url.toString();
            } catch (storageError) {
              console.error('Error getting presigned URL:', storageError);
              // Fall back to original URL if presigned URL fails
            }
          }
          
          // Transform DynamoDB data to match our expected format
          const profile = {
            id: dog.id,
            uuid: dog.uuid,
            name: dog.name,
            image: imageUrl,
            tagline: dog.tagline,
            ownerFirstName: dog.ownerFirstName,
            ownerLastName: dog.ownerLastName,
            phoneLink: dog.phoneLink,
            medical: dog.medical,
            details: [
              ...(dog.temperament ? [{ label: 'Temperament', value: dog.temperament }] : []),
              ...(dog.allergies ? [{ label: 'Allergies', value: dog.allergies }] : []),
              ...(dog.dietary ? [{ label: 'Dietary', value: dog.dietary }] : []),
              ...(dog.microchipped ? [{ label: 'Microchipped', value: dog.microchipped }] : []),
            ],
          };
          setDogProfile(profile);
        } else {
          setDogProfile(null);
        }
      } catch (err) {
        console.error('Error fetching dog profile:', err);
        setError(err);
        setDogProfile(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDog();
  }, [uuid]);

  return { dogProfile, loading, error };
};
