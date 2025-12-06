/**
 * Represents the successful response from the anonymous event creation API.
 */
export type EventCreationResponse = {
  status: "success";
  message: string;
  eventId: number;
  userEmail: string;
  eventName: string;
  eventDate: string; // YYYY-MM-DD format
  weeksInAdvance: number;
};
