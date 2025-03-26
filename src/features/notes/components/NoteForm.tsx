import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNotesStore } from '../store/notesStore';

export function NoteForm() {
  const { t } = useTranslation();
  const addNote = useNotesStore((state) => state.addNote);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [isExpanded, setIsExpanded] = useState(false);

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

    setTitle('');
    setContent('');
    setTags('');
    setIsExpanded(false);
  };

  return (
    <motion.div layout transition={{ duration: 0.3 }} className="mb-4 lg:mb-0">
      <motion.form
        onSubmit={handleSubmit}
        className="card border border-amber-100 dark:border-slate-700"
        layout
      >
        <motion.div layout className="space-y-3">
          {!isExpanded ? (
            <div
              onClick={() => setIsExpanded(true)}
              className="cursor-pointer rounded-md bg-amber-50 p-3 text-amber-800 hover:bg-amber-100 dark:bg-slate-700 dark:text-slate-200 dark:hover:bg-slate-600"
            >
              <p className="text-center">{t('notes.add')}</p>
            </div>
          ) : (
            <>
              <div>
                <label
                  htmlFor="title"
                  className="mb-1 block text-sm font-medium text-amber-900 dark:text-slate-200"
                >
                  {t('notes.title_placeholder')}
                </label>
                <input
                  type="text"
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="input focus:border-amber-500 focus:ring-amber-500 dark:focus:border-slate-500 dark:focus:ring-slate-500"
                  required
                  autoFocus
                />
              </div>

              <div>
                <label
                  htmlFor="content"
                  className="mb-1 block text-sm font-medium text-amber-900 dark:text-slate-200"
                >
                  {t('notes.content_placeholder')}
                </label>
                <textarea
                  id="content"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="input min-h-[100px] resize-y focus:border-amber-500 focus:ring-amber-500 dark:focus:border-slate-500 dark:focus:ring-slate-500"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="tags"
                  className="mb-1 block text-sm font-medium text-amber-900 dark:text-slate-200"
                >
                  {t('notes.tags_placeholder')}
                </label>
                <input
                  type="text"
                  id="tags"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  className="input focus:border-amber-500 focus:ring-amber-500 dark:focus:border-slate-500 dark:focus:ring-slate-500"
                />
              </div>

              <div className="flex gap-2">
                <button type="submit" className="btn btn-primary flex-1">
                  {t('notes.add')}
                </button>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="btn btn-secondary"
                >
                  {t('notes.cancel')}
                </button>
              </div>
            </>
          )}
        </motion.div>
      </motion.form>
    </motion.div>
  );
}
