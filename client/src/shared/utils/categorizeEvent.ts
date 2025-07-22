import {
  EVENT_CATEGORIES,
  WORK_KEYWORDS,
  PERSONAL_KEYWORDS,
} from "@/shared/constants/event.constants";

export const categorizeEvent = (title: string, notes?: string): string => {
  const content = `${title} ${notes || ""}`.toLowerCase();

  if (WORK_KEYWORDS.some(keyword => content.includes(keyword.toLowerCase()))) {
    return EVENT_CATEGORIES.WORK;
  }

  if (PERSONAL_KEYWORDS.some(keyword => content.includes(keyword.toLowerCase()))) {
    return EVENT_CATEGORIES.PERSONAL;
  }

  return EVENT_CATEGORIES.OTHER;
};
