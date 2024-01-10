import { useState } from "react";
import MainTable from "../../../components/Table";
import Modal from "../../../components/Modal";
import { useApi } from "../../../hooks/useApi";
import { formatDate } from "../../../utils/formatters";
import { EVENTS_URL } from "../../../constants/api-urls";
import { calendar_v3 } from "googleapis";

const EventsTable = () => {
  const [selectedEvent, setSelectedEvent] =
    useState<calendar_v3.Schema$Event | null>(null);
  const { data: events, isLoading, error } = useApi(EVENTS_URL);

  const columns = [
    {
      Header: "Event Name",
      accessor: (item: calendar_v3.Schema$Event) => item.summary,
    },
    {
      Header: "Date",
      accessor: (item: calendar_v3.Schema$Event) =>
        formatDate(item.start?.dateTime ?? ""),
    },
    {
      Header: "Attendees",
      accessor: (item: calendar_v3.Schema$Event) =>
        item?.attendees?.map(
          (item: calendar_v3.Schema$EventAttendee) => item.email + ", "
        ),
    },
    {
      Header: "Location",
      accessor: (item: calendar_v3.Schema$Event) => item.location,
    },
  ];

  if (isLoading) {
    return <div>Loading events...</div>;
  }

  if (error) {
    return <div>Error fetching events: {error.message}</div>;
  }

  return (
    <div>
      {events && (
        <MainTable
          data={events.data}
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
            <p>Date: {formatDate(selectedEvent.start?.dateTime ?? "")}</p>
            <div>
              Attendees:
              {selectedEvent.attendees && selectedEvent.attendees.length > 0 ? (
                <ul>
                  {selectedEvent.attendees.map(
                    (
                      attendee: calendar_v3.Schema$EventAttendee,
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
            <p>Created: {formatDate(selectedEvent.created ?? "")}</p>
            <p>Updated: {formatDate(selectedEvent.updated ?? "")}</p>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default EventsTable;
