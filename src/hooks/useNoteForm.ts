import { useState, useCallback } from 'react';

interface NoteFormData {
  title: string;
  content: string;
  tags: string;
}

interface UseNoteFormOptions {
  initialValues?: Partial<NoteFormData>;
  onSubmit?: (data: { title: string; content: string; tags: string[] }) => void | Promise<void>;
  resetOnSubmit?: boolean;
}

export function useNoteForm(options: UseNoteFormOptions = {}) {
  const { initialValues = {}, onSubmit, resetOnSubmit = true } = options;

  const [formData, setFormData] = useState<NoteFormData>({
    title: initialValues.title || '',
    content: initialValues.content || '',
    tags: initialValues.tags || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const processTags = useCallback((tagString: string): string[] => {
    return tagString
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, []);

  const updateField = useCallback((field: keyof NoteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const resetForm = useCallback(() => {
    setFormData({
      title: initialValues.title || '',
      content: initialValues.content || '',
      tags: initialValues.tags || '',
    });
  }, [initialValues]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim() || !formData.content.trim()) {
      return;
    }

    setIsSubmitting(true);

    try {
      if (onSubmit) {
        await onSubmit({
          title: formData.title.trim(),
          content: formData.content.trim(),
          tags: processTags(formData.tags),
        });
      }

      if (resetOnSubmit) {
        resetForm();
      }
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, onSubmit, resetOnSubmit, resetForm, processTags]);

  const isValid = formData.title.trim() !== '' && formData.content.trim() !== '';

  return {
    formData,
    updateField,
    resetForm,
    handleSubmit,
    isSubmitting,
    isValid,
    processTags,
  };
}
