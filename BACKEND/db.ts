import { Pool } from 'pg';  // Import the Pool class from the pg library

let pool: Pool;

export const connectToDatabase = (connectionString: string) => {
  // Create a new Pool only if one doesn't already exist
  if (!pool) {
    pool = new Pool({
      connectionString,  // The connection string to your PostgreSQL database
      ssl: process.env.NODE_ENV === 'production', // Enable SSL in production environments (useful for Heroku, for example)
    });
  }
  return pool;
};

export const checkDatabaseConnection = async (connectionString: string) => {
  const client = new Pool({
    connectionString,
    ssl: process.env.NODE_ENV === 'production', // Add SSL support in production
  });

  try {
    await client.connect();  // Connect to the database
    console.log('Connected to PostgreSQL database successfully!');
    return true;
  } catch (err) {
    console.error('Error connecting to PostgreSQL database:', err);
    return false;
  } finally {
    client.end();  // Close the client connection when done
  }
};
