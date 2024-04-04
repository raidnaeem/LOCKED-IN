const express = require('express');
const { spotifyLogin, spotifyCallback, spotifySearch, spotifyRandomTrack } = require('./api/spotify');

const app = express();

app.get('/api/spotify/login', (req, res) => {
  const scope = 'user-read-private user-read-email';
  const redirect_uri = process.env.SPOTIFY_REDIRECT_URI;
  res.redirect(spotifyLogin(redirect_uri, process.env.SPOTIFY_CLIENT_ID, scope));
});

app.get('/api/spotify/callback', async (req, res) => {
  const code = req.query.code || null;
  try {
    const data = await spotifyCallback(code, process.env.SPOTIFY_CLIENT_ID, process.env.SPOTIFY_CLIENT_SECRET, process.env.SPOTIFY_REDIRECT_URI);
    if (data.access_token) {
      res.redirect('/frontend/path');
    } else {
      res.redirect('/#/error');
    }
  } catch (error) {
    console.error('Error during token exchange', error);
    res.redirect('/#/error');
  }
});

app.get('/api/spotify/search', async (req, res) => {
  try {
    const token = await getSpotifyAccessToken(); // You need to implement getSpotifyAccessToken function
    const { query, type } = req.query;
    const data = await spotifySearch(token, query, type);
    res.json(data);
  } catch (error) {
    console.error('Spotify Search API error:', error);
    res.status(500).json({ error: 'Failed to search Spotify.' });
  }
});

app.get('/api/spotify/random-track', async (req, res) => {
  try {
    const token = await getSpotifyAccessToken(); // You need to implement getSpotifyAccessToken function
    const { genre } = req.query;
    const track = await spotifyRandomTrack(token, genre);
    res.json(track);
  } catch (error) {
    console.error('Spotify Random Track API error:', error);
    res.status(500).json({ error: 'Failed to fetch random track from Spotify.' });
  }
});

module.exports = app;