/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./utils/schema.js",
  dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://ai-interviewer_owner:e0DZaQh5SBqV@ep-dry-cake-a23t1xq0.eu-central-1.aws.neon.tech/ai-interviewer?sslmode=require',
    }
  };
  