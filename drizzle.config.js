/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: 'postgresql://Interview-ai_owner:oSGxB3HnceX5@ep-young-fire-a5cpjhsp.us-east-2.aws.neon.tech/Interview-ai?sslmode=require',
    }
  };