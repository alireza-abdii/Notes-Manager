import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNotesStore } from '../store/notesStore';

export function NoteForm() {
  const { t } = useTranslation();
  const addNote = useNotesStore((state) => state.addNote);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;

    addNote({
      title: title.trim(),
      content: content.trim(),
      tags: tags
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean),
    });

    // Reset form
    setTitle('');
    setContent('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="card mb-8">
      <div className="space-y-4">
        <div>
          <label htmlFor="title" className="mb-2 block text-sm font-medium">
            {t('notes.title_placeholder')}
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="input"
            required
          />
        </div>

        <div>
          <label htmlFor="content" className="mb-2 block text-sm font-medium">
            {t('notes.content_placeholder')}
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="input min-h-[100px] resize-y"
            required
          />
        </div>

        <div>
          <label htmlFor="tags" className="mb-2 block text-sm font-medium">
            {t('notes.tags_placeholder')}
          </label>
          <input
            type="text"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input"
          />
        </div>

        <button type="submit" className="btn btn-primary w-full">
          {t('notes.add')}
        </button>
      </div>
    </form>
  );
}
