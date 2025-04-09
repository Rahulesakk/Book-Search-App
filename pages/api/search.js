// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from 'fs';
import path from 'path';
import multer from 'multer';



export default async function handler(req, res) {
   if(req.method === 'GET') {
  
      const { search } = req.query;
  
      if (!search) {
        return res.status(400).json({ error: 'Search keyword is required' });
      }
  
      try {
        // Read the books.json file
        const booksPath = path.join(process.cwd(), 'data', 'book.json');
        const books = JSON.parse(fs.readFileSync(booksPath, 'utf-8'));
  
        // Perform case-insensitive search by title
        const results = books.filter(book =>
          book.title.toLowerCase().includes(search.toLowerCase())
        );
  
        return res.status(200).json({ results });
      } catch (error) {
        return res.status(500).json({ error: 'Error reading book data' });
      }
    } else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
}
