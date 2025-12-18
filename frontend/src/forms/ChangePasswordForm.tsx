// frontend/src/forms/ChangePasswordForm.tsx
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { changePassword } from '@/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from 'lucide-react';

// Define the shape of the form data
type PasswordFormData = {
  old_password: string;
  new_password: string;
  new_password_confirm: string;
};

export const ChangePasswordForm: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const form = useForm<PasswordFormData>({
    defaultValues: {
      old_password: '',
      new_password: '',
      new_password_confirm: '',
    },
  });

  const { register, handleSubmit, formState: { errors, isSubmitting }, setError: setFormError, reset } = form;

  const onSubmit: SubmitHandler<PasswordFormData> = async (data) => {
    setError(null);
    setSuccess(null);

    // Manual Validation
    if (data.new_password.length < 8) {
        setFormError('new_password', { type: 'manual', message: 'Password must be at least 8 characters long' });
        return;
    }
    if (data.new_password !== data.new_password_confirm) {
      setFormError('new_password_confirm', { type: 'manual', message: "The two password fields didn't match." });
      return;
    }

    try {
      await changePassword({
          old_password: data.old_password,
          new_password: data.new_password,
          new_password_confirm: data.new_password_confirm
      });
      setSuccess('Your password has been changed successfully.');
      reset();
    } catch (err: any) {
      const errorMessage = err.response?.data?.old_password?.[0] 
                        || err.response?.data?.detail
                        || err.message 
                        || 'An error occurred.';
      setError(errorMessage);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {error && (
            <Alert variant="destructive">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Error</AlertTitle>
                <AlertDescription>{error}</AlertDescription>
            </Alert>
        )}
        {success && (
             <Alert variant="default">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Success</AlertTitle>
                <AlertDescription>{success}</AlertDescription>
            </Alert>
        )}
        <FormItem>
          <FormLabel>Current Password</FormLabel>
          <FormControl>
            <Input type="password" {...register('old_password', { required: 'Current password is required' })} />
          </FormControl>
          <FormMessage>{errors.old_password?.message}</FormMessage>
        </FormItem>
        
        <FormItem>
          <FormLabel>New Password</FormLabel>
          <FormControl>
            <Input type="password" {...register('new_password', { required: 'New password is required' })} />
          </FormControl>
          <FormMessage>{errors.new_password?.message}</FormMessage>
        </FormItem>

        <FormItem>
          <FormLabel>Confirm New Password</FormLabel>
          <FormControl>
            <Input type="password" {...register('new_password_confirm', { required: 'Please confirm your new password' })} />
          </FormControl>
          <FormMessage>{errors.new_password_confirm?.message}</FormMessage>
        </FormItem>

        <Button type="submit" disabled={isSubmitting}>
          Change Password
        </Button>
      </form>
    </Form>
  );
};