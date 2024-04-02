// Import necessary modules
const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

// SpotifyAccessToken 
async function getSpotifyAccessToken() {
  const response = await fetch('https://accounts.spotify.com/api/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + (new Buffer.from(process.env.SPOTIFY_CLIENT_ID + ':' + process.env.SPOTIFY_CLIENT_SECRET).toString('base64'))
    },
    body: 'grant_type=client_credentials'
  });

  const data = await response.json();
  return data.access_token;
}

// Express Route for Spotify Search
router.get('/search', async (req, res) => {
  const { query, type } = req.query;
  try {
    const token = await getSpotifyAccessToken();
    const searchUrl = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=${type}&market=US&limit=10`;

    const response = await fetch(searchUrl, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token
      }
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Spotify Search API error:', error);
    res.status(500).json({ error: 'Failed to search Spotify.' });
  }
});

// React Component for Search Bar
function SearchBar({ onSearch }) {
  const [query, setQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <input 
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for a song"
      />
      <button type="submit">Search</button>
    </form>
  );
}

// React Component to Display Search Results
function SearchResults({ results }) {
  return (
    <div>
      <h2>Search Results</h2>
      <ul>
        {results.map((result, index) => (
          <li key={index}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

// React Container Component to Manage State and API Requests
function SpotifySearch() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (query) => {
    try {
      const response = await fetch(`/api/spotify/search?query=${encodeURIComponent(query)}&type=track`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.tracks.items); // Assuming data structure from Spotify API
      } else {
        console.error('Failed to fetch search results');
      }
    } catch (error) {
      console.error('Error searching for songs:', error);
    }
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} />
      <SearchResults results={searchResults} />
    </div>
  );
}

module.exports = router;