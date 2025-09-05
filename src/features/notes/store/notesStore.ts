import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  tags: string[];
}

interface NotesState {
  notes: Note[];
  isLoading: boolean;
  addNote: (note: Omit<Note, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateNote: (id: string, note: Partial<Note>) => void;
  deleteNote: (id: string) => void;
  setLoading: (loading: boolean) => void;
}

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: [],
      isLoading: true,
      addNote: (note) =>
        set((state) => ({
          notes: [
            ...state.notes,
            {
              ...note,
              id: crypto.randomUUID(),
              createdAt: new Date().toISOString(),
              updatedAt: new Date().toISOString(),
            },
          ],
        })),
      updateNote: (id, note) =>
        set((state) => ({
          notes: state.notes.map((n) =>
            n.id === id ? { ...n, ...note, updatedAt: new Date().toISOString() } : n
          ),
        })),
      deleteNote: (id) =>
        set((state) => ({
          notes: state.notes.filter((n) => n.id !== id),
        })),
      setLoading: (loading) => set({ isLoading: loading }),
    }),
    {
      name: 'notes-storage',
      onRehydrateStorage: () => (state) => {
        // Set loading to false after rehydration is complete
        if (state) {
          state.setLoading(false);
        }
      },
    }
  )
);
