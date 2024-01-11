export interface EventAttendee extends Record<string, any> {
  email?: string | null;
  id?: string | null;
  organizer?: boolean | null;
  self?: boolean | null;
}

export interface EventDateTime {
  date?: string | null;
  dateTime?: string | null;
  timeZone?: string | null;
}

export interface Event extends Record<string, any> {
  attendees?: EventAttendee[];
  created?: string | null;
  description?: string | null;
  eventType?: string | null;
  location?: string | null;
  organizer?: {
    displayName?: string;
    email?: string;
    id?: string;
    self?: boolean;
  } | null;
  start?: EventDateTime;
  summary?: string | null;
  updated?: string | null;
}
