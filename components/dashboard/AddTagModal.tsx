"use client";

import axios from 'axios';
import { Loader2, Sparkles, X } from 'lucide-react';
import { useState } from 'react';
import { CustomInput } from '../profile/CustomInput';
import { Button } from '../ui/button';
import { toast } from 'sonner';

interface AddTagModalModalProps {
    open: boolean; 
    onClose: () => void;
}

const AddTagModal = ({ onClose, open }: AddTagModalModalProps) => {
  const [formData, setFormData] = useState({ name: "", description: "" });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isFormValid = formData.name.trim().length > 0 && formData.description.trim().length > 0;

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
      const response = await axios.post(process.env.NEXT_PUBLIC_API_CREATE_TAG!, {
        name: formData.name,
        description: formData.description
      });

      if(response.data.tag.success){
        onClose();
      }

      const data = await response.data;
      console.log('Response from server:', data);
    } catch (error: any) {
      console.error("Error creating tag:", error); 

      if (error.response?.status === 409) { 
        toast.error("This tag already exists"); 
      } else if (error.response?.status === 401) { 
        toast.error("You must be authenticated"); 
      } else if (error.response?.data?.error) { 
        toast.error(error.response.data.error); 
      } else { 
        toast.error("Failed to create tag"); 
      }
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-60 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ask-tag-title"
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
            <h2 id="ask-tag-title" className="text-lg font-semibold text-foreground">
              Add new Tag
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
                label='Name'
                id="q-title"
                type="text"
                name='name'
                placeholder="Be specific and imagine you're asking another developer..."
                value={formData.name}
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
                value={formData.description}
                name='description'
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
            disabled={isLoading || !isFormValid}
            className="bg-linear-to-r cursor-pointer from-primary to-accent text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {
              isLoading ? (
                <div className='flex items-center gap-1'>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Posting...
                </div>
              ) : (
                "Post Tag"
              )
            }
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AddTagModal