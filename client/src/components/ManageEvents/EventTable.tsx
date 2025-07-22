import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Trash2, Archive } from "lucide-react";
import type { IEvent } from "@/types/event";
import { format, parseISO } from "date-fns";
import { AddEventDialog } from "./AddEventDialog";

interface EventTableProps {
  events: IEvent[];
  onDelete: (id: string) => void;
  onArchive: (id: string) => void;
  onCreateEvent: (eventData: Omit<IEvent, "_id">) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

export const EventTable = ({
  events,
  onDelete,
  onArchive,
  onCreateEvent,
}: EventTableProps) => {
  return (
    <div className="w-full space-y-4">
      {/* Top section with Add button */}
      <div className="flex items-center justify-end">
        <AddEventDialog onAddEvent={onCreateEvent} />
      </div>

      {/* Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-gray-50 dark:bg-gray-800">
            <TableRow>
              <TableHead className="w-[30%]">Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Time</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {events.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center h-24 text-muted-foreground">
                  No events found.
                </TableCell>
              </TableRow>
            ) : (
              events.map((event) => {
                const eventDate = event.date ? parseISO(event.date) : null;
                const eventTime =
                  event.time && event.time.length === 5
                    ? parseISO(`1970-01-01T${event.time}:00Z`)
                    : null;

                return (
                  <TableRow key={event._id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50">
                    <TableCell className="font-medium">{event.title}</TableCell>
                    <TableCell>
                      {eventDate ? format(eventDate, "PPP") : "N/A"}
                    </TableCell>
                    <TableCell>
                      {eventTime ? format(eventTime, "h:mm a") : "All day"}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary">
                        {event.category}
                      </span>
                    </TableCell>
                    <TableCell className="flex justify-end gap-2">
                      {!event.archived ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onArchive(event._id)}
                          className="gap-1 hover:bg-amber-500/10 hover:text-amber-600"
                        >
                          <Archive className="w-3 h-3" />
                          Archive
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="outline"
                          className="text-red-700 border-red-300"
                        >
                          Archived
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(event._id)}
                        className=" gap-1 hover:bg-destructive/10 cursor-pointer  hover:text-destructive"
                      >
                        <Trash2 className="w-3 h-3" />
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
