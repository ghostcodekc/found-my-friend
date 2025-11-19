export const dogs = {
  cipher: {
    name: "Cipher",
    uuid: "019fbd5b-22a8-4415-a11c-08e26c46708e",
    image: "/images/cipher.webp",
    tagline: "I'm lost! Please help me find my humans.",
    ownerFirstName: "Andrew",
    ownerLastName: "Grube",
    phoneLink: "9133754353",
    // medical: "Needs insulin at 6:00 PM daily." ,
    details: [
      { label: "Temperament", value: "Friendly, but anxious." },
      { label: "Allergies", value: "No allergies." },
      { label: "Dietary", value: "Loves peanut butter!" },
      { label: "Microchipped", value: "Yes" },
    ]
  },
  benji: {
    name: "Benji",
    uuid: "be7e5a93-9abd-4bb3-8ee7-a70fb45bf4b4",
    image: "/images/benji.webp",
    tagline: "I'm lost! Please help me find my humans.",
    ownerFirstName: "Andrew",
    ownerLastName: "Grube",
    phoneLink: "9133754353",
    details: [
      { label: "Temperament", value: "Playful and energetic." },
      { label: "Allergies", value: "No allergies." },
      { label: "Dietary", value: "Loves cheese, peanut butter, and kisses." },
      { label: "Microchipped", value: "Yes" },
    ]
  }
};

export const getDogProfile = (dogName) => {
  return dogs[dogName?.toLowerCase()] || null;
};

export const getDogProfileByUuid = (uuid) => {
  return Object.values(dogs).find(dog => dog.uuid === uuid) || null;
};