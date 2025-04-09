import React from 'react';
import { useRouter } from 'next/router';
import books from '../../data/book.json';
import Image from 'next/image';
import {
  Box,
  Container,
  Typography,
  Paper,
} from '@mui/material';

function BookDetail() {
  const router = useRouter();
  const { id } = router.query;

  const selectedBook = books.find((book) => book.id == id);

  return (
    <Box sx={{ backgroundColor: '#c9c6c5', minHeight: '100vh', py: 6 }}>
      <Container maxWidth={false} sx={{ maxWidth: 500, borderRadius: '16px'  }}>
        <Paper elevation={9} sx={{ p: 4, backgroundColor: '#white', color: '#fff', textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom sx={{color:"black"}} >
            Specfic a Book Details
          </Typography>
          {selectedBook ? (
            <>
              <Box sx={{ mb: 4 }}> 
                <Image
                  src={selectedBook.image}
                  alt={selectedBook.title}
                  width={200}
                  height={200}
                  style={{ objectFit: 'cover', borderRadius: '12px' }}
                />
              </Box>
              <Typography variant="h5" gutterBottom color='black'>
                {selectedBook.title}
              </Typography>
              <Typography variant="subtitle1" color="#474443">
                {selectedBook.author}
              </Typography>
            </>
          ) : (
            <Typography variant="h6">Book not found</Typography>
          )}
        </Paper>
      </Container>
    </Box>
  );
}

export default BookDetail;
