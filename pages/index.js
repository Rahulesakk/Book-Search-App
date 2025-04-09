import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';
import {
  Box,
  Container,
  TextField,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
  CircularProgress,
} from '@mui/material';

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    if (!query.trim()) return;
    setLoading(true);

    try {
      const res = await axios.get(`/api/search?search=${query}`);
      setResults(res.data.results || []);
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = (book) => {
    router.push(
      {
        pathname: `/book/${book.id}`,
        query: {
          id: book.id,
          title: book.title,
          author: book.author,
          image: book.image,
        },
      },
      `/book/${book.id}`
    );
  };

  return (
    <Box
      sx={{
        backgroundColor: '#c9c6c5',
        minHeight: '100vh',
        py: 4,
        color: 'white',
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom color="black">
            Sample Book Search App
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <TextField
              fullWidth
              label="Search a Book"
              variant="outlined"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              InputLabelProps={{ style: { color: 'black' } }}
              InputProps={{ style: { color: 'black' } }}
            />
            <Button variant="contained" onClick={handleSearch}>
              Search
            </Button>
          </Box>

          {loading && (
            <Box display="flex" justifyContent="center" mt={2}>
              <CircularProgress color="primary" />
            </Box>
          )}

          {!loading && results.length === 0 && query.trim() && (
            <Typography variant="body1" color="text.secondary" align="center">
              No search results found.
            </Typography>
          )}

          <List>
            {results.map((book, index) => (
              <ListItem
                key={index}
                button
                onClick={() => handleBook(book)}
                sx={{ borderBottom: '1px solid #333' }}
              >
                <ListItemText
                  primary={book.title}
                  secondary={`Author: ${book.author}`}
                  primaryTypographyProps={{ color: 'black', fontWeight: 'bold' }}
                  secondaryTypographyProps={{ color: '#ccc' }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
}
