import { CreateEventForm } from '../components/CreateEventForm';

const CreateEventPage = () => {
  return (
    <div className="container mx-auto max-w-3xl py-12 px-4">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold tracking-tight text-primary-foreground sm:text-5xl">
          Create Your Reminder
        </h1>
        <p className="mt-4 text-lg text-primary-foreground">
          Fill out the details below. We'll use this information to ensure your reminder is never missed.
        </p>
      </div>
      <CreateEventForm />
    </div>
  );
};

export default CreateEventPage;
