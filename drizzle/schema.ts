import { relations } from "drizzle-orm";
import {
  pgTable,
  primaryKey,
  text,
  timestamp,
  varchar,
  integer,
  boolean,
  serial,
} from "drizzle-orm/pg-core";

/* =========================
   USERS
========================= */

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  clerkUserId: text("clerk_user_id").notNull().unique(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  username: varchar("username", { length: 100 }),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* =========================
   PROFILES
========================= */

export const profiles = pgTable("profiles", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().unique().references(() => users.id, { onDelete: "cascade" }),
  fullName: varchar("full_name", { length: 255 }),
  avatarUrl: text("avatar_url"),
  bio: text("bio"),
  role: varchar("role", { length: 100 }),
  experience: varchar("experience", { length: 100 }),
  location: varchar("location", { length: 255 }),
  github: text("github"),
  linkedin: text("linkedin"),
  website: text("website"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* =========================
   SKILLS
========================= */
export const skills = pgTable("skills", {
  id: text("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

/* =========================
   PROFILE SKILLS
========================= */
export const profileSkills = pgTable("profile_skills", {
    profileId: text("profile_id").notNull().references(() => profiles.id, { onDelete: "cascade" }),
    skillId: text("skill_id").notNull().references(() => skills.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  }, (table) => [
    primaryKey({
      columns: [table.profileId, table.skillId],
    }),
  ]
);

/* =========================
   QUESTIONS
========================= */

export const questions = pgTable("questions", {
  id: text("id").primaryKey(),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  title: varchar("title", { length: 255 }).notNull(),
  content: text("content").notNull(),
  views: integer("views").default(0).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

/* =========================
   ANSWERS
========================= */
export const answers = pgTable("answers", {
  id: text("id").primaryKey(),
  questionId: text("question_id").notNull().references(() => questions.id, { onDelete: "cascade" }),
  userId: text("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  content: text("content").notNull(),
  isAccepted: boolean("is_accepted").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const tags = pgTable("tags", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length : 50 }).notNull().unique(),
  description: text("description"),
  createdAt: timestamp("created_at").defaultNow().notNull()
});

export const questionTags = pgTable(
  "question_tags",
  {
    questionId: text("question_id")
      .notNull()
      .references(() => questions.id, { onDelete: "cascade" }),

    tagId: integer("tag_id")
      .notNull()
      .references(() => tags.id, { onDelete: "cascade" }),
  },
  (table) => ({
    pk: primaryKey({
      columns: [table.questionId, table.tagId],
    }),
  })
);

/* =========================
   USERS RELATIONS
========================= */

export const usersRelations = relations(
  users,
  ({ one, many }) => ({
    profile: one(profiles),

    questions: many(questions),

    answers: many(answers),
  })
);

/* =========================
   PROFILES RELATIONS
========================= */

export const profilesRelations = relations(
  profiles,
  ({ one, many }) => ({
    user: one(users, {
      fields: [profiles.userId],
      references: [users.id],
    }),

    profileSkills: many(profileSkills),
  })
);

/* =========================
   PROFILE SKILLS RELATIONS
========================= */

export const profileSkillsRelations = relations(
  profileSkills,
  ({ one }) => ({
    profile: one(profiles, {
      fields: [profileSkills.profileId],
      references: [profiles.id],
    }),

    skill: one(skills, {
      fields: [profileSkills.skillId],
      references: [skills.id],
    }),
  })
);

/* =========================
   SKILLS RELATIONS
========================= */

export const skillsRelations = relations(
  skills,
  ({ many }) => ({
    profileSkills: many(profileSkills),
  })
);

/* =========================
   QUESTIONS RELATIONS
========================= */

export const questionsRelations = relations(
  questions,
  ({ one, many }) => ({
    user: one(users, {
      fields: [questions.userId],
      references: [users.id],
    }),

    answers: many(answers),

    questionTags: many(questionTags),
  })
);

/* =========================
   ANSWERS RELATIONS
========================= */

export const answersRelations = relations(
  answers,
  ({ one }) => ({
    question: one(questions, {
      fields: [answers.questionId],
      references: [questions.id],
    }),

    user: one(users, {
      fields: [answers.userId],
      references: [users.id],
    }),
  })
);

/* =========================
   TAGS RELATIONS
========================= */
export const tagsRelations = relations(
  tags,
  ({ many }) => ({
    questionTags: many(questionTags),
  })
);

/* =========================
   QUESTION TAGS RELATIONS
========================= */
export const questionTagsRelations = relations(
  questionTags,
  ({ one }) => ({
    question: one(questions, {
      fields: [questionTags.questionId],
      references: [questions.id],
    }),

    tag: one(tags, {
      fields: [questionTags.tagId],
      references: [tags.id],
    }),
  })
);