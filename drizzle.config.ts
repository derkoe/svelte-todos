export default {
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations/",
  // driver: "better-sqlite",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
};
