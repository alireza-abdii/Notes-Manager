import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotesStore } from '../store/notesStore';
import type { Note } from '../store/notesStore';

export function NoteList() {
  const { t } = useTranslation();
  const notes = useNotesStore((state) => state.notes);
  const deleteNote = useNotesStore((state) => state.deleteNote);
  const updateNote = useNotesStore((state) => state.updateNote);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [editForm, setEditForm] = useState({
    title: '',
    content: '',
    tags: '',
  });

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

  if (notes.length === 0) {
    return <div className="text-center text-gray-600 dark:text-gray-400">{t('notes.empty')}</div>;
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {notes.map((note) => (
        <div key={note.id} className="card">
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
                className="input min-h-[100px] resize-y"
              />
              <input
                type="text"
                value={editForm.tags}
                onChange={(e) => setEditForm({ ...editForm, tags: e.target.value })}
                className="input"
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
              <h3 className="mb-2 text-lg font-semibold">{note.title}</h3>
              <p className="mb-4 whitespace-pre-wrap">{note.content}</p>
              {note.tags.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {note.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full bg-amber-200 px-2 py-1 text-sm dark:bg-slate-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                <span>{new Date(note.updatedAt).toLocaleDateString()}</span>
                <div className="flex gap-2">
                  <button onClick={() => handleEdit(note)} className="btn btn-secondary">
                    {t('notes.edit')}
                  </button>
                  <button onClick={() => deleteNote(note.id)} className="btn btn-secondary">
                    {t('notes.delete')}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
