import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Seo from '@/components/Seo';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';

const AdminDashboardPage: React.FC = () => {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="container mx-auto flex justify-center items-center h-screen">
        <Spinner className="h-12 w-12" />
      </div>
    );
  }

  if (!user?.is_staff) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <Seo title="Admin Dashboard | FutureReminder" description="Admin dashboard for managing FutureReminder." />
      <div className="flex flex-grow">
        {/* Vertical Nav */}
        <aside className="w-64 flex-shrink-0 border-r p-4">
          <nav className="flex flex-col space-y-2">
            <h2 className="text-lg font-semibold tracking-tight mb-2">Admin Menu</h2>
            <Button variant="ghost" className="w-full justify-start">
              Dashboard Home
            </Button>
            {/* Future admin links can be added here */}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-grow p-8">
          <div className="text-center">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">
              Welcome, {user.first_name || user.email}. This is where admin features will go.
            </p>
          </div>
          <div className="mt-8 p-8 border-2 border-dashed rounded-lg">
            <p className="text-center text-muted-foreground">Admin content will be displayed here.</p>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboardPage;
