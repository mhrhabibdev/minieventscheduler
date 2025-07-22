import { useEffect, useState } from "react";
import { EventTable } from "./EventTable";
import { getEvents, deleteEvent, updateEvent, createEvent } from "@/services/eventService";
import { format} from "date-fns";
import { toast } from "sonner";
import { Pagination } from "@/components/ui/pagination";
import { ArchiveDialog } from "@/components/Event/ArchiveDialog";
import { DeleteDialog } from "@/components/Event/DeleteDialog";
import type { IEvent } from "@/types/event";


export default function ManageEvents() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [archiveDialogOpen, setArchiveDialogOpen] = useState(false);
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const limit = 10;

  const fetchEvents = async (page: number) => {
    setLoading(true);
    try {
      const { events, totalPages } = await getEvents(page, limit);
      setEvents(events);
      setTotalPages(totalPages);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch events:", err);
      setError("Failed to load events");
      toast.error("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const handleArchive = (id: string) => {
    setSelectedEventId(id);
    setArchiveDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setSelectedEventId(id);
    setDeleteDialogOpen(true);
  };

  const handleArchiveConfirm = async () => {
    if (!selectedEventId) return;
    try {
      const updatedEvent = await updateEvent(selectedEventId);
      setEvents(events.map(event => 
        event._id === selectedEventId ? updatedEvent : event
      ));
      toast.success("Event archived successfully");
    } catch (err) {
      console.error("Failed to archive event:", err);
      toast.error("Failed to archive event");
    } finally {
      setArchiveDialogOpen(false);
      setSelectedEventId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEventId) return;
    try {
      await deleteEvent(selectedEventId);
      setEvents(events.filter(event => event._id !== selectedEventId));
      toast.success("Event deleted successfully");
    } catch (err) {
      console.error("Failed to delete event:", err);
      toast.error("Failed to delete event");
    } finally {
      setDeleteDialogOpen(false);
      setSelectedEventId(null);
    }
  };

const handleCreateEvent = async (eventData: Omit<IEvent, '_id'>) => {
  try {
    // Create the event payload
    const eventPayload = {
      title: eventData.title,
      date: format(new Date(eventData.date), "yyyy-MM-dd"),
      time: eventData.time,
      notes: eventData.notes,
      category: eventData.category,
      archived: false
    };

    // Call the API
    const newEvent = await createEvent(eventPayload);

    // Update local state
    setEvents(prevEvents => [newEvent, ...prevEvents]);
    toast.success("Event created successfully");

    // Refresh the events list
    if (currentPage !== 1) {
      setCurrentPage(1); // Will trigger useEffect to refetch
    } else {
      await fetchEvents(1); // Explicitly refetch first page
    }
  } catch (err) {
    console.error("Failed to create event:", err);
    toast.error(
      err instanceof Error 
        ? err.message 
        : "Failed to create event. Please try again."
    );
  }
};


  if (loading) return <div className="p-4 text-center">Loading events...</div>;
  if (error) return <div className="p-4 text-center text-destructive">{error}</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="text-center space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Manage Events</h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          View, archive, or delete your events. Keep your event list organized.
        </p>
      </div>

      <EventTable
        events={events}
        onDelete={handleDelete}
        onArchive={handleArchive}
        onCreateEvent={handleCreateEvent}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
         
        />
      )}

      <ArchiveDialog
        open={archiveDialogOpen}
        onOpenChange={setArchiveDialogOpen}
        onConfirm={handleArchiveConfirm}
      />
      <DeleteDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        onConfirm={handleDeleteConfirm}
      />
    </div>
  );
}

