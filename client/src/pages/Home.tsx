import { useEffect, useState } from "react";
import { getEvents, deleteEvent, updateEvent } from "@/services/eventService";
import type { IEvent } from "@/types/event";
import { EventGrid } from "@/components/Event/EventGrid";
import { Pagination } from "@/components/ui/pagination";
import { ArchiveDialog } from "@/components/Event/ArchiveDialog";
import { DeleteDialog } from "@/components/Event/DeleteDialog";

export const Home = () => {
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
      console.error(err);
      setError("Failed to load events");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage]);

  const handleArchiveConfirm = async () => {
    if (!selectedEventId) return;
    try {
      const updatedEvent = await updateEvent(selectedEventId);
      setEvents(
        events.map((event) =>
          event._id === selectedEventId ? updatedEvent : event
        )
      );
    } finally {
      setArchiveDialogOpen(false);
      setSelectedEventId(null);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedEventId) return;
    try {
      await deleteEvent(selectedEventId);
      setEvents(events.filter((event) => event._id !== selectedEventId));
    } finally {
      setDeleteDialogOpen(false);
      setSelectedEventId(null);
    }
  };

  if (loading) return <div className="p-4 text-center">Loading events...</div>;
  if (error) return <div className="p-4 text-center text-red-500">{error}</div>;

  return (
    <div className="p-4 flex flex-col gap-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight text-primary mb-2">
          Manage Events
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          View, archive, or delete your events from the list below. Stay
          organized and keep your event list up to date.
        </p>
      </div>
      <EventGrid
        events={events}
        onArchive={(id) => {
          setSelectedEventId(id);
          setArchiveDialogOpen(true);
        }}
        onDelete={(id) => {
          setSelectedEventId(id);
          setDeleteDialogOpen(true);
        }}
      />
      {totalPages > 1 && (
        <div className="flex justify-center mt-3">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
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
};
