
export const GenderOptions = ["Male", "Female", "Other"];

export const PatientFormDefaultValues = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    birthDate: new Date(Date.now()),
    gender: "Male" as Gender,
    address: "",
    occupation: "",
    emergencyContactName: "",
    emergencyContactNumber: "",
    primaryPhysician: "",
    insuranceProvider: "",
    insurancePolicyNumber: "",
    allergies: "",
    currentMedication: "",
    familyMedicalHistory: "",
    pastMedicalHistory: "",
    identificationType: "Birth Certificate",
    identificationNumber: "",
    identificationDocument: [],
    treatmentConsent: false,
    disclosureConsent: false,
    privacyConsent: false,
  };
  
  export const IdentificationTypes = [
    "Birth Certificate",
    "Driver's License",
    "Medical Insurance Card/Policy",
    "Military ID Card",
    "National Identity Card",
    "Passport",
    "Resident Alien Card (Green Card)",
    "Social Security Card",
    "State ID Card",
    "Student ID Card",
    "Voter ID Card",
  ];
  
  export const Doctors = [
    {
      image: "/assets/images/dr-green.png",
      name: "John Green",
      specialty: "Cardiologist",
    },
    {
      image: "/assets/images/dr-cameron.png",
      name: "Leila Cameron",
      specialty: "Dermatologist",
    },
    {
      image: "/assets/images/dr-livingston.png",
      name: "David Livingston",
      specialty: "Endocrinologist",
    },
    {
      image: "/assets/images/dr-peter.png",
      name: "Evan Peter",
      specialty: "Gastroenterologist",
    },
    {
      image: "/assets/images/dr-powell.png",
      name: "Jane Powell",
      specialty: "Hematologist",
    },
    {
      image: "/assets/images/dr-remirez.png",
      name: "Alex Ramirez",
      specialty: "Infectious Disease Specialist",
    },
    {
      image: "/assets/images/dr-lee.png",
      name: "Jasmine Lee",
      specialty: "Nephrologist",
    },
    {
      image: "/assets/images/dr-cruz.png",
      name: "Alyana Cruz",
      specialty: "Neurologist",
    },
    {
      image: "/assets/images/dr-sharma.png",
      name: "Hardik Sharma",
      specialty: "Oncologist",
    },
  ];
  
  export const StatusIcon = {
    scheduled: "/assets/icons/check.svg",
    pending: "/assets/icons/pending.svg",
    cancelled: "/assets/icons/cancelled.svg",
  };

  export const ReasonOptions = [
    "Consultation",
    "Follow-up",
    "Routine Check-up",
    "Second Opinion",
    "Other",
  ]

  export const BloodTypes = [
    "A+",
    "A-",
    "B+",
    "B-",
    "AB+",
    "AB-",
    "O+",
    "O-",
  ]

  export const imgItems = [
    {image: "/assets/images/cardiology.jpg", alt: "Cardiologist"},
    {image: "/assets/images/neurology.jpg", alt: "Neurologist"},
    {image: "/assets/images/dermatology.jpg", alt: "Dermatologist"},
    {image: "/assets/images/gastroenterology.jpg", alt: "Gastroenterologist"},
    {image: "/assets/images/oncology.jpg", alt: "Oncologist"},
    {image: "/assets/images/pediatrics.jpg", alt: "Pediatrician"},
    {image: "/assets/images/endocrinologist.jpg", alt: "Endocrinologist"},
    {image: "/assets/images/test-5.jpg", alt: "Orthopedic"},
    {image: "/assets/images/test-6.jpg", alt: "Hematologist"},
  ]

  export const specialtyServices = [
    "Cardiology",
    "Neurology",
    "Dermatology",
    "Gastroenterology",
    "Oncology",
    "Pediatrics",
    "Endocrinology",
    "Orthopedic",
    "Hematology",
  ]

  

  export const servicesCopy = [
    [
      "Our cardiology services focus on comprehensive care, combining advanced diagnostic tools with innovative treatments. We prioritize heart health through personalized plans designed to improve overall cardiovascular well-being."
    ],
    [
      "Our neurology expertise provides cutting-edge diagnostic and therapeutic solutions for a wide range of neurological disorders. We aim to enhance patients' quality of life with a focus on precision and compassionate care."
    ],
    [
      "From advanced skincare treatments to effective solutions for chronic conditions, our dermatology services address a variety of skin health needs. We tailor each plan to help you achieve and maintain healthy, radiant skin."
    ],
    [
      "Our gastroenterology care delivers innovative diagnostic and treatment options for digestive health. We specialize in addressing conditions with a focus on prevention, comfort, and long-term wellness."
    ],
    [
      "Our oncology team employs state-of-the-art techniques to provide comprehensive cancer care. We focus on personalized treatment plans that include prevention, early detection, and innovative therapies for better outcomes."
    ],
    [
      "Our pediatric services offer compassionate, family-centered care for children of all ages. We emphasize preventative care, early development monitoring, and tailored treatments to nurture lifelong health."
    ],
    [
      "Our endocrinology specialists provide expert care for hormonal imbalances and metabolic disorders. We develop personalized strategies that promote balance, improve overall health, and enhance quality of life."
    ],
    [
      "Our orthopedic care combines innovative surgical techniques with advanced rehabilitation therapies. We focus on restoring mobility, relieving pain, and improving quality of life for patients of all ages."
    ],
    [
      "Our hematology services focus on diagnosing and treating blood disorders with precision and compassion. We offer personalized care plans that address individual needs and promote overall well-being."
    ]
  ];
  
  