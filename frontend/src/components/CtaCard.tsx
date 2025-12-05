import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check } from 'lucide-react';
import logo from '../assets/logo.png';

const includedFeatures = [
  "Lifetime access for one event",
  "Full notification hierarchy",
  "Admin & Emergency Contact outreach",
  "No subscriptions or hidden fees",
];

export const CtaCard: React.FC = () => {
  return (
    <Card className="w-full bg-white text-gray-900">
      <CardHeader>
        <div className="flex items-center gap-3">
            <img src={logo} alt="MemoryLock Logo" className="h-10 w-10" />
            <div>
                <CardTitle>MemoryLock</CardTitle>
                <p className="text-lg font-bold">$25.99</p>
            </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-4">
            <div>
                <h4 className="font-semibold text-md mb-2">What’s included?</h4>
                <ul className="space-y-2 text-sm">
                    {includedFeatures.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                            <Check className="h-4 w-4 mt-1 text-green-500 flex-shrink-0" />
                            <span>{feature}</span>
                        </li>
                    ))}
                </ul>
            </div>
            <div>
                <h4 className="font-semibold text-md mb-2">How does it work?</h4>
                <p className="text-sm">
                    After you check out, we’ll email you a private link to set up your first unforgettable reminder.
                </p>
            </div>
            <Button className="w-full h-12 text-lg mt-2">
                Create Reminder
            </Button>
        </div>
      </CardContent>
    </Card>
  );
};
