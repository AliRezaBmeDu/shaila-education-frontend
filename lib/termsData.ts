// /lib/termsData.ts

// 1. New interface for our terms
// The content is now an array of strings for proper list formatting
export interface TermItem {
  id: string;
  title: string;
  content: string[];
}

// 2. New Main Title for the Terms section
export const termsInfo = {
  mainTitle: '🎓 Shaila’s Professional Education',
  subTitle: 'Terms and Conditions',
};

// 3. New Contact Info for the Footer
export const contactInfo = {
  address: '18, Baker Street, Carlingford, Sydney',
  phone: '+61xxxxxxxx',
  email: 'educator.shaila@gmail.com',
};

// 4. New Bengali Terms and Conditions data
export const termsAndConditions: TermItem[] = [
  {
    id: 'admission',
    title: '1. Admission & Fees',
    content: [
      'Completing the prescribed form and payment of fees is mandatory to finalize admission.',
      'Once admission is confirmed, the full fee is non-refundable under any circumstances.',
      'The institution reserves the right to modify course fees, which will only be applicable to new batches.',
    ],
  },
  {
    id: 'payment',
    title: '2. Payment Deadlines',
    content: [
      'Fees can be paid via a one-time payment or in installments.',
      'Failure to pay installments on time may result in the suspension of classes or access.',
      'Students must retain receipts or proof of payment for their records.',
    ],
  },
  {
    id: 'refund',
    title: '3. Refund Policy',
    content: [
      'A maximum of 50% refund may be granted if a cancellation request is made within 3 days of the course start date.',
      'No refunds are applicable once the course has officially started.',
      'In special cases, partial refunds or batch transfers may be considered at the administration\'s discretion.',
    ],
  },
  {
    id: 'online',
    title: '4. Online Classes & Content',
    content: [
      'Videos and notes are for personal study only; sharing or republishing is strictly prohibited.',
      'Sharing login credentials with others will result in the permanent suspension of access.',
      'All content is protected by copyright laws.',
    ],
  },
  {
    id: 'offline',
    title: '5. Offline Classes',
    content: [
      'Attendance at the scheduled time is mandatory.',
      'There is no guarantee of makeup classes for missed sessions.',
      'Maintaining discipline and strictly following instructions during classes is required.',
    ],
  },
  {
    id: 'policy',
    title: '6. Administrative Policy',
    content: [
      'ACE reserves the right to modify these policies at any time.',
      'Enrollment implies the student\'s full agreement to all terms and conditions.',
      'The decision of the administration regarding any matter is final.',
    ],
  },
];