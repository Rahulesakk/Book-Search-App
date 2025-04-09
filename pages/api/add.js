// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import fs from 'fs';
import path from 'path';
import multer from 'multer';

export const config = {
  api: {
    bodyParser: false, 
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      // Use multer to handle the file upload
      await runMiddleware(req, res, upload.single('image'));

      const { title, author } = req.body;
      const image = req.file;

      if (!title || !author || !image) {
        return res.status(400).json({ error: 'Missing title, author, or image' });
      }

      // Read and write to JSON file
      const booksPath = path.join(process.cwd(), 'data', 'book.json');
      const books = JSON.parse(fs.readFileSync(booksPath, 'utf-8'));

      const isDuplicate = books.some(book => book.title.toLowerCase() === title.toLowerCase());
      if (isDuplicate) {
        return res.status(409).json({ error: 'Book with this title already exists' });
      }

      const newBook = {
        id: books.length + 1,
        title,
        author,
        image: `/uploads/${image.filename}`,
      };

      books.push(newBook);
      fs.writeFileSync(booksPath, JSON.stringify(books, null, 2));

      res.status(201).json({ message: 'Book added', book: newBook });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ error: 'Error uploading file' });
    }
  }  else {
      return res.status(405).json({ error: 'Method not allowed' });
    }
}
