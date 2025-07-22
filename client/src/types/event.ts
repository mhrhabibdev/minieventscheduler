export interface IEvent {
  _id: string;
  title: string;
  date: string;
  time: string ; 
  notes?: string;
  category: "Work" | "Personal" | "Other";
  archived: boolean;
}

export type EventFormData = {
  title: string;
  date: string;
  time: string;
  category: "Work" | "Personal" | "Other";
  notes?: string;
  archived?: boolean
};