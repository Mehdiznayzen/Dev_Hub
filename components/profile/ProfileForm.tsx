'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProfileCompletion from './ProfileCompletion';
import ProfileSection from './ProfileSection';
import ProfileAvatar from './ProfileAvatar';
import ProfileBio from './ProfileBio';
import RoleSelector from './RoleSelector';
import ExperienceSelector from './ExperienceSelector';
import SkillTags from './SkillTags';
import SocialLinks from './SocialLinks';
import { CustomInput } from './CustomInput';
import { useUser } from '@clerk/nextjs';
import { useState } from 'react';
import axios from "axios";
import { useRouter } from 'next/navigation';

interface ProfileFormProps {
    disabled: boolean;
    avatarUrl: string | null;
    setAvatarUrl: (url: string | null) => void;
    fullName: string;
    setFullName: (name: string) => void;
    bio: string;
    setBio: (bio: string) => void;
    role: string;
    setRole: (role: string) => void;
    experience: string;
    setExperience: (experience: string) => void;
    skills: string[];
    setSkills: (skills: string[]) => void;
    location: string;
    setLocation: (location: string) => void;
    website: string;
    setWebsite: (website: string) => void;
    github: string;
    setGithub: (github: string) => void;
    linkedin: string;
    setLinkedin: (linkedin: string) => void;
};

const ProfileForm = ({ disabled, avatarUrl, setAvatarUrl, fullName, setFullName, bio, setBio, role, setRole, experience, setExperience, skills, setSkills, location, setLocation, website, setWebsite, github, setGithub, linkedin, setLinkedin }: ProfileFormProps) => {
    const { user } = useUser();
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const completion = [
        { value: setAvatarUrl, weight: 15 },
        { value: fullName, weight: 15 },
        { value: bio, weight: 15 },
        { value: role, weight: 15 },
        { value: experience, weight: 10 },
        { value: skills.length > 0, weight: 15 },
        { value: location, weight: 5 },
        { value: github, weight: 5 },
        { value: linkedin, weight: 3 },
        { value: website, weight: 2 },
    ];

    const completionPercent = completion.reduce((total, field) => total + (field.value ? field.weight : 0), 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try{
            const response = await axios.post(process.env.NEXT_PUBLIC_API_ADD_PROFILE!, {
                avatarUrl,
                fullName,
                bio,
                role,
                experience,
                skills,
                location,
                website,
                github,
                linkedin,
            });

            if(response.status === 200){
                router.push(`/dashboard/${response.data.profile.userId}`);
            }

            const data = await response.data;
            console.log('Response from server:', data);
        }catch(error){
            console.error('Error submitting profile:', error);
        }finally{
            setIsLoading(false);
        }
    }

    return (
        <div className="rounded-2xl border border-border/70 bg-card/60 p-6 shadow-2xl backdrop-blur-xl sm:p-8">
            <ProfileCompletion percent={completionPercent} />

            <div className="mt-8 space-y-10">
                <ProfileSection
                    title="About you"
                    description="Introduce yourself to the DevHub community."
                >
                    <div className="space-y-5">
                        <ProfileAvatar 
                            setAvatarUrl={setAvatarUrl}
                        />
                        <CustomInput
                            label="Full name"
                            placeholder="Your full name"
                            autoComplete="name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                        />
                        <CustomInput
                            label="Username"
                            leadingText="@"
                            placeholder={user?.username || 'username'}
                            hint="This will be your public handle on DevHub."
                            autoComplete="username"
                            readOnly
                        />
                        <ProfileBio
                            bio={bio}
                            setBio={setBio}
                        />
                    </div>
                </ProfileSection>

                <ProfileSection
                    title="Developer profile"
                    description="Help other developers discover what you do."
                >
                    <div className="space-y-5">
                        <RoleSelector
                            role={role}
                            setRole={setRole}
                        />
                        <ExperienceSelector
                            experience={experience}
                            setExperience={setExperience}
                        />
                        <SkillTags 
                            skills={skills}
                            setSkills={setSkills}
                        />
                    </div>
                </ProfileSection>

                <ProfileSection
                    title="More about you"
                    description="Add your location and social links."
                >
                    <SocialLinks 
                        location={location}
                        setLocation={setLocation}
                        website={website}
                        setWebsite={setWebsite}
                        github={github}
                        setGithub={setGithub}
                        linkedin={linkedin}
                        setLinkedin={setLinkedin}
                    />
                </ProfileSection>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                <Link
                    href={`/dashboard/${user?.id}`}
                    className="text-center text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                    Skip for now
                </Link>
                <Button
                    type="submit"
                    className="group cursor-pointer h-11 bg-linear-to-r from-primary to-accent text-white shadow-lg shadow-primary/25 transition-all duration-300 hover:shadow-primary/40 hover:brightness-110 sm:px-8"
                    onClick={handleSubmit}
                    disabled={disabled || isLoading}
                >
                    {
                        isLoading ? (
                            <>
                                <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                Saving...
                            </>
                        ) : (
                            <>
                                Complete Profile
                                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                            </>
                        )
                    }
                    
                </Button>
            </div>
        </div>
    );
}

export default ProfileForm;