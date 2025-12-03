import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from 'lucide-react';

const features = [
  "Lifetime access for one event",
  "Full notification hierarchy",
  "Admin & Emergency Contact outreach",
  "No subscriptions or hidden fees",
];

const Pricing: React.FC = () => {
  return (
    <div className="w-full py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white border rounded-xl shadow-lg overflow-hidden md:max-w-2xl">
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">One-Time Payment</div>
            <p className="block mt-1 text-5xl leading-tight font-bold text-black">$35.99</p>
            <p className="mt-2 text-gray-500">A single, unforgettable event deserves a single, simple price.</p>
            
            <ul className="mt-8 space-y-4">
              {features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-green-500 mr-3" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <div className="mt-10">
              <Button className="w-full h-12 text-lg">
                Secure Your Reminder
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
