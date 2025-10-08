import { useMemo, useState, useCallback } from 'react';
import type { Note } from '../features/notes/store/notesStore';

export function useNoteFiltering(notes: Note[]) {
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach((note) => {
      note.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [notes]);

  const filteredNotes = useMemo(() => {
    return notes.filter((note) => {
      const matchesSearch =
        searchText === '' ||
        note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.content.toLowerCase().includes(searchText.toLowerCase());

      const matchesTag = selectedTag === '' || note.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [notes, searchText, selectedTag]);

  const clearFilters = useCallback(() => {
    setSearchText('');
    setSelectedTag('');
  }, []);

  const updateSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  const updateSelectedTag = useCallback((tag: string) => {
    setSelectedTag(tag);
  }, []);

  return {
    searchText,
    selectedTag,
    allTags,
    filteredNotes,
    updateSearchText,
    updateSelectedTag,
    clearFilters,
    hasActiveFilters: searchText !== '' || selectedTag !== '',
  };
}
