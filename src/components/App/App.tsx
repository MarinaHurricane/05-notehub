import { useState } from "react";
import css from "./App.module.css";
import { fetchNotes } from "../../services/noteService";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import SearchBox from "../SearchBox/SearchBox";
import NoteList from "../NoteList/NoteList";
import Pagination from "../Pagination/Pagination";
import Modal from "../Modal/Modal";
import { useDebouncedCallback } from "use-debounce";

export default function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const debouncedSetSearchQuery = useDebouncedCallback(setSearchQuery, 300);

  const openModal = () => setIsModalOpen(true);

  const closeModal = () => setIsModalOpen(false);

  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["notes", page, searchQuery],
    queryFn: () => fetchNotes(page, searchQuery),
    placeholderData: keepPreviousData,
  });

  const notes = data?.notes || [];
  const totalPages = data?.totalPages || 0;

  return (
    <div className={css.app}>
      <header className={css.toolbar}>
        <SearchBox onSearch={debouncedSetSearchQuery} />
        {totalPages > 1 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            onPageChange={setPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      <NoteList notes={notes} />
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
}
