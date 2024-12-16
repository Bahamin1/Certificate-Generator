import pkg from '@vercel/postgres';
const { sql } = pkg;

async function setupDatabase() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS certificates (
        id SERIAL PRIMARY KEY,
        certificate_number VARCHAR(255) UNIQUE NOT NULL,
        recipient_name VARCHAR(255) NOT NULL,
        certificate_type VARCHAR(50) NOT NULL,
        course_name VARCHAR(255) NOT NULL,
        date_issued DATE NOT NULL,
        issuing_authority VARCHAR(255) NOT NULL
      );
    `;
    console.log('Database setup completed successfully');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    process.exit(0);
  }
}

setupDatabase();

