'use client';

import { Globe, MapPin } from 'lucide-react';
import { SiGithub } from "react-icons/si";
import { FaLinkedin } from "react-icons/fa6";
import { CustomInput } from './CustomInput';

interface SocialLinksProps {
  location?: string;
  setLocation?: (location: string) => void;
  website?: string;
  setWebsite?: (website: string) => void;
  github?: string;
  setGithub?: (github: string) => void;
  linkedin?: string;
  setLinkedin?: (linkedin: string) => void;
}

const SocialLinks = ({ location, setLocation, website, setWebsite, github, setGithub, linkedin, setLinkedin }: SocialLinksProps) => {
  return (
    <div className="space-y-4">
      <CustomInput
        label="Location"
        placeholder="Casablanca, Morocco"
        icon={MapPin}
        value={location}
        onChange={(e) => setLocation?.(e.target.value)}
      />
      <CustomInput
        label="Website"
        placeholder="https://yourwebsite.com"
        icon={Globe}
        autoComplete="url"
        value={website}
        onChange={(e) => setWebsite?.(e.target.value)}
      />
      <CustomInput
        label="GitHub"
        placeholder="github.com/username"
        icon={SiGithub}
        autoComplete="url"
        value={github}
        onChange={(e) => setGithub?.(e.target.value)}
      />
      <CustomInput
        label="LinkedIn"
        placeholder="linkedin.com/in/username"
        icon={FaLinkedin}
        autoComplete="url"
        value={linkedin}
        onChange={(e) => setLinkedin?.(e.target.value)}
      />
    </div>
  );
}

export default SocialLinks;