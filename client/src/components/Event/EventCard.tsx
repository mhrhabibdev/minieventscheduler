import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { format, parseISO, isValid } from "date-fns";
import { Archive, Trash2, Calendar, Clock } from "lucide-react";
import type { IEvent } from "@/types/event";

interface EventCardProps {
  event: IEvent;
  onArchive?: (_id: string) => void;
  onDelete?: (_id: string) => void;
}

export function EventCard({ event, onArchive, onDelete }: EventCardProps) {
  // Safely parse and format date
  const parsedDate = event.date ? parseISO(event.date) : null;
  const formattedDate =
    parsedDate && isValid(parsedDate)
      ? format(parsedDate, "PPP")
      : "No date set";

  // Safely parse and format time
  const parsedTime = event.time ? parseISO(`1970-01-01T${event.time}`) : null;
  const formattedTime =
    parsedTime && isValid(parsedTime)
      ? format(parsedTime, "h:mm a")
      : "All day";

  // Category badge colors with more variants
  const getCategoryVariant = () => {
    switch (event.category.toLowerCase()) {
      case "work":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "personal":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "family":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "important":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200";
    }
  };

  return (
    <Card
      className={`w-full transition-all duration-200 ${
        event.archived ? "opacity-70 border-dashed" : "hover:shadow-md"
      }`}
    >
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-2">
            {event.title}
          </CardTitle>
          <Badge className={`${getCategoryVariant()} whitespace-nowrap`}>
            {event.category}
          </Badge>
        </div>

        <CardDescription className="flex flex-col gap-1 mt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2" />
            {formattedDate}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2" />
            {formattedTime}
          </div>
        </CardDescription>
      </CardHeader>

      <CardContent>
        {event.notes ? (
          <p className="text-sm text-muted-foreground whitespace-pre-wrap line-clamp-3">
            {event.notes}
          </p>
        ) : (
          <p className="text-sm italic text-muted-foreground">
            No description provided
          </p>
        )}
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {onDelete && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onDelete(event._id)}
            className="gap-1 hover:bg-destructive/10 cursor-pointer  hover:text-destructive"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        )}

        {onArchive && !event.archived ? (
          <Button
            variant="outline"
            size="sm"
            onClick={() => onArchive(event._id)}
            className="gap-1 hover:bg-amber-500/10 cursor-pointer hover:text-amber-600"
          >
            <Archive className="w-4 h-4" />
            Archive
          </Button>
        ) : event.archived ? (
          <Button disabled  variant="outline" className="text-red-800 border-red-300">
            Archived
          </Button >
        ) : null}
      </CardFooter>
    </Card>
  );
}
