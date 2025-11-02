// FIX: Added imports for new types used in mock data.
import type { Animal, User, Post, SuccessStory, VetClinic, Vet } from './types';

export const MOCK_ANIMALS: Animal[] = [
  {
    id: 1,
    name: 'Buddy',
    breed: 'Golden Retriever Mix',
    age: '2 years',
    gender: 'Male',
    description: 'Buddy is a playful and friendly dog who loves fetch and long walks. He is great with kids and other dogs.',
    imageUrl: 'https://picsum.photos/seed/buddy/400/300',
  },
  {
    id: 2,
    name: 'Lucy',
    breed: 'Domestic Shorthair',
    age: '1 year',
    gender: 'Female',
    description: 'Lucy is a sweet and curious cat who enjoys sunbathing and chasing laser pointers. She is looking for a quiet home.',
    imageUrl: 'https://picsum.photos/seed/lucy/400/300',
  },
  {
    id: 3,
    name: 'Max',
    breed: 'German Shepherd',
    age: '3 years',
    gender: 'Male',
    description: 'Max is a loyal and intelligent companion. He is well-trained and would thrive in an active household.',
    imageUrl: 'https://picsum.photos/seed/max/400/300',
  },
  {
    id: 4,
    name: 'Daisy',
    breed: 'Beagle',
    age: '4 years',
    gender: 'Female',
    description: 'Daisy is a cheerful and loving beagle with a nose for adventure. Her tail is always wagging!',
    imageUrl: 'https://picsum.photos/seed/daisy/400/300',
  },
  {
    id: 5,
    name: 'Rocky',
    breed: 'Labrador Mix',
    age: '10 months',
    gender: 'Male',
    description: 'Rocky is an energetic puppy full of life and love. He is learning basic commands and is eager to please.',
    imageUrl: 'https://picsum.photos/seed/rocky/400/300',
  },
  {
    id: 6,
    name: 'Misty',
    breed: 'Siamese',
    age: '5 years',
    gender: 'Female',
    description: 'Misty is an elegant and affectionate cat who loves to be pampered. She enjoys quiet afternoons and gentle pets.',
    imageUrl: 'https://picsum.photos/seed/misty/400/300',
  },
];

// FIX: Added mock user data for authentication.
export const MOCK_USERS: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
];

// FIX: Added mock post data for the community page.
export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: { id: 1, name: 'John Doe' },
    content: 'Just adopted this little guy! Everyone, meet Sparky!',
    imageUrl: 'https://picsum.photos/seed/sparky/600/400',
    timestamp: new Date(Date.now() - 3600 * 1000 * 5).toISOString(),
    likes: 15,
    comments: [
        { id: 1, author: { id: 2, name: 'Jane Smith' }, text: 'So cute!', timestamp: new Date(Date.now() - 3600 * 1000 * 4).toISOString() }
    ],
  },
  {
    id: 2,
    author: { id: 2, name: 'Jane Smith' },
    content: 'Any tips for a first-time cat owner? Feeling a little overwhelmed but very excited!',
    timestamp: new Date(Date.now() - 86400 * 1000 * 2).toISOString(),
    likes: 32,
    comments: [],
  },
];

// FIX: Added mock vet data to resolve compilation errors for the deprecated Online Vet feature.
export const MOCK_VETS: Vet[] = [
  {
    id: 1,
    name: 'Dr. Anika Rahman',
    specialization: 'Feline Medicine',
    imageUrl: 'https://picsum.photos/seed/vet1/200/200',
    isOnline: true,
  },
  {
    id: 2,
    name: 'Dr. Farhan Hossain',
    specialization: 'Canine Behavior',
    imageUrl: 'https://picsum.photos/seed/vet2/200/200',
    isOnline: false,
  },
  {
    id: 3,
    name: 'Dr. Samina Chowdhury',
    specialization: 'Exotic Pets',
    imageUrl: 'https://picsum.photos/seed/vet3/200/200',
    isOnline: true,
  },
  {
    id: 4,
    name: 'Dr. Kamal Ahmed',
    specialization: 'General Practice',
    imageUrl: 'https://picsum.photos/seed/vet4/200/200',
    isOnline: false,
  },
];

