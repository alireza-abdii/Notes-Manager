import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotesStore } from '../store/notesStore';
import type { Note } from '../store/notesStore';

export function NoteList() {
  const { t } = useTranslation();
  const notes = useNotesStore((state) => state.notes);
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const updateNote = useNotesStore((state) => state.updateNote);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [searchText, setSearchText] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    tags: '',
  });

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
      // Filter by search text
      const matchesSearch =
        searchText === '' ||
        note.title.toLowerCase().includes(searchText.toLowerCase()) ||
        note.content.toLowerCase().includes(searchText.toLowerCase());

      // Filter by selected tag
      const matchesTag = selectedTag === '' || note.tags.includes(selectedTag);

      return matchesSearch && matchesTag;
    });
  }, [notes, searchText, selectedTag]);

  const handleEdit = (note: Note) => {
    setEditingNote(note);
    setEditForm({
      title: note.title,
      content: note.content,
      tags: note.tags.join(', '),
    });
  };

  const handleSave = () => {
    if (!editingNote) return;

    updateNote(editingNote.id, {
      title: editForm.title.trim(),
      content: editForm.content.trim(),
      tags: editForm.tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    setEditingNote(null);
  };

  const handleCancel = () => {
    setEditingNote(null);
  };

  return (
    <div className="space-y-6">
      {/* Search and Filter Section */}
      <div className="flex flex-col gap-4 sm:flex-row">
        <div className="flex-1">
          <div className="relative">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-amber-600 dark:text-slate-400">🔍</span>
            </div>
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={t('notes.search')}
              className="input pl-10 focus:border-amber-500 focus:ring-amber-500 dark:focus:border-slate-500 dark:focus:ring-slate-500"
            />
          </div>
        </div>
        <div>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="input focus:border-amber-500 focus:ring-amber-500 dark:focus:border-slate-500 dark:focus:ring-slate-500"
          >
            <option value="">{t('notes.all_tags')}</option>
            {allTags.map((tag) => (
              <option key={tag} value={tag}>
                {tag}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Notes List */}
      {filteredNotes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-amber-50 p-8 text-center text-amber-800 shadow-sm dark:bg-slate-800 dark:text-slate-300"
        >
          {searchText || selectedTag ? t('notes.no_results') : t('notes.empty')}
        </motion.div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
                layout
                className="card group overflow-hidden border border-amber-100 hover:shadow-md dark:border-slate-700 dark:hover:shadow-xl dark:hover:shadow-slate-900/20"
              >
                {editingNote?.id === note.id ? (
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                      className="input"
                    />
                    <textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      className="input min-h-[120px] resize-y"
                    />
                    <input
                      type="text"
                      value={editForm.tags}
                      onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                      className="input"
                      placeholder={t('notes.tags_placeholder')}
                    />
                    <div className="flex gap-2">
                      <button onClick={handleSave} className="btn btn-primary flex-1">
                        {t('notes.save')}
                      </button>
                      <button onClick={handleCancel} className="btn btn-secondary flex-1">
                        {t('notes.cancel')}
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-3 text-lg font-bold text-amber-900 dark:text-slate-100">
                      {note.title}
                    </h3>
                    <p className="mb-4 whitespace-pre-wrap text-amber-800 dark:text-slate-300">
                      {note.content}
                    </p>
                    {note.tags.length > 0 && (
                      <div className="mb-4 flex flex-wrap gap-2">
                        {note.tags.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-full bg-amber-200 px-2.5 py-1 text-xs font-medium text-amber-800 dark:bg-slate-700 dark:text-slate-200"
                            onClick={() => setSelectedTag(tag)}
                            role="button"
                            tabIndex={0}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    <div className="flex justify-between text-sm text-amber-600 dark:text-slate-400">
                      <span className="font-medium">
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </span>
                      <div className="flex gap-2 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <button
                          onClick={() => handleEdit(note)}
                          className="btn-secondary rounded-full p-1.5 text-sm hover:bg-amber-300 dark:hover:bg-slate-600"
                          aria-label={t('notes.edit')}
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteNote(note.id)}
                          className="btn-secondary rounded-full p-1.5 text-sm hover:bg-amber-300 dark:hover:bg-slate-600"
                          aria-label={t('notes.delete')}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
