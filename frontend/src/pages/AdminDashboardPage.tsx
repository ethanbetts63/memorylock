import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Seo from '@/components/Seo';
import { Spinner } from '@/components/ui/spinner';

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
    <div className="container mx-auto py-8">
      <Seo title="Admin Dashboard | FutureReminder" description="Admin dashboard for managing FutureReminder." />
      <div className="text-center">
        <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome, {user.first_name || user.email}. This is where admin features will go.
        </p>
      </div>
      {/* Placeholder for future admin components */}
      <div className="mt-8 p-8 border-2 border-dashed rounded-lg">
        <p className="text-center text-muted-foreground">Admin content will be displayed here.</p>
      </div>
    </div>
  );
};

export default AdminDashboardPage;
