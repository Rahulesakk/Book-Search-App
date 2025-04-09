import React, { useState } from 'react';
import { toast } from 'react-toastify';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from '@mui/material';

function BookUploadForm() {
  const [author, setAuthor] = useState('');
  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('title', title);
    formData.append('author', author);
    formData.append('image', image);

    try {
      const res = await fetch('/api/add', {
        method: 'POST',
        body: formData,
      });

      const result = await res.json();
      if (res.ok) {
        toast.success('Book added successfully!');
        setImage(null);
        setAuthor('');
        setTitle('');
      } else {
        toast.error(result.error || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Something went wrong');
    }
  };

  return (
    <Box
        sx={{
        backgroundColor: '#c9c6c5',
        minHeight: '100vh',
        padding: '2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        }}
    >
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          Upload a Book
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          encType="multipart/form-data"
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            fullWidth
          />
          <TextField
            label="Author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            fullWidth
          />
          <Button variant="contained" component="label">
            Upload Image
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={(e) => setImage(e.target.files[0])}
              required
            />
          </Button>
          <Button type="submit" variant="contained" color="primary">
            Submit
          </Button>
        </Box>
      </Paper>
    </Container>
    </Box>
  );
}

export default BookUploadForm;
