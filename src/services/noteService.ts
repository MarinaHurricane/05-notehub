import axios from "axios";
import type { Note } from "../types/note";
import type { NoteId } from "../types/note";

interface fetchNotesResponseProps {
  notes: Note [];
  totalPages: number;
}

axios.defaults.baseURL = "https://notehub-public.goit.study/api";
const myKey = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async(page: number = 1, searchText: string = "") => {
    const { data } = await axios.get<fetchNotesResponseProps>("/notes", {
        headers: {
        Authorization: `Bearer ${myKey}`
      },
      params: {
        page, 
        perPage: 12,
        search: searchText,
      }
    });
    console.log(data);
    return data;
};

export interface createNoteProps {
  content: string;
  tag: string;
  title: string;
}
export const createNote = async( { content, tag, title }: createNoteProps) => {
  const { data } = await axios.post<Note>("/notes", { content, tag, title }, {
      headers: {
        Authorization: `Bearer ${myKey}`
      },
  });
  return data;
}

export const deleteNote = async(id: NoteId) => {
  const { data } = await axios.delete<Note>(`/notes/${id}`, {
      headers: {
        Authorization: `Bearer ${myKey}`
      },
  });
  return data;
}




