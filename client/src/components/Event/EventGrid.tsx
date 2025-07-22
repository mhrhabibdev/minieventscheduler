// components/Event/EventGrid.tsx
import { EventCard } from "./EventCard";
import type { IEvent } from "@/types/event";

interface EventGridProps {
  events: IEvent[];
  onArchive: (id: string) => void;
  onDelete: (id: string) => void;
}

export const EventGrid = ({ events, onArchive, onDelete }: EventGridProps) => {
  if (events.length === 0) {
    return <p className="text-center text-muted-foreground col-span-full">No events found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {events.map(event => (
        <EventCard
          key={event._id}
          event={event}
          onArchive={() => onArchive(event._id)}
          onDelete={() => onDelete(event._id)}
        />
      ))}
    </div>
  );
};
