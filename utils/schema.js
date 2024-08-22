import { pgTable, serial, text, varchar, timestamp } from "drizzle-orm/pg-core";

// MockInterview Table
export const MockInterview = pgTable('mock_interview', {
    id: serial('id').primaryKey(),
    mockId: varchar('mock_id').notNull().unique(),  // Make this unique
    jsonMockResp: text('json_mock_resp').notNull(),
    jobPosition: varchar('job_position', { length: 255 }).notNull(),
    jobDesc: text('job_desc').notNull(),  // Changed to text for potentially longer descriptions
    jobExperience: varchar('job_experience', { length: 255 }).notNull(),
    createdBy: varchar('created_by', { length: 255 }).notNull(),
    createdAt: timestamp('created_at').defaultNow(),
});

// UserAnswer Table with Foreign Key to MockInterview
export const UserAnswer = pgTable('user_answer', {
    id: serial('id').primaryKey(),
    mockIdRef: varchar('mock_id_ref')
        .notNull()
        .references(() => MockInterview.mockId),
    question: text('question').notNull(),  // Changed to text for potentially longer questions
    correctAns: text('correct_ans'),
    userAns: text('user_ans'),
    feedback: text('feedback'),
    rating: varchar('rating', { length: 50 }),
    userEmail: varchar('user_email', { length: 255 }),
    createdAt: timestamp('created_at').defaultNow(),
});