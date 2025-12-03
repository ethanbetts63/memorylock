import React from 'react';

const hierarchyLevels = [
  {
    level: 1,
    title: 'Push + Email',
    description: 'Initial, non-intrusive reminders sent directly to your primary devices.',
  },
  {
    level: 2,
    title: 'SMS',
    description: 'If there is no response, we escalate to sending text messages to your primary phone number.',
  },
  {
    level: 3,
    title: 'Backup Contacts',
    description: 'We then begin to utilize the backup phone numbers and email addresses you provided.',
  },
  {
    level: 4,
    title: 'Admin Outreach',
    description: 'A member of our team will begin making manual, direct phone calls to your contact numbers.',
  },
  {
    level: 5,
    title: 'Emergency Contacts',
    description: 'We will reach out to your designated emergency contacts to confirm your status.',
  },
  {
    level: 6,
    title: 'Physical Mail',
    description: 'As a final step, we can dispatch verified physical letters to your listed address.',
  },
];

export const ProductCarousel = () => {
  return (
    <div className="w-full py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold tracking-tight text-center mb-2">The MemoryLock System</h2>
        <p className="text-lg text-gray-600 text-center mb-8">
          Our automated, escalating hierarchy ensures you never miss what matters most.
        </p>
        <div className="flex overflow-x-auto space-x-6 pb-4">
          {hierarchyLevels.map((item) => (
            <div key={item.level} className="flex-shrink-0 w-72 bg-white border rounded-xl shadow-md p-6 transform transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full mb-4">
                <span className="text-xl font-bold text-gray-700">{item.level}</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
              <p className="text-gray-500">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
