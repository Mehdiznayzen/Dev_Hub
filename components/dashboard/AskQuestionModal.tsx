'use client';

import { useState } from 'react';
import { X, Sparkles, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CustomInput } from '../profile/CustomInput';
import axios from 'axios';
import { toast } from 'sonner';

const AskQuestionModal = ({ open, onClose }: { open: boolean; onClose: () => void; }) => {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  if (!open) return null;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await axios.post(process.env.NEXT_PUBLIC_API_CREATE_PROFILE!, {
        title: formData.title,
        content: formData.content
      });

      if(response.status === 200){
        onClose();
        toast.info(response.data.message)
      }

      const data = await response.data;
      console.log('Response from server:', data);
    } catch (error) {
      
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-question-title"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-2xl border border-border/70 bg-card/80 shadow-2xl backdrop-blur-xl animate-fade-up">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-border/60 px-6 py-4">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 id="ask-question-title" className="text-lg font-semibold text-foreground">
              Ask a Question
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 cursor-pointer w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            <div className="space-y-2">
              <CustomInput
                label='Title'
                id="q-title"
                type="text"
                name='title'
                placeholder="Be specific and imagine you're asking another developer..."
                value={formData.title}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-input bg-background/60 px-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="q-body" className="block text-sm font-medium text-foreground">
                Content
              </label>
              <textarea
                id="q-body"
                value={formData.content}
                name='content'
                onChange={handleChange}
                rows={6}
                placeholder="Describe your problem in detail. Include what you've tried and what went wrong..."
                className="w-full resize-none rounded-lg border border-input bg-background/60 px-3 py-2.5 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border/60 px-6 py-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="text-muted-foreground cursor-pointer hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="bg-linear-to-r cursor-pointer from-primary to-accent text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {
              isLoading ? (
                <div className='flex items-center gap-1'>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Posting...
                </div>
              ) : (
                "Post Question"
              )
            }
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AskQuestionModal;