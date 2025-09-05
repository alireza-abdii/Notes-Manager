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

/**
 * Custom hook for managing note form state and operations
 * Handles form data, validation, submission, and reset functionality
 */
export function useNoteForm(options: UseNoteFormOptions = {}) {
  const { initialValues = {}, onSubmit, resetOnSubmit = true } = options;

  const [formData, setFormData] = useState<NoteFormData>({
    title: initialValues.title || '',
    content: initialValues.content || '',
    tags: initialValues.tags || '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Helper function to process tags from string to array
  const processTags = useCallback((tagString: string): string[] => {
    return tagString
      .split(',')
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, []);

  // Update individual form fields
  const updateField = useCallback((field: keyof NoteFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  // Reset form to initial values
  const resetForm = useCallback(() => {
    setFormData({
      title: initialValues.title || '',
      content: initialValues.content || '',
      tags: initialValues.tags || '',
    });
  }, [initialValues]);

  // Handle form submission
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

  // Validation
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