// FIX: Added mock vet clinic data for the "Find a Vet" page.
export const MOCK_VET_CLINICS: VetClinic[] = [
  {
    id: 1,
    name: 'PAW Life Care',
    address: 'House 1/2, Road 2, Block A, Section 10, Mirpur, Dhaka',
    phone: '+8801712345678',
    website: 'https://pawlifecare.com',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=PAW+Life+Care+Dhaka',
    hours: '10:00 AM - 8:00 PM',
  },
  {
    id: 2,
    name: 'PetVet Care',
    address: 'House 34, Road 12, Block E, Banani, Dhaka',
    phone: '+8801812345679',
    website: 'https://petvetcare.com',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=PetVet+Care+Banani+Dhaka',
    hours: '9:00 AM - 9:00 PM',
  },
  {
    id: 3,
    name: 'Central Veterinary Hospital',
    address: '42, Kazi Nazrul Islam Ave, Dhaka 1215',
    phone: '+88029665492',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Central+Veterinary+Hospital+Dhaka',
    hours: '24 Hours',
  },
  {
    id: 4,
    name: 'Gulshan Pet Animal Clinic',
    address: 'House 20, Road 55, Gulshan 2, Dhaka',
    phone: '+8801912345680',
    website: 'https://gulshanpetclinic.com',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gulshan+Pet+Animal+Clinic+Dhaka',
    hours: '11:00 AM - 7:00 PM',
  },
  {
    id: 5,
    name: 'Obhoyaronno Vet Clinic',
    address: 'House-3, Road-1, Sector-1, Uttara, Dhaka 1230',
    phone: '+8801718123456',
    website: 'http://obhoyaronno.org',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Obhoyaronno+Vet+Clinic+Uttara+Dhaka',
    hours: '10:00 AM - 7:00 PM',
  },
  {
    id: 6,
    name: 'The VET',
    address: 'House 7, Road 2/A, Sector 4, Uttara, Dhaka',
    phone: '+8801313303303',
    website: 'https://thevet.com.bd',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+VET+Uttara+Dhaka',
    hours: '10:00 AM - 10:00 PM',
  },
  {
    id: 7,
    name: 'Care & Cure Vet Chamber',
    address: '5/4, Block-F, Lalmatia, Dhaka',
    phone: '+8801711234567',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Care+&+Cure+Vet+Chamber+Lalmatia+Dhaka',
    hours: '5:00 PM - 9:00 PM',
  },
  {
    id: 8,
    name: 'Dr. K-Nine Pet Zone & Clinic',
    address: 'House 27, Road 15, Sector 13, Uttara, Dhaka',
    phone: '+8801979362867',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dr.+K-Nine+Pet+Zone+&+Clinic+Uttara+Dhaka',
    hours: '11:00 AM - 10:00 PM',
  },
];


// FIX: Added mock success stories for the homepage.
export const MOCK_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 1,
    name: 'Milo',
    imageUrl: 'https://picsum.photos/seed/milo-adopted/500/500',
    story: '"We found Milo scared and alone. Now, he\'s the heart of our family, filling our days with endless joy and sloppy kisses. Adopting him was the best decision we ever made!" - The Rahman Family',
  },
  {
    id: 2,
    name: 'Cleo',
    imageUrl: 'https://picsum.photos/seed/cleo-adopted/500/500',
    story: '"Cleo was so shy at first, but with a little patience, she blossomed into the most affectionate cat. Her purrs are the best therapy. Thank you, KUTTAWAALA!" - Ms. Anika',
  },
  {
    id: 3,
    name: 'Bolt',
    imageUrl: 'https://picsum.photos/seed/bolt-adopted/500/500',
    story: '"From a life on the streets to ruling the dog park! Bolt\'s energy is infectious. He reminds us every day to live life to the fullest. He\'s our little superhero." - The Hossain Couple',
  },
];