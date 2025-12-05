"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { cn } from "@/utils/utils"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import formImage from '@/assets/faq_image_landscape.webp';

// --- Schemas ---
const passwordSchema = z.object({
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match.",
  path: ["confirmPassword"], // Point error to the confirmPassword field
});

const signupSchema = passwordSchema.safeExtend({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
});

// --- Component Props ---
interface AccountCreationFormProps extends React.ComponentProps<"div"> {
  mode: 'signup' | 'activate';
  email?: string; // Optional email to display in activate mode
}

export function AccountCreationForm({ className, mode, email, ...props }: AccountCreationFormProps) {
  // --- Form Definition ---
  const formSchema = mode === 'signup' ? signupSchema : passwordSchema;
  type FormValues = z.infer<typeof formSchema>;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: mode === 'signup' 
      ? { firstName: "", lastName: "", email: "", password: "", confirmPassword: "" } 
      : { password: "", confirmPassword: "" },
  });

  // --- Submit Handler ---
  function onSubmit(values: FormValues) {
    // In a real app, this would make an API call
    console.log({ mode, values });
    alert(`Account ${mode === 'signup' ? 'created' : 'activated'}! Check the console.`);
  }

  // --- UI Text based on mode ---
  const title = mode === 'signup' ? "Create your account" : "Activate your account";
  const description = mode === 'signup'
    ? "Enter your details below to create your account"
    : `Set a password for ${email} to manage your event.`;
  const submitButtonText = mode === 'signup' ? "Create Account" : "Activate Account";

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden p-0">
        <CardContent className="grid p-0 md:grid-cols-2">
          
          <div className="p-6 md:p-8">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                
                {/* Header */}
                <div className="flex flex-col items-center gap-2 text-center">
                  <h1 className="text-2xl font-bold">{title}</h1>
                  <p className="text-muted-foreground text-sm text-balance">
                    {description}
                  </p>
                </div>

                {/* Name Fields (Signup Mode Only) */}
                {mode === 'signup' && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="firstName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>First Name</FormLabel>
                          <FormControl><Input placeholder="John" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Last Name</FormLabel>
                          <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                )}

                {/* Email Field (Signup Mode Only) */}
                {mode === 'signup' && (
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                {/* Password Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormDescription className="text-xs">
                  Must be at least 8 characters long.
                </FormDescription>

                {/* Submit Button */}
                <Button type="submit" className="w-full">{submitButtonText}</Button>

              </form>
            </Form>
          </div>

          {/* Image Section */}
          <div className="bg-muted relative hidden md:block">
            <img
              src={formImage}
              alt="An abstract image representing security or memory"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.3]"
            />
          </div>

        </CardContent>
      </Card>
      
      {/* Footer Text */}
      {mode === 'signup' && (
        <p className="px-6 text-center text-sm text-muted-foreground">
          By clicking continue, you agree to our{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Terms of Service
          </a>{" "}
          and{" "}
          <a href="#" className="underline underline-offset-4 hover:text-primary">
            Privacy Policy
          </a>
          .
        </p>
      )}
    </div>
  );
}
