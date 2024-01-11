import { useState } from "react";
import MainTable from "../../../components/Table";
import Modal from "../../../components/Modal";
import { formatDate } from "../../../utils/formatters";
import { Event, EventAttendee } from "../../../types/eventTypes";
import Loader from "../../../components/Loader";

interface EventsTableProps {
  events: Event[] | null;
  isLoading: boolean;
  error: Error | null;
}

const EventsTable = ({ events, isLoading, error }: EventsTableProps) => {
  const [selectedEvent, setSelectedEvent] =
    useState<Event | null>(null);

  const columns = [
    {
      Header: "Event Name",
      accessor: (item: Event) => item.summary,
    },
    {
      Header: "Date",
      accessor: (item: Event) =>
        formatDate(item.start?.dateTime),
    },
    {
      Header: "Attendees",
      accessor: (item: Event) =>
        item?.attendees?.map(
          (item: EventAttendee) => item.email + ", "
        ),
    },
    {
      Header: "Location",
      accessor: (item: Event) => item.location,
    },
  ];

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error fetching events: {error.message}</div>;
  }

  return (
    <div>
      {events && (
        <MainTable
          data={events}
          columns={columns}
          onRowClick={setSelectedEvent}
        />
      )}

      <Modal
        title="Event Details"
        isOpen={!!selectedEvent}
        onClose={() => setSelectedEvent(null)}
      >
        {selectedEvent && (
          <div>
            <h2>{selectedEvent.summary}</h2>
            <p>Date: {formatDate(selectedEvent.start?.dateTime)}</p>
            <div>
              Attendees:
              {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
                <ul>
                  {selectedEvent.attendees.map(
                    (
                      attendee: any,
                      index: number
                    ) => (
                      <li key={index}>{attendee.email}</li>
                    )
                  )}
                </ul>
              ) : (
                <span> No attendees</span>
              )}
            </div>
            <p>Location: {selectedEvent.location ?? " Not specified"}</p>
            <p>Summary: {selectedEvent.description ?? "Not specified"}</p>
            <p>Organizer: {selectedEvent.organizer?.email}</p>
            <p>Created: {formatDate(selectedEvent.created)}</p>
            <p>Updated: {formatDate(selectedEvent.updated)}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EventsTable;
