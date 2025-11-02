// FIX: Added imports for new types used in mock data.
import type { Animal, User, SuccessStory, VetClinic, Post, QuizQuestion, VolunteerOpportunity, Memorial, Donation, Application, Vet } from './types';

export const MOCK_ANIMALS: Animal[] = [
  {
    id: 1,
    name: 'Buddy',
    breed: 'Golden Retriever Mix',
    age: '2 years',
    gender: 'Male',
    description: 'Buddy is a playful and friendly dog who loves fetch and long walks. He is great with kids and other dogs.',
    imageUrl: 'https://picsum.photos/seed/buddy/400/300',
    temperamentTags: ['Playful', 'Energetic', 'Good with Kids', 'Friendly'],
  },
  {
    id: 2,
    name: 'Lucy',
    breed: 'Domestic Shorthair',
    age: '1 year',
    gender: 'Female',
    description: 'Lucy is a sweet and curious cat who enjoys sunbathing and chasing laser pointers. She is looking for a quiet home.',
    imageUrl: 'https://picsum.photos/seed/lucy/400/300',
    temperamentTags: ['Calm', 'Curious', 'Independent', 'Apartment Friendly'],
  },
  {
    id: 3,
    name: 'Max',
    breed: 'German Shepherd',
    age: '3 years',
    gender: 'Male',
    description: 'Max is a loyal and intelligent companion. He is well-trained and would thrive in an active household.',
    imageUrl: 'https://picsum.photos/seed/max/400/300',
    temperamentTags: ['Loyal', 'Intelligent', 'Energetic', 'Needs a Yard'],
  },
  {
    id: 4,
    name: 'Daisy',
    breed: 'Beagle',
    age: '4 years',
    gender: 'Female',
    description: 'Daisy is a cheerful and loving beagle with a nose for adventure. Her tail is always wagging!',
    imageUrl: 'https://picsum.photos/seed/daisy/400/300',
    temperamentTags: ['Friendly', 'Curious', 'Good with Kids', 'Loves Walks'],
  },
  {
    id: 5,
    name: 'Rocky',
    breed: 'Labrador Mix',
    age: '10 months',
    gender: 'Male',
    description: 'Rocky is an energetic puppy full of life and love. He is learning basic commands and is eager to please.',
    imageUrl: 'https://picsum.photos/seed/rocky/400/300',
    temperamentTags: ['Playful', 'Energetic', 'Puppy Energy', 'Needs Training'],
  },
  {
    id: 6,
    name: 'Misty',
    breed: 'Siamese',
    age: '5 years',
    gender: 'Female',
    description: 'Misty is an elegant and affectionate cat who loves to be pampered. She enjoys quiet afternoons and gentle pets.',
    imageUrl: 'https://picsum.photos/seed/misty/400/300',
    temperamentTags: ['Affectionate', 'Calm', 'Vocal', 'Apartment Friendly'],
  },
];

