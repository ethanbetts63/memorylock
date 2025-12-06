import { useLocation } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';
import { AccountCreationForm } from '@/components/AccountCreationForm';
import type { EventCreationResponse } from '@/types';

const ConfirmationPage = () => {
  const location = useLocation() as { state: { values: EventCreationResponse } };
  const { values } = location.state || {}; // a fallback

  if (!values) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold">No information to display.</h1>
        <p>Please create an event first.</p>
      </div>
    );
  }

  // Format date for display
  const eventDate = new Date(values.eventDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC' // To prevent off-by-one day errors
  });

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="space-y-8">
        <Card className="text-center">
          <CardHeader>
            <div className="flex justify-center items-center mb-4">
              <CheckCircle className="h-16 w-16 text-green-500" />
            </div>
            <CardTitle className="text-3xl">Your Reminder is Locked In!</CardTitle>
            <CardDescription>
              We've sent a confirmation and a copy of your event details to <strong>{values.userEmail}</strong>.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 border rounded-lg bg-muted">
              <h3 className="font-bold text-lg">{values.eventName}</h3>
              <p className="text-muted-foreground">{eventDate}</p>
            </div>
            <div>
              <h4 className="font-semibold">Next Steps & Timeline</h4>
              <p className="text-sm text-muted-foreground">
                You will be notified via your provided contact methods leading up to the event date. The notification frequency will increase as the date gets closer.
              </p>
            </div>
          </CardContent>
        </Card>

        <AccountCreationForm mode="activate" email={values.userEmail} />
        
      </div>
    </div>
  );
};

export default ConfirmationPage;
