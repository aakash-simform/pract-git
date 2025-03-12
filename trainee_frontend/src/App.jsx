import React, { useState } from 'react';

const App = () => {
  const [joke, setJoke] = useState(null); // Initially null, so we can handle loading state
  const [loading, setLoading] = useState(false); // State to handle loading state when fetching

  const fetchJoke = async () => {
    setLoading(true); // Set loading to true when fetching starts
    try {
      const response = await fetch('http://172.16.6.88:3000/joke');
      const data = await response.json();
      setJoke(data.joke); // Assuming 'joke' is the field in the response
    } catch (error) {
      console.error('Error fetching joke:', error);
      setJoke("Failed to load joke.");
    } finally {
      setLoading(false); // Set loading to false after fetching is done
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.jokeContainer}>
        {loading ? (
          <h1 style={styles.loadingText}>Loading joke...</h1>
        ) : (
          <h1 style={styles.jokeText}>{joke || "Click the button to get a joke!"}</h1>
        )}
      </div>
      <button style={styles.button} onClick={fetchJoke}>Get a New Joke</button>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
    margin: 0,
  },
  jokeContainer: {
    marginBottom: '20px',
  },
  loadingText: {
    fontSize: '24px',
    textAlign: 'center',
    color: '#888',
    padding: '20px',
  },
  jokeText: {
    fontSize: '24px',
    textAlign: 'center',
    color: '#333',
    padding: '20px',
    maxWidth: '80%',
    wordWrap: 'break-word',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    transition: 'background-color 0.3s ease',
  },
};

export default App;

