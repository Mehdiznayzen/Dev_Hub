'use client';

import { availableSkills } from '@/constants';
import { Plus, X } from 'lucide-react';
import { useState } from 'react';

interface SkillTagsProps {
  skills: string[];
  setSkills: (skills: string[]) => void;
}

const SkillTags = ({ skills, setSkills }: SkillTagsProps) => {
  const [showSkills, setShowSkills] = useState(false);

  const addSkill = (skill: string) => {
    if (skills.includes(skill)) {
      return;
    }

    setSkills([...skills, skill]);
  };

  const removeSkill = (skillToRemove: string) => {
    setSkills(
      skills.filter((skill) => skill !== skillToRemove)
    );
  };

  const availableToAdd = availableSkills.filter(
    (skill) => !skills.includes(skill)
  );

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-foreground">
        Your skills
      </label>

      {/* Selected skills */}
      <div className="flex flex-wrap items-center gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="
              group
              inline-flex
              items-center
              gap-1.5
              rounded-lg
              border
              border-primary/30
              bg-primary/10
              px-2.5
              py-1.5
              text-sm
              font-medium
              text-foreground
              transition-colors
              hover:border-primary/50
            "
          >
            {skill}

            <button
              type="button"
              onClick={() => removeSkill(skill)}
              aria-label={`Remove ${skill}`}
              className="
                text-muted-foreground
                transition-colors
                hover:text-destructive
              "
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </span>
        ))}

        {/* Add skill button */}
        <button
          type="button"
          onClick={() => setShowSkills((prev) => !prev)}
          className="
            inline-flex
            items-center
            gap-1
            rounded-lg
            border
            border-dashed
            border-border/70
            bg-transparent
            px-2.5
            py-1.5
            text-sm
            font-medium
            text-muted-foreground
            transition-colors
            hover:border-primary/50
            hover:text-primary
          "
        >
          <Plus className="h-3.5 w-3.5" />
          Add skill
        </button>
      </div>

      {/* Skills selector */}
      {showSkills && availableToAdd.length > 0 && (
        <div
          className="
            rounded-xl
            border
            border-border/70
            bg-secondary/30
            p-3
          "
        >
          <p className="mb-3 text-xs text-muted-foreground">
            Select your skills
          </p>

          <div className="flex flex-wrap gap-2">
            {availableToAdd.map((skill) => (
              <button
                key={skill}
                type="button"
                onClick={() => addSkill(skill)}
                className="
                  rounded-lg
                  border
                  border-border/70
                  bg-background/50
                  px-3
                  py-1.5
                  text-xs
                  font-medium
                  text-muted-foreground
                  transition-all
                  hover:border-primary/50
                  hover:bg-primary/10
                  hover:text-primary
                "
              >
                + {skill}
              </button>
            ))}
          </div>
        </div>
      )}

      {skills.length === 0 && (
        <p className="text-xs text-muted-foreground">
          Add the technologies and tools you work with.
        </p>
      )}
    </div>
  );
};

export default SkillTags;