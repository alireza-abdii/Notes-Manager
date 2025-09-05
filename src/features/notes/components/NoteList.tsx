import { useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNotesStore } from '../store/notesStore';
import { NoteListSkeleton } from '../../../components/skeletons';
import { Button, Input, Textarea, Card } from '../../../components/ui';
import type { Note } from '../store/notesStore';

export function NoteList() {
  const { t } = useTranslation();
  const notes = useNotesStore((state) => state.notes);
  const isLoading = useNotesStore((state) => state.isLoading);
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

  // Show skeleton loading during initial load
  if (isLoading) {
    return <NoteListSkeleton count={6} />;
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 sm:flex-row">
        <div>
          <div className="relative md:w-96">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <span className="text-amber-600 dark:text-slate-400">🔍</span>
            </div>
            <Input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder={t('notes.search')}
              className="w-full pl-10 focus:border-amber-500 focus:ring-amber-500 dark:focus:border-slate-500 dark:focus:ring-slate-500"
            />
          </div>
        </div>
        <div>
          <select
            value={selectedTag}
            onChange={(e) => setSelectedTag(e.target.value)}
            className="block w-full rounded-md border border-amber-200 bg-white px-3 py-2 text-amber-900 shadow-sm focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500 dark:border-slate-600 dark:bg-slate-700 dark:text-slate-200 dark:focus:border-slate-500 dark:focus:ring-slate-500"
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

      {filteredNotes.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg bg-amber-50 p-6 text-center text-amber-800 shadow-sm dark:bg-slate-800 dark:text-slate-300"
        >
          {searchText || selectedTag ? t('notes.no_results') : t('notes.empty')}
        </motion.div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {filteredNotes.map((note) => (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8, y: 20 }}
                transition={{ duration: 0.3 }}
                layout
              >
                <Card className="group overflow-hidden border border-amber-100 hover:shadow-md dark:border-slate-700 dark:hover:shadow-xl dark:hover:shadow-slate-900/20">
                {editingNote?.id === note.id ? (
                  <div className="space-y-3">
                    <Input
                      type="text"
                      value={editForm.title}
                      onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                    />
                    <Textarea
                      value={editForm.content}
                      onChange={(e) => setEditForm({ ...editForm, content: e.target.value })}
                      className="min-h-[100px] resize-y"
                    />
                    <Input
                      type="text"
                      value={editForm.tags}
                      onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                      placeholder={t('notes.tags_placeholder')}
                    />
                    <div className="flex gap-2">
                      <Button onClick={handleSave} variant="primary" className="flex-1">
                        {t('notes.save')}
                      </Button>
                      <Button onClick={handleCancel} variant="secondary" className="flex-1">
                        {t('notes.cancel')}
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <h3 className="mb-2 text-lg font-bold text-amber-900 dark:text-slate-100">
                      {note.title}
                    </h3>
                    <p className="mb-3 whitespace-pre-wrap text-amber-800 dark:text-slate-300">
                      {note.content}
                    </p>
                    {note.tags.length > 0 && (
                      <div className="mb-3 flex flex-wrap gap-2">
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
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-amber-600 dark:text-slate-400">
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
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}
