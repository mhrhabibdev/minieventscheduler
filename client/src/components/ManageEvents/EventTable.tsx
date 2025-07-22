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
      <div className="rounded-md border border-border bg-background">
        <Table>
          <TableHeader className="bg-muted">
            <TableRow>
              <TableHead className="w-[30%] text-foreground">Title</TableHead>
              <TableHead className="text-foreground">Date</TableHead>
              <TableHead className="text-foreground">Time</TableHead>
              <TableHead className="text-foreground">Category</TableHead>
              <TableHead className="text-right text-foreground">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {!events || events.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center h-24 text-muted-foreground"
                >
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
                  <TableRow
                    key={event._id}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <TableCell className="font-medium text-foreground">
                      {event.title}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {eventDate ? format(eventDate, "PPP") : "N/A"}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {eventTime ? format(eventTime, "h:mm a") : "All day"}
                    </TableCell>
                    <TableCell>
                      <span className="px-2 py-1 text-xs rounded-full bg-primary/10 text-primary capitalize">
                        {event.category}
                      </span>
                    </TableCell>
                    <TableCell className="flex justify-end gap-2">
                      {!event.archived ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onArchive(event._id)}
                          className="gap-1 hover:bg-muted cursor-pointer dark:hover:bg-muted/40"
                        >
                          <Archive className="w-3 h-3" />
                          Archive
                        </Button>
                      ) : (
                        <Button
                          disabled
                          variant="outline"
                          className="gap-1 text-muted-foreground cursor-not-allowed"
                        >
                          Archived
                        </Button>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onDelete(event._id)}
                        className="gap-1 text-destructive hover:bg-destructive/10 dark:hover:bg-destructive/20 cursor-pointer"
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
