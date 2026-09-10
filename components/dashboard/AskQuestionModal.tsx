'use client';

import { useState } from 'react';
import { Plus, X, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { popularTags } from '@/data';

const AskQuestionModal = ({ open, onClose }: { open: boolean; onClose: () => void; }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState('');

  const addTag = (tag: string) => {
    const clean = tag.trim().toLowerCase();
    if (clean && !tags.includes(clean)) {
      setTags((prev) => [...prev, clean]);
    }
    setTagInput('');
  };

  const removeTag = (tag: string) => {
    setTags((prev) => prev.filter((t) => t !== tag));
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag(tagInput);
    }
  };

  if (!open) return null;

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
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          <div className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="q-title" className="block text-sm font-medium text-foreground">
                Title
              </label>
              <input
                id="q-title"
                type="text"
                placeholder="Be specific and imagine you're asking another developer..."
                className="h-11 w-full rounded-lg border border-input bg-background/60 px-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="q-body" className="block text-sm font-medium text-foreground">
                Body
              </label>
              <textarea
                id="q-body"
                rows={6}
                placeholder="Describe your problem in detail. Include what you've tried and what went wrong..."
                className="w-full resize-none rounded-lg border border-input bg-background/60 px-3 py-2.5 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>

            {/* Tags with add button */}
            <div className="space-y-2">
              <label htmlFor="q-tag" className="block text-sm font-medium text-foreground">
                Tags
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    id="q-tag"
                    type="text"
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a tag and press Enter..."
                    className="h-11 w-full rounded-lg border border-input bg-background/60 px-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
                  />
                </div>
                <Button
                  type="button"
                  onClick={() => addTag(tagInput)}
                  variant="outline"
                  className="h-11 border-border/70 bg-secondary/40 hover:bg-secondary/70"
                >
                  <Plus className="h-4 w-4" />
                  Add
                </Button>
              </div>

              {/* Selected tags */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center gap-1 rounded-md border border-primary/40 bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary"
                    >
                      {tag}
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        aria-label={`Remove ${tag}`}
                        className="text-primary/70 transition-colors hover:text-primary"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Suggested tags */}
              <div className="pt-1">
                <p className="text-xs text-muted-foreground">Suggested:</p>
                <div className="mt-1.5 flex flex-wrap gap-1.5">
                  {popularTags
                    .filter((t) => !tags.includes(t))
                    .map((tag) => (
                      <button
                        key={tag}
                        type="button"
                        onClick={() => addTag(tag)}
                        className="rounded-md border border-border/70 bg-secondary/40 px-2 py-0.5 text-xs font-medium text-foreground/80 transition-colors hover:border-primary/40 hover:text-foreground"
                      >
                        + {tag}
                      </button>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border/60 px-6 py-4">
          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            className="text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>
          <Button
            type="button"
            onClick={onClose}
            className="bg-linear-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 hover:brightness-110"
          >
            Post Question
          </Button>
        </div>
      </div>
    </div>
  );
}

export default AskQuestionModal;