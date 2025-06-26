#! /usr/bin/env node

const { Client } = require("pg");

// SQL script to create table and insert initial data
const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  text VARCHAR(255),
  username VARCHAR(20),
  added DATE
);

-- Insert initial data only if it doesn't already exist
-- You might want a more sophisticated check for production,
-- but for a simple seed, this is fine.
INSERT INTO messages (text, username, added)
VALUES
  ('This is the first text in my db', 'Jason Statham', '2025-06-26')
ON CONFLICT (id) DO NOTHING; -- Use a primary key or unique constraint for ON CONFLICT
`;

async function main() {
  console.log("Starting database seeding...");
  const connectionString = process.env.DATABASE_URL;

  // Essential check: Ensure the connection string is available
  if (!connectionString) {
    console.error("Error: DATABASE_URL environment variable is not set.");
    console.error("Please ensure your Railway Postgres service is provisioned");
    console.error("and its variables are linked to your application service.");
    process.exit(1); 
  }

  const client = new Client({
    connectionString: connectionString,
    ssl: {
      rejectUnauthorized: false 
    }
  });

  try {
    // Connect to the PostgreSQL database.
    await client.connect();
    console.log("Successfully connected to the database.");

    // Execute the SQL schema and seeding script.
    await client.query(SQL);
    console.log("Database schema created/updated and initial data inserted.");

  } catch (error) {
    console.error("Error during database seeding:", error);
    process.exit(1); // Exit with an error code on failure
  } finally {
    // Always ensure the client connection is ended.
    await client.end();
    console.log("Database connection closed.");
  }
  console.log("Database seeding completed.");
}
