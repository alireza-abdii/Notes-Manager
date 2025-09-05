import { useMemo, useState, useCallback } from 'react';
import type { Note } from '../features/notes/store/notesStore';

/**
 * Custom hook for filtering and searching notes
 * Handles search text, tag filtering, and provides filtered results
 */
export function useNoteFiltering(notes: Note[]) {
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState('');

  // Extract all unique tags from notes
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach((note) => {
      note.tags.forEach((tag) => tagSet.add(tag));
    });
    return Array.from(tagSet);
  }, [notes]);

  // Filter notes based on search text and selected tag
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

  // Clear all filters
  const clearFilters = useCallback(() => {
    setSearchText('');
    setSelectedTag('');
  }, []);

  // Set search text with debouncing option
  const updateSearchText = useCallback((text: string) => {
    setSearchText(text);
  }, []);

  // Set selected tag
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
