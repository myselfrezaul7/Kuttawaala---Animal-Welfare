
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


// FIX: Vastly expanded mock vet clinic data for the "Find a Vet" page.
// MAP URLS UPDATED to be functional Google Maps search queries.
export const MOCK_VET_CLINICS: VetClinic[] = [
  // --- DHAKA DIVISION ---
  { id: 1, name: 'PAW Life Care', address: 'House 1/2, Road 2, Block A, Section 10, Mirpur, Dhaka', phone: '+8801712345678', website: 'https://pawlifecare.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=PAW+Life+Care+Mirpur+Dhaka', hours: '10:00 AM - 8:00 PM', district: 'Dhaka' },
  { id: 2, name: 'PetVet Care', address: 'House 34, Road 12, Block E, Banani, Dhaka', phone: '+8801812345679', website: 'https://petvetcare.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=PetVet+Care+Banani+Dhaka', hours: '9:00 AM - 9:00 PM', district: 'Dhaka' },
  { id: 3, name: 'Central Veterinary Hospital', address: '42, Kazi Nazrul Islam Ave, Dhaka 1215', phone: '+88029665492', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Central+Veterinary+Hospital+Dhaka', hours: '24 Hours', district: 'Dhaka' },
  { id: 4, name: 'Gulshan Pet Animal Clinic', address: 'House 20, Road 55, Gulshan 2, Dhaka', phone: '+8801912345680', website: 'https://gulshanpetclinic.com', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gulshan+Pet+Animal+Clinic+Dhaka', hours: '11:00 AM - 7:00 PM', district: 'Dhaka' },
  { id: 5, name: 'Obhoyaronno Vet Clinic', address: 'House-3, Road-1, Sector-1, Uttara, Dhaka 1230', phone: '+8801718123456', website: 'http://obhoyaronno.org', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Obhoyaronno+Vet+Clinic+Uttara+Dhaka', hours: '10:00 AM - 7:00 PM', district: 'Dhaka' },
  { id: 6, name: 'The VET', address: 'House 7, Road 2/A, Sector 4, Uttara, Dhaka', phone: '+8801313303303', website: 'https://thevet.com.bd', mapUrl: 'https://www.google.com/maps/search/?api=1&query=The+VET+Uttara+Dhaka', hours: '10:00 AM - 10:00 PM', district: 'Dhaka' },
  { id: 7, name: 'Care & Cure Vet Chamber', address: '5/4, Block-F, Lalmatia, Dhaka', phone: '+8801711234567', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Care+and+Cure+Vet+Chamber+Lalmatia', hours: '5:00 PM - 9:00 PM', district: 'Dhaka' },
  { id: 8, name: 'Dr. K-Nine Pet Zone & Clinic', address: 'House 27, Road 15, Sector 13, Uttara, Dhaka', phone: '+8801979362867', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dr+K-Nine+Pet+Zone+Clinic+Uttara', hours: '11:00 AM - 10:00 PM', district: 'Dhaka' },
  
  // Government/District Hospitals - Dhaka Division
  { id: 9, name: 'Gazipur District Veterinary Hospital', address: 'Joydebpur, Gazipur', phone: '+88029261010', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gazipur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Gazipur' },
  { id: 10, name: 'Narayanganj District Veterinary Hospital', address: 'Chashara, Narayanganj', phone: '+88027645890', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Narayanganj+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Narayanganj' },
  { id: 11, name: 'Manikganj District Veterinary Hospital', address: 'Manikganj Sadar, Manikganj', phone: '+8801711000000', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Manikganj+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Manikganj' },
  { id: 12, name: 'Tangail District Veterinary Hospital', address: 'Tangail Sadar, Tangail', phone: '+88092164050', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Tangail+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Tangail' },
  { id: 13, name: 'Kishoreganj District Veterinary Hospital', address: 'Kishoreganj Sadar, Kishoreganj', phone: '+88094161870', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kishoreganj+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Kishoreganj' },
  { id: 14, name: 'Faridpur District Veterinary Hospital', address: 'Faridpur Sadar, Faridpur', phone: '+88063164530', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Faridpur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Faridpur' },
  { id: 101, name: 'Narsingdi District Veterinary Hospital', address: 'Velanagar, Narsingdi', phone: '+88029462345', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Narsingdi+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Narsingdi' },
  { id: 102, name: 'Munshiganj District Veterinary Hospital', address: 'Sadar, Munshiganj', phone: '+88027612345', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Munshiganj+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Munshiganj' },
  { id: 103, name: 'Gopalganj District Veterinary Hospital', address: 'Sadar, Gopalganj', phone: '+88026685430', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gopalganj+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Gopalganj' },
  { id: 123, name: 'Rajbari District Veterinary Hospital', address: 'Sadar, Rajbari', phone: '+88064165432', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rajbari+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Rajbari' },
  { id: 124, name: 'Shariatpur District Veterinary Hospital', address: 'Sadar, Shariatpur', phone: '+88060161234', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Shariatpur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Shariatpur' },
  { id: 125, name: 'Madaripur District Veterinary Hospital', address: 'Sadar, Madaripur', phone: '+88066162345', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Madaripur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Madaripur' },

  // --- CHATTOGRAM DIVISION ---
  { id: 15, name: 'Chattogram District Veterinary Hospital', address: 'Chawkbazar, Chattogram', phone: '+88031612345', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Chattogram+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Chattogram' },
  { id: 16, name: 'CVASU Veterinary Teaching Hospital', address: 'Khulshi, Chattogram', phone: '+88031659093', website: 'https://cvasu.ac.bd', mapUrl: 'https://www.google.com/maps/search/?api=1&query=CVASU+Veterinary+Teaching+Hospital', hours: '9 AM - 5 PM', district: 'Chattogram' },
  { id: 17, name: 'Cox\'s Bazar District Veterinary Hospital', address: 'Sadar, Cox\'s Bazar', phone: '+88034163210', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Coxs+Bazar+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: "Cox's Bazar" },
  { id: 18, name: 'Cumilla District Veterinary Hospital', address: 'Kandirpar, Cumilla', phone: '+8808165430', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Cumilla+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Comilla' },
  { id: 19, name: 'Feni District Veterinary Hospital', address: 'Feni Sadar, Feni', phone: '+88033174560', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Feni+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Feni' },
  { id: 20, name: 'Noakhali District Veterinary Hospital', address: 'Maijdee, Noakhali', phone: '+88032161230', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Noakhali+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Noakhali' },
  { id: 104, name: 'Brahmanbaria District Veterinary Hospital', address: 'Sadar, Brahmanbaria', phone: '+88085162340', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Brahmanbaria+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Brahmanbaria' },
  { id: 105, name: 'Chandpur District Veterinary Hospital', address: 'Sadar, Chandpur', phone: '+88084163450', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Chandpur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Chandpur' },
  { id: 106, name: 'Lakshmipur District Veterinary Hospital', address: 'Sadar, Lakshmipur', phone: '+88038162120', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Lakshmipur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Lakshmipur' },
  { id: 126, name: 'Bandarban District Veterinary Hospital', address: 'Sadar, Bandarban', phone: '+88036162345', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bandarban+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Bandarban' },
  { id: 127, name: 'Khagrachari District Veterinary Hospital', address: 'Sadar, Khagrachari', phone: '+88037162123', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Khagrachari+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Khagrachari' },
  { id: 128, name: 'Rangamati District Veterinary Hospital', address: 'Sadar, Rangamati', phone: '+88035163456', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rangamati+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Rangamati' },

  // --- RAJSHAHI DIVISION ---
  { id: 21, name: 'Rajshahi District Veterinary Hospital', address: 'Sadar, Rajshahi', phone: '+880721774560', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rajshahi+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Rajshahi' },
  { id: 22, name: 'Bogura District Veterinary Hospital', address: 'Sadar, Bogura', phone: '+8805166780', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bogura+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Bogura' },
  { id: 23, name: 'Pabna District Veterinary Hospital', address: 'Pabna Sadar, Pabna', phone: '+88073165430', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pabna+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Pabna' },
  { id: 24, name: 'Sirajganj District Veterinary Hospital', address: 'Sirajganj Sadar, Sirajganj', phone: '+88075162340', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sirajganj+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Sirajganj' },
  { id: 107, name: 'Natore District Veterinary Hospital', address: 'Sadar, Natore', phone: '+88077166540', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Natore+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Natore' },
  { id: 108, name: 'Naogaon District Veterinary Hospital', address: 'Sadar, Naogaon', phone: '+88074162120', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Naogaon+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Naogaon' },
  { id: 109, name: 'Chapainawabganj District Veterinary Hospital', address: 'Sadar, Nawabganj', phone: '+88078163450', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Chapainawabganj+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Nawabganj' },
  { id: 129, name: 'Joypurhat District Veterinary Hospital', address: 'Sadar, Joypurhat', phone: '+88057163210', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Joypurhat+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Joypurhat' },

  // --- KHULNA DIVISION ---
  { id: 25, name: 'Khulna District Veterinary Hospital', address: 'Sadar, Khulna', phone: '+88041760450', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Khulna+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Khulna' },
  { id: 26, name: 'Jashore District Veterinary Hospital', address: 'Sadar, Jashore', phone: '+88042168540', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jashore+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Jashore' },
  { id: 27, name: 'Kushtia District Veterinary Hospital', address: 'Sadar, Kushtia', phone: '+8807161230', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kushtia+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Kushtia' },
  { id: 110, name: 'Satkhira District Veterinary Hospital', address: 'Sadar, Satkhira', phone: '+88047163450', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Satkhira+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Satkhira' },
  { id: 111, name: 'Bagerhat District Veterinary Hospital', address: 'Sadar, Bagerhat', phone: '+88046862340', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bagerhat+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Bagerhat' },
  { id: 112, name: 'Chuadanga District Veterinary Hospital', address: 'Sadar, Chuadanga', phone: '+88076162120', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Chuadanga+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Chuadanga' },
  { id: 130, name: 'Jhenaidah District Veterinary Hospital', address: 'Sadar, Jhenaidah', phone: '+88045161450', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jhenaidah+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Jhenaidah' },
  { id: 131, name: 'Magura District Veterinary Hospital', address: 'Sadar, Magura', phone: '+88048862210', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Magura+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Magura' },
  { id: 132, name: 'Meherpur District Veterinary Hospital', address: 'Sadar, Meherpur', phone: '+88079162345', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Meherpur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Meherpur' },
  { id: 133, name: 'Narail District Veterinary Hospital', address: 'Sadar, Narail', phone: '+88048161540', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Narail+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Narail' },

  // --- BARISHAL DIVISION ---
  { id: 28, name: 'Barishal District Veterinary Hospital', address: 'Sadar, Barishal', phone: '+88043164870', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Barishal+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Barishal' },
  { id: 29, name: 'Patuakhali District Veterinary Hospital', address: 'Patuakhali Sadar, Patuakhali', phone: '+88044162120', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Patuakhali+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Patuakhali' },
  { id: 113, name: 'Bhola District Veterinary Hospital', address: 'Sadar, Bhola', phone: '+88049162340', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Bhola+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Bhola' },
  { id: 114, name: 'Pirojpur District Veterinary Hospital', address: 'Sadar, Pirojpur', phone: '+88046162450', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Pirojpur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Pirojpur' },
  { id: 134, name: 'Barguna District Veterinary Hospital', address: 'Sadar, Barguna', phone: '+88044862210', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Barguna+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Barguna' },
  { id: 135, name: 'Jhalokati District Veterinary Hospital', address: 'Sadar, Jhalokati', phone: '+88049662345', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jhalokati+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Jhalokati' },

  // --- SYLHET DIVISION ---
  { id: 30, name: 'Sylhet District Veterinary Hospital', address: 'Tilagor, Sylhet', phone: '+880821716450', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sylhet+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Sylhet' },
  { id: 31, name: 'Moulvibazar District Veterinary Hospital', address: 'Moulvibazar Sadar, Moulvibazar', phone: '+88086162340', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Moulvibazar+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Moulvibazar' },
  { id: 115, name: 'SAU Veterinary Clinic', address: 'Sylhet Agricultural University, Sylhet', phone: '+880821761623', mapUrl: 'https://www.google.com/maps/search/?api=1&query=SAU+Veterinary+Clinic+Sylhet', hours: '9 AM - 5 PM', district: 'Sylhet' },
  { id: 116, name: 'Habiganj District Veterinary Hospital', address: 'Sadar, Habiganj', phone: '+88083162120', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Habiganj+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Habiganj' },
  { id: 117, name: 'Sunamganj District Veterinary Hospital', address: 'Sadar, Sunamganj', phone: '+88087161540', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sunamganj+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Sunamganj' },

  // --- RANGPUR DIVISION ---
  { id: 32, name: 'Rangpur District Veterinary Hospital', address: 'Sadar, Rangpur', phone: '+88052162340', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Rangpur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Rangpur' },
  { id: 33, name: 'Dinajpur District Veterinary Hospital', address: 'Balubari, Dinajpur', phone: '+88053165430', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Dinajpur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Dinajpur' },
  { id: 118, name: 'Kurigram District Veterinary Hospital', address: 'Sadar, Kurigram', phone: '+88058161540', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Kurigram+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Kurigram' },
  { id: 119, name: 'Gaibandha District Veterinary Hospital', address: 'Sadar, Gaibandha', phone: '+88054161450', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Gaibandha+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Gaibandha' },
  { id: 120, name: 'Nilphamari District Veterinary Hospital', address: 'Sadar, Nilphamari', phone: '+88055161340', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Nilphamari+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Nilphamari' },
  { id: 136, name: 'Panchagarh District Veterinary Hospital', address: 'Sadar, Panchagarh', phone: '+88056861234', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Panchagarh+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Panchagarh' },
  { id: 137, name: 'Thakurgaon District Veterinary Hospital', address: 'Sadar, Thakurgaon', phone: '+88056152345', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Thakurgaon+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Thakurgaon' },
  { id: 138, name: 'Lalmonirhat District Veterinary Hospital', address: 'Sadar, Lalmonirhat', phone: '+88059161230', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Lalmonirhat+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Lalmonirhat' },

  // --- MYMENSINGH DIVISION ---
  { id: 34, name: 'BAU Veterinary Teaching Hospital', address: 'Bangladesh Agricultural University, Mymensingh', phone: '+8809167401', website: 'https://www.bau.edu.bd', mapUrl: 'https://www.google.com/maps/search/?api=1&query=BAU+Veterinary+Teaching+Hospital+Mymensingh', hours: '9 AM - 5 PM', district: 'Mymensingh' },
  { id: 35, name: 'Mymensingh District Veterinary Hospital', address: 'Sadar, Mymensingh', phone: '+8809165890', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Mymensingh+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Mymensingh' },
  { id: 36, name: 'Jamalpur District Veterinary Hospital', address: 'Jamalpur Sadar, Jamalpur', phone: '+88098163240', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Jamalpur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Jamalpur' },
  { id: 121, name: 'Sherpur District Veterinary Hospital', address: 'Sadar, Sherpur', phone: '+88093161230', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Sherpur+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Sherpur' },
  { id: 122, name: 'Netrokona District Veterinary Hospital', address: 'Sadar, Netrokona', phone: '+88095162345', mapUrl: 'https://www.google.com/maps/search/?api=1&query=Netrokona+District+Veterinary+Hospital', hours: '9 AM - 5 PM (Fri Closed)', district: 'Netrokona' },
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
