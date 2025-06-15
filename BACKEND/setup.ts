import { connectToDatabase, checkDatabaseConnection } from './db.ts';
import { createUsersTable, createProductsTable } from './schema.ts';
import dotenv from 'dotenv';

dotenv.config();

const DATABASE_URI = process.env.POSTGRES_URI;  // Your PostgreSQL URI
console.log('Setting up database with URI:', DATABASE_URI);  // Log the database URI
console.log('Current NODE_ENV:', process.env.NODE_ENV);

const setupDatabase = async () => {
  if (!DATABASE_URI) {
    console.error('Database URI is not defined in environment variables.');
    process.exit(1);  // Exit if no database URI is provided
  }

  const isConnected = await checkDatabaseConnection(DATABASE_URI);  // Check connection to the database

  if (!isConnected) {
    console.error('Exiting setup due to connection failure.');
    process.exit(1);  // Exit if database connection fails
  }

  const pool = connectToDatabase(DATABASE_URI);  // Get the connection pool

  try {
    console.log('Creating necessary tables...');
    // Create tables defined in schema.ts
    await pool.query(createUsersTable);
    await pool.query(createProductsTable);
    console.log('Tables created successfully.');
  } catch (err) {
    console.error('Error creating tables:', err);
    process.exit(1);  // Exit if table creation fails
  } finally {
    pool.end();  // Close the connection pool
  }
};

setupDatabase();  // Run the setup process
