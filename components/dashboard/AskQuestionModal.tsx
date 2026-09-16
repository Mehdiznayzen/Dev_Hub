"use client";

import { useEffect, useState } from "react";
import { X, Sparkles, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomInput } from "../profile/CustomInput";
import axios from "axios";
import { toast } from "sonner";

interface TagProps {
  id: number;
  name: string;
  description: string | null;
}

const AskQuestionModal = ({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const [tags, setTags] = useState<TagProps[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [isTagsLoading, setIsTagsLoading] = useState(false);

  console.log(process.env.NEXT_PUBLIC_API_CREATE_QUESTION!)

  useEffect(() => {
    if (!open) return;

    const fetchTags = async () => {
      try {
        setIsTagsLoading(true);

        const response = await axios.get(
          process.env.NEXT_PUBLIC_API_GET_ALL_TAG!
        );

        setTags(response.data.tags ?? []);
      } catch (error) {
        console.error("Error fetching tags:", error);
        toast.error("Failed to load tags");
      } finally {
        setIsTagsLoading(false);
      }
    };

    fetchTags();
  }, [open]);

  // =========================
  // SELECT / UNSELECT TAG
  // =========================
  const toggleTag = (tagId: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  // =========================
  // INPUT CHANGE
  // =========================
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================
  // CREATE QUESTION
  // =========================
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.title.trim()) {
      toast.error("Question title is required");
      return;
    }

    if (!formData.content.trim()) {
      toast.error("Question content is required");
      return;
    }

    if (selectedTagIds.length === 0) {
      toast.error("Please select at least one tag");
      return;
    }

    try {
      setIsLoading(true);

      const response = await axios.post(process.env.NEXT_PUBLIC_API_CREATE_QUESTION!,
        {
          title: formData.title.trim(),
          content: formData.content.trim(),
          tagIds: selectedTagIds,
        }
      );

      if (response.status === 201) {
        toast.success("Question created successfully");

        // Reset form
        setFormData({
          title: "",
          content: "",
        });

        setSelectedTagIds([]);

        onClose();
      }
    } catch (error) {
      console.error("Error creating question:", error);

      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.error ||
          "Failed to create question";

        toast.error(message);
      } else {
        toast.error("Failed to create question");
      }
    } finally {
      setIsLoading(false);
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

            <h2
              id="ask-question-title"
              className="text-lg font-semibold text-foreground"
            >
              Ask a Question
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[70vh] overflow-y-auto px-6 py-5">
          <div className="space-y-5">

            {/* Title */}
            <div className="space-y-2">
              <CustomInput
                label="Title"
                id="q-title"
                type="text"
                name="title"
                placeholder="Be specific and imagine you're asking another developer..."
                value={formData.title}
                onChange={handleChange}
                className="h-11 w-full rounded-lg border border-input bg-background/60 px-3 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label
                htmlFor="q-body"
                className="block text-sm font-medium text-foreground"
              >
                Content
              </label>

              <textarea
                id="q-body"
                value={formData.content}
                name="content"
                onChange={handleChange}
                rows={6}
                placeholder="Describe your problem in detail. Include what you've tried and what went wrong..."
                className="w-full resize-none rounded-lg border border-input bg-background/60 px-3 py-2.5 text-sm text-foreground ring-offset-background placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-foreground">
                Tags
              </label>

              <p className="text-xs text-muted-foreground">
                Select one or more tags related to your question.
              </p>

              {isTagsLoading ? (
                <div className="flex items-center gap-2 py-3 text-sm text-muted-foreground">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Loading tags...
                </div>
              ) : tags.length === 0 ? (
                <p className="py-3 text-sm text-muted-foreground">
                  No tags available.
                </p>
              ) : (
                <div className="flex flex-wrap gap-2 pt-1">
                  {tags.map((tag) => {
                    const isSelected = selectedTagIds.includes(tag.id);

                    return (
                      <button
                        key={tag.id}
                        type="button"
                        onClick={() => toggleTag(tag.id)}
                        className={`rounded-md border px-3 py-1.5 text-xs font-medium transition-all ${
                          isSelected
                            ? "border-primary bg-primary/15 text-primary"
                            : "border-border/70 bg-secondary/50 text-foreground/80 hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        {isSelected && "✓ "}
                        {tag.name}
                      </button>
                    );
                  })}
                </div>
              )}

              {selectedTagIds.length > 0 && (
                <p className="text-xs text-muted-foreground">
                  {selectedTagIds.length} tag
                  {selectedTagIds.length > 1 ? "s" : ""} selected
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-border/60 px-6 py-4">

          <Button
            type="button"
            variant="ghost"
            onClick={onClose}
            disabled={isLoading}
            className="cursor-pointer text-muted-foreground hover:text-foreground"
          >
            Cancel
          </Button>

          <Button
            type="button"
            onClick={handleSubmit}
            disabled={
              isLoading ||
              !formData.title.trim() ||
              !formData.content.trim() ||
              selectedTagIds.length === 0
            }
            className="cursor-pointer bg-linear-to-r from-primary to-accent text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:shadow-primary/40 hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isLoading ? (
              <div className="flex items-center gap-1">
                <Loader2 className="h-4 w-4 animate-spin" />
                Posting...
              </div>
            ) : (
              "Post Question"
            )}
          </Button>

        </div>
      </div>
    </div>
  );
};

export default AskQuestionModal;