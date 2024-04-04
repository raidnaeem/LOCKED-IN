import React from 'react';

function SpotifyUI({
    searchQuery,
    setSearchQuery,
    handleSearch,
    searchResult,
    randomTrack,
    errorMessage,
    handleRandomTrack
}) {
    return (
        <div>
            <h2>Spotify Search</h2>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for a song..."
            />
            <button onClick={() => handleSearch(searchQuery)}>Search</button>
            
            {searchResult && (
                <div>
                    <h3>Search Result:</h3>
                    <pre>{JSON.stringify(searchResult, null, 2)}</pre>
                </div>
            )}

            <h2>Random Track</h2>
            <button onClick={handleRandomTrack}>Get Random Track</button>
            
            {randomTrack && (
                <div>
                    <h3>Random Track:</h3>
                    <pre>{JSON.stringify(randomTrack, null, 2)}</pre>
                </div>
            )}

            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
}

export default SpotifyUI;