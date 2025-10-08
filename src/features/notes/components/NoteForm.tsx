import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useNotesStore } from '../store/notesStore';
import { NoteFormSkeleton } from '../../../components/skeletons';
import { Button, Input, Textarea, Card } from '../../../components/ui';
import { useNoteForm, useToggle, useLoadingState } from '../../../hooks';

export function NoteForm() {
  const { t } = useTranslation();
  const addNote = useNotesStore((state) => state.addNote);
  const { value: isExpanded, setTrue: expandForm, setFalse: collapseForm } = useToggle(false);
  const { withLoading, isLoading: isSubmitting } = useLoadingState();

  const { formData, updateField, handleSubmit } = useNoteForm({
    onSubmit: async (data) => {
      await withLoading(async () => {
        addNote(data);
        collapseForm();
      }, 300); 
    },
    resetOnSubmit: true,
  });

  if (isSubmitting) {
    return <NoteFormSkeleton />;
  }

  return (
    <motion.div layout transition={{ duration: 0.3 }} className="h-full w-full">
      <motion.form onSubmit={handleSubmit} layout>
        <Card
          className={`${isExpanded ? 'w-full' : 'inline-flex'} w-full border border-amber-100 dark:border-slate-700`}
        >
          <motion.div layout className={`${isExpanded ? 'w-full space-y-3' : ''} w-full`}>
            {!isExpanded ? (
              <Button type="button" onClick={expandForm} className="w-full py-3" variant="primary">
                {t('notes.add')}
              </Button>
            ) : (
              <>
                <div>
                  <label
                    htmlFor="title"
                    className="mb-1 block text-sm font-medium text-amber-900 dark:text-slate-200"
                  >
                    {t('notes.title_placeholder')}
                  </label>
                  <Input
                    type="text"
                    id="title"
                    value={formData.title}
                    onChange={(e) => updateField('title', e.target.value)}
                    className="w-full focus:border-amber-500 focus:ring-amber-500 dark:focus:border-slate-500 dark:focus:ring-slate-500"
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
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => updateField('content', e.target.value)}
                    className="min-h-[100px] w-full resize-y focus:border-amber-500 focus:ring-amber-500 dark:focus:border-slate-500 dark:focus:ring-slate-500"
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
                  <Input
                    type="text"
                    id="tags"
                    value={formData.tags}
                    onChange={(e) => updateField('tags', e.target.value)}
                    className="w-full focus:border-amber-500 focus:ring-amber-500 dark:focus:border-slate-500 dark:focus:ring-slate-500"
                  />
                </div>

                <div className="flex gap-2">
                  <Button type="submit" variant="primary" className="flex-1">
                    {t('notes.add')}
                  </Button>
                  <Button type="button" onClick={collapseForm} variant="secondary">
                    {t('notes.cancel')}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </Card>
      </motion.form>
    </motion.div>
  );
}