// FIX: Added mock user data for authentication.
export const MOCK_USERS: User[] = [
  { id: 1, name: 'John Doe', email: 'john@example.com', password: 'password123' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', password: 'password123' },
];

export const BANGLADESH_DISTRICTS: string[] = [
  "Bagerhat", "Bandarban", "Barguna", "Barishal", "Bhola", "Bogura",
  "Brahmanbaria", "Chandpur", "Chattogram", "Chuadanga", "Comilla",
  "Cox's Bazar", "Dhaka", "Dinajpur", "Faridpur", "Feni", "Gaibandha",
  "Gazipur", "Gopalganj", "Habiganj", "Jamalpur", "Jashore", "Jhalokati",
  "Jhenaidah", "Joypurhat", "Khagrachari", "Khulna", "Kishoreganj",
  "Kurigram", "Kushtia", "Lakshmipur", "Lalmonirhat", "Madaripur",
  "Magura", "Manikganj", "Meherpur", "Moulvibazar", "Munshiganj",
  "Mymensingh", "Naogaon", "Narail", "Narayanganj", "Narsingdi", "Natore",
  "Nawabganj", "Netrokona", "Nilphamari", "Noakhali", "Pabna",
  "Panchagarh", "Patuakhali", "Pirojpur", "Rajbari", "Rajshahi",
  "Rangamati", "Rangpur", "Satkhira", "Shariatpur", "Sherpur", "Sirajganj",
  "Sunamganj", "Sylhet", "Tangail", "Thakurgaon"
];


// FIX: Added mock vet clinic data for the "Find a Vet" page.
export const MOCK_VET_CLINICS: VetClinic[] = [
  // Dhaka Division
  { id: 1, name: 'PAW Life Care', address: 'House 1/2, Road 2, Block A, Section 10, Mirpur, Dhaka', phone: '+8801712345678', website: 'https://pawlifecare.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=PAW+Life+Care+Dhaka', hours: '10:00 AM - 8:00 PM', district: 'Dhaka' },
  { id: 2, name: 'PetVet Care', address: 'House 34, Road 12, Block E, Banani, Dhaka', phone: '+8801812345679', website: 'https://petvetcare.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=PetVet+Care+Banani+Dhaka', hours: '9:00 AM - 9:00 PM', district: 'Dhaka' },
  { id: 3, name: 'Central Veterinary Hospital', address: '42, Kazi Nazrul Islam Ave, Dhaka 1215', phone: '+88029665492', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Central+Veterinary+Hospital+Dhaka', hours: '24 Hours', district: 'Dhaka' },
  { id: 4, name: 'Gulshan Pet Animal Clinic', address: 'House 20, Road 55, Gulshan 2, Dhaka', phone: '+8801912345680', website: 'https://gulshanpetclinic.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gulshan+Pet+Animal+Clinic+Dhaka', hours: '11:00 AM - 7:00 PM', district: 'Dhaka' },
  { id: 5, name: 'Obhoyaronno Vet Clinic', address: 'House-3, Road-1, Sector-1, Uttara, Dhaka 1230', phone: '+8801718123456', website: 'http://obhoyaronno.org', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Obhoyaronno+Vet+Clinic+Uttara+Dhaka', hours: '10:00 AM - 7:00 PM', district: 'Dhaka' },
  { id: 6, name: 'The VET', address: 'House 7, Road 2/A, Sector 4, Uttara, Dhaka', phone: '+8801313303303', website: 'https://thevet.com.bd', mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+VET+Uttara+Dhaka', hours: '10:00 AM - 10:00 PM', district: 'Dhaka' },
  { id: 7, name: 'Care & Cure Vet Chamber', address: '5/4, Block-F, Lalmatia, Dhaka', phone: '+8801711234567', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Care+&+Cure+Vet+Chamber+Lalmatia+Dhaka', hours: '5:00 PM - 9:00 PM', district: 'Dhaka' },
  { id: 8, name: 'Dr. K-Nine Pet Zone & Clinic', address: 'House 27, Road 15, Sector 13, Uttara, Dhaka', phone: '+8801979362867', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dr.+K-Nine+Pet+Zone+&+Clinic+Uttara+Dhaka', hours: '11:00 AM - 10:00 PM', district: 'Dhaka' },
  { id: 9, name: 'Gazipur Pet Clinic', address: 'Joydebpur, Gazipur', phone: '+8801711111111', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gazipur+Pet+Clinic', hours: '10 AM - 6 PM', district: 'Gazipur' },
  { id: 10, name: 'Narayanganj Animal Care', address: 'Chashara, Narayanganj', phone: '+8801822222222', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Narayanganj+Animal+Care', hours: '11 AM - 8 PM', district: 'Narayanganj' },
  { id: 11, name: 'Manikganj Vet Care', address: 'Manikganj Sadar, Manikganj', phone: '+8801933333333', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Manikganj+Vet+Care', hours: '9 AM - 5 PM', district: 'Manikganj' },
  { id: 12, name: 'Tangail Pet Hospital', address: 'Tangail Sadar, Tangail', phone: '+8801544444444', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tangail+Pet+Hospital', hours: '10 AM - 7 PM', district: 'Tangail' },
  { id: 13, name: 'Kishoreganj Animal Clinic', address: 'Kishoreganj Sadar, Kishoreganj', phone: '+8801655555555', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kishoreganj+Animal+Clinic', hours: '10 AM - 6 PM', district: 'Kishoreganj' },
  { id: 14, name: 'Faridpur Vet Service', address: 'Faridpur Sadar, Faridpur', phone: '+8801766666666', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Faridpur+Vet+Service', hours: '9 AM - 5 PM', district: 'Faridpur' },

  // Chattogram Division
  { id: 15, name: 'Chattogram Vet & Pet Care', address: 'Nasirabad, Chattogram', phone: '+8801812345678', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Chattogram+Vet+&+Pet+Care', hours: '10 AM - 9 PM', district: 'Chattogram' },
  { id: 16, name: 'CVASU Veterinary Clinic', address: 'Khulshi, Chattogram', phone: '+88031659093', website: 'https://cvasu.ac.bd', mapUrl: 'https://www.google.com/maps/search/?api=1&query=CVASU+Veterinary+Clinic+Chattogram', hours: '9 AM - 5 PM', district: 'Chattogram' },
  { id: 17, name: 'Cox\'s Bazar Pet Clinic', address: 'Kolatoli, Cox\'s Bazar', phone: '+8801777777777', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cox%27s+Bazar+Pet+Clinic', hours: '10 AM - 7 PM', district: "Cox's Bazar" },
  { id: 18, name: 'Cumilla Pet Care', address: 'Kandirpar, Cumilla', phone: '+8801988888888', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cumilla+Pet+Care', hours: '11 AM - 8 PM', district: 'Comilla' },
  { id: 19, name: 'Feni Animal Hospital', address: 'Feni Sadar, Feni', phone: '+8801599999999', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Feni+Animal+Hospital', hours: '10 AM - 6 PM', district: 'Feni' },
  { id: 20, name: 'Noakhali Pet Vet', address: 'Maijdee, Noakhali', phone: '+8801610101010', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Noakhali+Pet+Vet', hours: '10 AM - 7 PM', district: 'Noakhali' },

  // Rajshahi Division
  { id: 21, name: 'Rajshahi Pet Clinic', address: 'Uposhohor, Rajshahi', phone: '+8801712345679', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rajshahi+Pet+Clinic', hours: '10 AM - 8 PM', district: 'Rajshahi' },
  { id: 22, name: 'Bogura Animal Care Center', address: 'Shatmatha, Bogura', phone: '+8801912345670', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bogura+Animal+Care+Center', hours: '11 AM - 7 PM', district: 'Bogura' },
  { id: 23, name: 'Pabna Vet Point', address: 'Pabna Sadar, Pabna', phone: '+8801811112222', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pabna+Vet+Point', hours: '9 AM - 5 PM', district: 'Pabna' },
  { id: 24, name: 'Sirajganj Pet Care', address: 'Sirajganj Sadar, Sirajganj', phone: '+8801722223333', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sirajganj+Pet+Care', hours: '10 AM - 6 PM', district: 'Sirajganj' },

  // Khulna Division
  { id: 25, name: 'Khulna Pet Hospital', address: 'Shibbari More, Khulna', phone: '+8801912345671', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Khulna+Pet+Hospital', hours: '10 AM - 9 PM', district: 'Khulna' },
  { id: 26, name: 'Jashore Pet Vet', address: 'MK Road, Jashore', phone: '+8801712345672', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jashore+Pet+Vet', hours: '11 AM - 8 PM', district: 'Jashore' },
  { id: 27, name: 'Kushtia Animal Clinic', address: 'NS Road, Kushtia', phone: '+8801912345673', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kushtia+Animal+Clinic', hours: '10 AM - 7 PM', district: 'Kushtia' },

  // Barishal Division
  { id: 28, name: 'Barishal Pet Care', address: 'Sadar Road, Barishal', phone: '+8801712345674', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Barishal+Pet+Care', hours: '10 AM - 7 PM', district: 'Barishal' },
  { id: 29, name: 'Patuakhali Vet Clinic', address: 'Patuakhali Sadar, Patuakhali', phone: '+8801912345675', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Patuakhali+Vet+Clinic', hours: '9 AM - 6 PM', district: 'Patuakhali' },
  
  // Sylhet Division
  { id: 30, name: 'Sylhet Pet Care & Vet Point', address: 'Zindabazar, Sylhet', phone: '+8801712345676', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sylhet+Pet+Care+&+Vet+Point', hours: '11 AM - 9 PM', district: 'Sylhet' },
  { id: 31, name: 'Moulvibazar Animal Clinic', address: 'Moulvibazar Sadar, Moulvibazar', phone: '+8801912345677', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Moulvibazar+Animal+Clinic', hours: '10 AM - 7 PM', district: 'Moulvibazar' },
  
  // Rangpur Division
  { id: 32, name: 'Rangpur Pet Point', address: 'Dhap, Rangpur', phone: '+8801712345680', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rangpur+Pet+Point', hours: '10 AM - 8 PM', district: 'Rangpur' },
  { id: 33, name: 'Dinajpur Vet Care', address: 'Balubari, Dinajpur', phone: '+8801912345681', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dinajpur+Vet+Care', hours: '10 AM - 6 PM', district: 'Dinajpur' },
  
  // Mymensingh Division
  { id: 34, name: 'BAU Veterinary Teaching Hospital', address: 'Bangladesh Agricultural University, Mymensingh', phone: '+8809167401', website: 'https://www.bau.edu.bd', mapUrl: 'https://www.google.com/maps/search/?api=1&query=BAU+Veterinary+Teaching+Hospital+Mymensingh', hours: '9 AM - 5 PM', district: 'Mymensingh' },
  { id: 35, name: 'Mymensingh Pet Hospital', address: 'Charpara, Mymensingh', phone: '+8801712345682', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mymensingh+Pet+Hospital', hours: '11 AM - 8 PM', district: 'Mymensingh' },
  { id: 36, name: 'Jamalpur Pet Clinic', address: 'Jamalpur Sadar, Jamalpur', phone: '+8801912345683', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jamalpur+Pet+Clinic', hours: '10 AM - 7 PM', district: 'Jamalpur' },
];


// FIX: Added mock vet data for the deprecated Online Vet page.
export const MOCK_VETS: Vet[] = [
  {
    id: 1,
    name: 'Dr. Ayesha Khan',
    specialization: 'Canine Specialist',
    imageUrl: 'https://picsum.photos/seed/vet1/200/200',
    isOnline: true,
  },
  {
    id: 2,
    name: 'Dr. Barun Sobti',
    specialization: 'Feline Specialist',
    imageUrl: 'https://picsum.photos/seed/vet2/200/200',
    isOnline: false,
  },
  {
    id: 3,
    name: 'Dr. Chandni Chowdhury',
    specialization: 'General Practitioner',
    imageUrl: 'https://picsum.photos/seed/vet3/200/200',
    isOnline: true,
  },
  {
    id: 4,
    name: 'Dr. Danish Ahmed',
    specialization: 'Avian Expert',
    imageUrl: 'https://picsum.photos/seed/vet4/200/200',
    isOnline: false,
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

// FIX: Added mock posts for the community page.
export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: { id: 1, name: 'John Doe' },
    content: 'Just adopted this little guy! Everyone, meet Sparky. He\'s a bit shy but so full of love. Any tips for helping a rescue dog settle into a new home?',
    imageUrl: 'https://picsum.photos/seed/sparky-post/600/400',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), // 30 minutes ago
    likes: 15,
    comments: [
      { id: 1, author: { id: 2, name: 'Jane Smith' }, content: 'Congratulations! So cute! Lots of patience and positive reinforcement is key.', timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString() },
      { id: 2, author: { id: 1, name: 'John Doe' }, content: 'Thanks, Jane! We\'re taking it slow.', timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString() },
    ],
  },
  {
    id: 2,
    author: { id: 2, name: 'Jane Smith' },
    content: 'Does anyone have recommendations for a good, durable chew toy for a heavy chewer? My lab mix destroys everything!',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(), // 3 hours ago
    likes: 8,
    comments: [],
  },
  {
    id: 3,
    author: { id: 1, name: 'John Doe' },
    content: 'Beautiful day for a walk in the park! #doglife #adoptdontshop',
    imageUrl: 'https://picsum.photos/seed/park-walk/600/400',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // 1 day ago
    likes: 22,
    comments: [
       { id: 3, author: { id: 2, name: 'Jane Smith' }, content: 'Looks like fun!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 23).toISOString() },
    ],
  },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    questionText: 'What is your ideal energy level in a pet?',
    options: [
      { text: 'A couch companion for quiet nights in.', tags: ['Calm', 'Apartment Friendly'] },
      { text: 'A playful buddy for regular walks and fun.', tags: ['Playful', 'Loves Walks'] },
      { text: 'A high-energy partner for adventures and running.', tags: ['Energetic', 'Needs a Yard'] },
    ],
  },
  {
    id: 2,
    questionText: 'What kind of home will your pet live in?',
    options: [
      { text: 'An apartment or a home with no yard.', tags: ['Apartment Friendly'] },
      { text: 'A house with a yard for them to play in.', tags: ['Needs a Yard'] },
    ],
  },
  {
    id: 3,
    questionText: 'Will there be children in the home?',
    options: [
      { text: 'Yes, I have kids or they visit often.', tags: ['Good with Kids'] },
      { text: 'No, it will be an adult-only household.', tags: [] },
    ],
  },
];

export const MOCK_VOLUNTEER_OPPORTUNITIES: VolunteerOpportunity[] = [
  {
    id: 1,
    title: 'Adoption Event Assistant',
    description: 'Help set up, manage, and tear down our weekend adoption events. Assist with handling animals and talking to potential adopters.',
    date: 'Every Saturday',
    location: 'Dhaka North Community Center',
    requiredSkills: ['Good with animals', 'Friendly personality', 'Customer service'],
  },
  {
    id: 2,
    title: 'Rescue Transport Driver',
    description: 'Use your own vehicle to help transport animals from rescue locations to our shelter or to veterinary appointments.',
    date: 'As needed',
    location: 'Various locations in Dhaka',
    requiredSkills: ['Valid driver\'s license', 'Reliable vehicle', 'Calm under pressure'],
  },
  {
    id: 3,
    title: 'Fundraising Gala Volunteer',
    description: 'Assist with our annual fundraising gala. Roles include guest check-in, auction assistance, and general event support.',
    date: 'November 15, 2024',
    location: 'Gulshan Club',
    requiredSkills: ['Event experience', 'Organized', 'Professional demeanor'],
  },
];

export const MOCK_MEMORIALS: Memorial[] = [
    {
        id: 1,
        petName: 'Raja',
        ownerName: 'The Karim Family',
        imageUrl: 'https://picsum.photos/seed/raja-memorial/500/500',
        tribute: 'Raja was more than a pet; he was our family. For 14 wonderful years, he gave us unconditional love and joy. We miss his gentle presence every single day. Run free, our dear friend.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(), // 10 days ago
    },
    {
        id: 2,
        petName: 'Mini',
        ownerName: 'Sadia',
        imageUrl: 'https://picsum.photos/seed/mini-memorial/500/500',
        tribute: 'My little Mini, the bravest cat I ever knew. You fought so hard. The house is too quiet without your purrs. Thank you for choosing me.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(), // 5 days ago
    },
    {
        id: 3,
        petName: 'Tiger',
        ownerName: 'Imran & Faria',
        imageUrl: 'https://picsum.photos/seed/tiger-memorial/500/500',
        tribute: 'To our beloved Tiger, the neighborhood king. You brought so much laughter with your silly antics. We\'ll never forget you. Thank you for all the memories.',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2).toISOString(), // 2 days ago
    },
];

export const MOCK_DONATIONS: Donation[] = [
    { id: 1, amount: 500, date: '2024-07-15', method: 'bKash' },
    { id: 2, amount: 2000, date: '2024-06-28', method: 'Bank Transfer' },
    { id: 3, amount: 1000, date: '2024-05-10', method: 'Nagad' },
];

export const MOCK_APPLICATIONS: Application[] = [
    { id: 1, animalName: 'Buddy', animalId: 1, date: '2024-07-20', status: 'In Review' },
    { id: 2, animalName: 'Lucy', animalId: 2, date: '2024-06-12', status: 'Approved' },
];