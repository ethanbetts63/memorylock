import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Seo from '@/components/Seo';
import { Spinner } from '@/components/ui/spinner';
import { Button } from '@/components/ui/button';
import { getDashboardAnalytics } from '@/api';
import { DashboardAnalyticsChart } from '@/components/admin/DashboardAnalyticsChart';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"


const AdminDashboardPage: React.FC = () => {
  const { user, isLoading: isAuthLoading } = useAuth();
  const [analyticsData, setAnalyticsData] = useState<any[] | null>(null);
  const [isLoadingAnalytics, setIsLoadingAnalytics] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        setIsLoadingAnalytics(true);
        const data = await getDashboardAnalytics();
        setAnalyticsData(data);
      } catch (err: any) {
        setError(err.message || "Failed to fetch analytics data.");
      } finally {
        setIsLoadingAnalytics(false);
      }
    };

    if (user?.is_staff) {
      fetchAnalytics();
    }
  }, [user]);

  if (isAuthLoading) {
    return (
      <div className="flex h-full justify-center items-center">
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
      <div className="flex h-full">
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
        <main className="flex-grow border-l p-8">
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground mt-2">
            Welcome, {user.first_name || user.email}. Here's what's happening on the platform.
          </p>
          
          <div className="mt-8">
            {isLoadingAnalytics && (
              <div className="flex justify-center items-center h-64">
                <Spinner />
              </div>
            )}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {analyticsData && (
              <DashboardAnalyticsChart data={analyticsData} />
            )}
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminDashboardPage;
