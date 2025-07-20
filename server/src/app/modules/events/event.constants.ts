export const EVENT_CATEGORIES = {
  WORK: 'Work',
  PERSONAL: 'Personal',
  OTHER: 'Other'
} as const;

export type TEventCategoryValue = typeof EVENT_CATEGORIES[keyof typeof EVENT_CATEGORIES]; 
// 'Work' | 'Personal' | 'Other'

export const WORK_KEYWORDS = ['meeting', 'project', 'client', 'work', 'deadline'] as const;
export const PERSONAL_KEYWORDS = ['birthday', 'family', 'friend', 'personal', 'holiday'] as const;
