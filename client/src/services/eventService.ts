/* eslint-disable @typescript-eslint/no-explicit-any */

import axios, { type AxiosResponse } from "axios";
import { toast } from "sonner";

const API_URL = `${import.meta.env.VITE_API_BASE_URL}/events`;


export const getEvents = async (page = 1, limit = 10) => {
  try {
    const res: AxiosResponse = await axios.get(API_URL, {
      params: { page, limit },
    });

    // backend থেকে data এর ভিতর events আর totalPages আছে ধরে নিচ্ছি
    const { events, totalPages } = res.data.data;

    return { events, totalPages };
  } catch (error: any) {
    toast.error("Failed to fetch events");
    console.error("getEvents error:", error);
    throw error;
  }
};

export const createEvent = async (event: { title: string; date: string; time: string; notes?: string }) => {
  try {
    // console.log("Creating event:", event);
    const res = await axios.post(API_URL, event);
    toast.success("Event created successfully");
    return res.data.data;

  } catch (error: any) {
    toast.error("Failed to create event");
    // console.error("createEvent error:", error);
    throw error;
  }
};

export const deleteEvent = async (id: string) => {

  try {
    // console.log("Deleting event id:", id);
    const response : AxiosResponse = await axios.delete(`${API_URL}/${id}`);
    const res = response.data;
    toast.success(res?.data?.data?.message || "Event deleted successfully");
    // console.log("Delete response:", res);
    return res.data;

  } catch (error : any) {
    toast.error("Failed to delete event");
    console.error("deleteEvent error:", error);
   
  }
};

export const updateEvent = async (id: string) => {
  try {
    const res = await axios.put(`${API_URL}/${id}`, { archived: true });
    toast.success(res?.data?.message || "Event updated successfully");
    return res.data.data;
  } catch (error: any) {
    toast.error("Failed to update event");
    console.error("updateEvent error:", error);
  }
};