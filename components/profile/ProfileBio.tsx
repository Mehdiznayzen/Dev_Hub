'use client';

import { useState } from 'react';

const MAX = 160;

const ProfileBio = ({ bio, setBio }: { bio: string; setBio: (bio: string) => void }) => {
  const [count, setCount] = useState(0);

  return (
    <div className="space-y-2">
      <label htmlFor="bio" className="block text-sm font-medium text-foreground">
        Bio
      </label>
      <textarea
        id="bio"
        rows={4}
        maxLength={MAX}
        placeholder="Tell the community about yourself..."
        onChange={(e) => setCount(e.target.value.length)}
        value={bio}
        onInput={(e) => setBio((e.target as HTMLTextAreaElement).value)}
        className="flex w-full resize-none rounded-lg border border-input bg-background/60 px-3 py-2.5 text-sm text-foreground ring-offset-background transition-colors placeholder:text-muted-foreground focus-visible:border-primary/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
      />
      <div className="flex justify-end">
        <span className="text-xs text-muted-foreground">
          {count} / {MAX}
        </span>
      </div>
    </div>
  );
}

export default ProfileBio;