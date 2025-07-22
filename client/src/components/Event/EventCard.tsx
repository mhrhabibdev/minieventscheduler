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
  const parsedDate = event.date ? parseISO(event.date) : null;
  const formattedDate =
    parsedDate && isValid(parsedDate)
      ? format(parsedDate, "PPP")
      : "No date set";

  const parsedTime = event.time ? parseISO(`1970-01-01T${event.time}`) : null;
  const formattedTime =
    parsedTime && isValid(parsedTime)
      ? format(parsedTime, "h:mm a")
      : "All day";

  const getCategoryVariant = () => {
    switch (event.category.toLowerCase()) {
      case "work":
        return "secondary";
      case "personal":
        return "default";
      case "family":
        return "outline";
      case "important":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <Card
      className={`w-full transition-all duration-200 bg-background border border-border ${
        event.archived ? "opacity-70 border-dashed" : "hover:shadow-md"
      }`}
    >
      {/* Header */}
      <CardHeader>
        <div className="flex justify-between items-start gap-2">
          <CardTitle className="text-lg font-semibold line-clamp-2 text-foreground">
            {event.title}
          </CardTitle>
          <Badge
            variant={getCategoryVariant()}
            className="whitespace-nowrap capitalize text-xs"
          >
            {event.category}
          </Badge>
        </div>

        <CardDescription className="flex flex-col gap-1 mt-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <Calendar className="w-4 h-4 mr-2 text-muted-foreground" />
            {formattedDate}
          </div>
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-muted-foreground" />
            {formattedTime}
          </div>
        </CardDescription>
      </CardHeader>

      {/* Notes */}
      <CardContent>
        <p
          className={`text-sm whitespace-pre-wrap line-clamp-3 ${
            event.notes ? "text-muted-foreground" : "italic text-muted-foreground"
          }`}
        >
          {event.notes || "No description provided"}
        </p>
      </CardContent>

      {/* Footer buttons */}
      <CardFooter className="flex justify-end gap-2">
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(event._id)}
            className="gap-1 text-destructive cursor-pointer hover:bg-destructive/10 dark:hover:bg-destructive/20"
          >
            <Trash2 className="w-4 h-4" />
            Delete
          </Button>
        )}

        {onArchive && !event.archived ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onArchive(event._id)}
            className="gap-1 cursor-pointer hover:bg-muted dark:hover:bg-muted/40"
          >
            <Archive className="w-4 h-4" />
            Archive
          </Button>
        ) : event.archived ? (
          <Button
            variant="ghost"
            size="sm"
            disabled
            className="gap-1 text-muted-foreground cursor-not-allowed"
          >
            <Archive className="w-4 h-4" />
            Archived
          </Button>
        ) : null}
      </CardFooter>
    </Card>
  );
}
