import { Link } from 'react-router-dom';
import type { Event, UserProfile, EmergencyContact } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { formatDate } from '@/utils/utils';

interface SummaryProps {
  event?: Event;
  user?: UserProfile;
  emergencyContacts?: EmergencyContact[];
  className?: string;
}

const Summary: React.FC<SummaryProps> = ({ event, user, emergencyContacts, className }) => {
  const price = 10.00; // This can be moved or made dynamic later

  return (
    <div className={`space-y-6 ${className}`}>
      {event && (
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Event:</span>
                <span className="font-semibold">{event.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Date:</span>
                <span className="font-semibold">{formatDate(event.event_date)}</span>
              </div>
            </div>
            <div className="border-t pt-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Price:</span>
                <span>${price.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
                <span>Total:</span>
                <span>${price.toFixed(2)}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {user && (
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Information</CardTitle>
            <Button asChild variant="outline" size="sm">
              <Link to="/account">Edit</Link>
            </Button>
          </CardHeader>
          <CardContent>
            {/* Profile Details */}
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-semibold">{user.first_name} {user.last_name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Email:</span>
                <span className="font-semibold">{user.email}</span>
              </div>
            </div>

            {/* Emergency Contacts Section (Conditional) */}
            {emergencyContacts && emergencyContacts.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-2">Emergency Contacts</h4>
                <div className="space-y-4">
                  {emergencyContacts.map((contact) => (
                    <div key={contact.id}>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Name:</span>
                        <span className="font-semibold">{contact.first_name} {contact.last_name}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Phone:</span>
                        <span className="font-semibold">{contact.phone}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Summary;
