import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: text('id').primaryKey(),
  clerkUserId: text('clerk_user_id').notNull().unique(),
  email: varchar('email', { length: 255 }).notNull().unique(),
  username: varchar('username', { length: 100 }),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const profiles = pgTable('profiles', {
  id: text('id').primaryKey(),
  userId: text('user_id').notNull().unique(),
  fullName: varchar('full_name', { length: 255 }),
  avatarUrl: text('avatar_url'),
  bio: text('bio'),
  role: varchar('role', { length: 100 }),
  experience: varchar('experience', { length: 100 }),
  location: varchar('location', { length: 255 }),
  github: text('github'),
  linkedin: text('linkedin'),
  website: text('website'),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
});

export const skills = pgTable("skills", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const profileSkills = pgTable('profile_skills',{
    profileId: text('profile_id').notNull().references(() => profiles.id, { onDelete: 'cascade' }),
    skillId: text('skill_id').notNull().references(() => skills.id, { onDelete: 'cascade' }),
    createdAt: timestamp('created_at').defaultNow().notNull(),
  },
  (table) => [
    primaryKey({
      columns: [table.profileId, table.skillId],
    }),
  ]
);