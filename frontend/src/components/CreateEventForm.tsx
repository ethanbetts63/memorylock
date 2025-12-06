"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useNavigate, Link } from "react-router-dom"

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { showErrorToast } from "@/utils/utils"
import { toast } from "sonner"
import type { EventCreationResponse } from "@/types"

// Define the validation schema using Zod
const formSchema = z.object({
  // Event details
  eventName: z.string().min(3, { message: "Event name must be at least 3 characters." }),
  eventDate: z.string({ required_error: "An event date is required." }).min(1, { message: "An event date is required." }),
  weeksInAdvance: z.preprocess(
    // The value from a number input can be a string, so we preprocess it.
    (val) => (val === "" ? null : Number(val)),
    z.number({
        required_error: "Weeks in advance is required.",
        invalid_type_error: "Must be a number.",
      })
      .min(1, { message: "Must be at least 1 week in advance." })
  ),

  // Required primary contact info
  firstName: z.string().min(2, { message: "First name is required and must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name is required and must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phoneNumber: z.string().min(10, { message: "Please enter a valid phone number." }),

  // Optional backup contact info
  backupEmail: z.string().email({ message: "Please enter a valid backup email." }).optional().or(z.literal('')),
  backupPhoneNumber: z.string().optional(),

  // Optional social media handles
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  snapchat: z.string().optional(),
  x: z.string().optional(),

  // Optional emergency contact details (as a nested object)
  emergencyContact: z.object({
    firstName: z.string().optional(),
    lastName: z.string().optional(),
    email: z.string().email().optional().or(z.literal('')),
    phoneNumber: z.string().optional(),
  }),
})

// Create an explicit type from the schema
export type EventFormValues = z.infer<typeof formSchema>

export function CreateEventForm() {
  const navigate = useNavigate()

  // 1. Define the form using the explicit type
  const form = useForm<EventFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      eventDate: "",
      weeksInAdvance: 4,
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      backupEmail: "",
      backupPhoneNumber: "",
      facebook: "",
      instagram: "",
      snapchat: "",
      x: "",
      emergencyContact: {
        firstName: "",
        lastName: "",
        email: "",
        phoneNumber: "",
      },
    },
  })

  // 2. Define a submit handler using the explicit type
  async function onSubmit(values: EventFormValues) {
    console.log("Submitting to backend:", values);
    try {
      const response = await fetch('/api/events/create/anonymous/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Backend error:', errorData);

        if (response.status === 409) {
          // Handle case where a registered user tries to use the anonymous form
          toast.error("Account Exists", {
            description: (
              <div>
                {errorData.detail} <Link to="/login" className="underline font-bold text-blue-500">Click here to log in.</Link>
              </div>
            ),
            classNames: {
              title: 'text-red-500',
              icon: 'text-red-500',
              description: 'text-red-500',
            },
            duration: 10000,
            closeButton: true,
          });
        } else {
          // Generic error handling
          showErrorToast(`Submission failed: ${JSON.stringify(errorData)}`);
        }
        return;
      }

      const responseData: EventCreationResponse = await response.json();
      console.log('Backend response:', responseData);

      // Navigate to confirmation page with data from the backend
      navigate('/confirmation', { state: { values: responseData } });

    } catch (error) {
      console.error('Network error:', error);
      showErrorToast('A network error occurred. Please try again.');
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

        <Card>
          <CardHeader>
            <CardTitle>Event Details (Required)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="eventName" render={({ field }) => (
              <FormItem>
                <FormLabel>Event Name</FormLabel>
                <FormControl><Input placeholder="e.g., John's 30th Birthday" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="eventDate" render={({ field }) => (
              <FormItem>
                <FormLabel>Event Date</FormLabel>
                <FormControl><Input type="date" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="weeksInAdvance" render={({ field }) => (
                <FormItem>
                    <FormLabel>Weeks in Advance</FormLabel>
                    <FormControl><Input type="number" {...field} /></FormControl>
                    <FormDescription>How many weeks in advance should we start sending notifications?</FormDescription>
                    <FormMessage />
                </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Your Details (Required)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="firstName" render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl><Input placeholder="John" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="lastName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl><Input placeholder="Doe" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl><Input placeholder="john.doe@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="phoneNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl><Input placeholder="(123) 456-7890" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Backup Contact (Recommended)</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <FormField control={form.control} name="backupEmail" render={({ field }) => (
              <FormItem>
                <FormLabel>Backup Email</FormLabel>
                <FormControl><Input placeholder="secondary@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="backupPhoneNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Backup Phone Number</FormLabel>
                <FormControl><Input placeholder="(098) 765-4321" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Media (Optional)</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField control={form.control} name="facebook" render={({ field }) => (
              <FormItem>
                <FormLabel>Facebook</FormLabel>
                <FormControl><Input placeholder="facebook.com/username" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="instagram" render={({ field }) => (
              <FormItem>
                <FormLabel>Instagram</FormLabel>
                <FormControl><Input placeholder="@username" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="snapchat" render={({ field }) => (
              <FormItem>
                <FormLabel>Snapchat</FormLabel>
                <FormControl><Input placeholder="@username" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="x" render={({ field }) => (
              <FormItem>
                <FormLabel>X (Twitter)</FormLabel>
                <FormControl><Input placeholder="@handle" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Emergency Contact (Optional)</CardTitle>
            <FormDescription>The person we contact if all other methods fail.</FormDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={form.control} name="emergencyContact.firstName" render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl><Input placeholder="Jane" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
              <FormField control={form.control} name="emergencyContact.lastName" render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl><Input placeholder="Smith" {...field} /></FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>
            <FormField control={form.control} name="emergencyContact.email" render={({ field }) => (
              <FormItem>
                <FormLabel>Email Address</FormLabel>
                <FormControl><Input placeholder="jane.smith@example.com" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="emergencyContact.phoneNumber" render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl><Input placeholder="(555) 555-5555" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </CardContent>
        </Card>
        
        <Button type="submit" className="w-full">Create Reminder</Button>
      </form>
    </Form>
  )
}
