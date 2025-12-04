import React from 'react';

export const Letter: React.FC = () => {
  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4 md:px-18">
        <h2 className="text-center text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
          Forgetfulness is expensive.
        </h2>
        <p className="italic text-center text-xl text-gray-900 mb-8">MemoryLock is $25.99.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 text-lg text-gray-900">
          <div className="flex flex-col gap-4">
            <p>
              We all have these long-term, slow-burn obligations that matter far more than our calendars treat them. Passports. Visas. Domains. Warranties. Licenses. Insurance renewals. IUD’s. Trademark filings. Things that are harmless today but catastrophic when the deadline quietly slips by.
            </p>
            <p>
              <span className="font-bold bg-yellow-300 px-1 py-0.5 rounded-md italic text-black">Calendar apps are built for next Tuesday.</span> Not high concequence events in the distant future. That gap costs people real money, real stress, and real consequences. Worst of all, it usually happens silently. You don’t realize what you forgot until the fallout arrives.
            </p>
            <p>
              MemoryLock exists to eliminate that silence.
            </p>
          </div>
          <div className="flex flex-col gap-4">
            <p>
              It’s a <span className="font-bold bg-yellow-300 px-1 py-0.5 rounded-md italic text-black">set-and-forget</span> system. You add something once, then forget about us. That’s the point. We won’t bother you until the date you tell us to. But once that date arrives, we won't stop until you acknowledge it.
            </p>
            <p>
              Single notifications get missed. So we repeat them on a structured schedule. Emails change. Phone numbers change. People change. So we collect backups. Sometimes everything goes wrong at once. That’s why we include emergency contacts. It’s our absolute last resort. We’ll even call them personally.
            </p>
            <p>
              It’s not complicated or bloated—it’s a safety net for your long-memory. Feel free to poke around, set up your first reminder, and see how it feels to finally <span className="font-bold bg-yellow-300 px-1 py-0.5 rounded-md italic text-black">offload the “don’t forget”</span> part of your brain.
            </p>
            <div>
              <p>Ethan Betts, <a href="mailto:ethanbetts63@gmail.com" className="text-blue-600 hover:underline">ethanbetts63@gmail.com</a></p>
              <p className="italic text-sm text-gray-600">Founder and Developer</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
