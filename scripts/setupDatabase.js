import pkg from 'pg'; // Import the entire pg module
const { Pool } = pkg; // Destructure Pool from the imported module
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const pool = new Pool({
  user: process.env.DB_USER,
  database: 'postgres', // Initial connection to 'postgres'
  password: process.env.DB_PASSWORD,
});

// Helper function to run SQL from a file
const runSQLFile = async (filePath, newPool) => {
  try {
    const sql = await fs.readFile(filePath, 'utf8');
    console.log(`Running SQL file: ${filePath}`);
    await newPool.query(sql);
    console.log(`Successfully ran SQL from ${filePath}`);
  } catch (err) {
    console.error(`Error running SQL file: ${filePath}`, err);
    throw err;
  }
};

// Helper function to retry connection attempts
const retryConnection = async (config, retries = 5, delayMs = 10000) => {
  for (let i = 0; i < retries; i++) {
    try {
      const pool = new Pool(config);
      await pool.query('SELECT 1'); // Test query
      return pool; // Return the successful pool connection
    } catch (err) {
      console.error(`Attempt ${i + 1} to connect to ${config.database} failed.`);
      if (i < retries - 1) {
        console.log(`Retrying in ${delayMs / 1000} seconds...`);
        await new Promise(resolve => setTimeout(resolve, delayMs));
      } else {
        console.error(`Failed to connect to ${config.database} after ${retries} attempts.`);
        throw err;
      }
    }
  }
};

const setupDatabase = async () => {
  try {
    console.log('Starting database setup...');

    // Step 1: Drop the 'empmgr_db' database if it exists, then create it
    console.log('Dropping database empmgr_db if it exists...');
    await pool.query('DROP DATABASE IF EXISTS empmgr_db');
    console.log('Database dropped (if existed).');

    console.log('Creating database empmgr_db...');
    await pool.query('CREATE DATABASE empmgr_db');
    console.log('Database created successfully.');

    // Add a small wait to allow PostgreSQL to register the new database
    console.log('Waiting 5 seconds for the database to initialize...');
    await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 seconds

    // Step 2: Retry connection to the new database with a longer delay
    console.log('Attempting to connect to the new empmgr_db...');
    const empMgrPool = await retryConnection({
      user: process.env.DB_USER,
      database: 'empmgr_db', // Connect to the newly created 'empmgr_db'
      password: process.env.DB_PASSWORD,
    }, 5, 10000);  // Retry 5 times with 10 seconds delay

    // Step 3: Run schema.sql
    const schemaPath = path.join(__dirname, '../db/schema.sql');
    await runSQLFile(schemaPath, empMgrPool);

    // Step 4: Run seeds.sql
    const seedsPath = path.join(__dirname, '../db/seeds.sql');
    await runSQLFile(seedsPath, empMgrPool);

    // Now close both pools
    await pool.end();        // Close the initial connection
    await empMgrPool.end();  // Close the connection to empmgr_db

    console.log('Database setup complete.');
  } catch (err) {
    console.error('Error setting up database:', err);
  }
};

setupDatabase();
