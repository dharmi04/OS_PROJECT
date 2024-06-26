import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests

const Opr = () => {
  // State variables to store Frames and Pages data, miss and hit counts
  const [frames, setFrames] = useState('');
  const [pages, setPages] = useState('');
  const [miss, setMiss] = useState(null);
  const [hit, setHit] = useState(null);

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      const pagesArray = pages.split(',').map(item => parseInt(item.trim()));
  
      // Make a POST request to backend endpoint with Frames as integer and Pages as an array
      const response = await axios.post('http://localhost:3000/api/optimalpage/simulate', { Frames: parseInt(frames), pages: pagesArray });
      
      // Update miss and hit counts based on the response
      setMiss(response.data.Miss);
      setHit(response.data.Hit);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  

  return (
    <div className="bg-black text-black min-h-screen py-8">
      <h1 className="text-3xl font-bold mb-4 text-white text-center">Optimal Page Replacement Algorithm</h1>
      <div className="flex flex-col items-center">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="mb-12 mt-12">
            <label htmlFor="frames" className="block text-sm font-medium text-white">Frames:</label>
            <input
              type="text"
              id="frames"
              className="mt-1 p-2 border rounded-md w-80" // Increased width
              value={frames}
              onChange={(e) => setFrames(e.target.value)}
              required
            />
          </div>
          <div className="mb-12 mt-12">
            <label htmlFor="pages" className="block text-sm font-medium text-white">Pages:</label>
            <input
              type="text"
              id="pages"
              className="mt-1 p-2 border rounded-md w-80" // Increased width
              value={pages}
              onChange={(e) => setPages(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="bg-blue-500 text-white px-10 py-2 rounded-md">Calculate</button>
        </form>
        {/* Display miss and hit counts if calculated */}
        {miss !== null && hit !== null && (
          <div className="mt-12">
            <p className='font-bold text-2xl text-white'>Miss: {miss}</p>
            <p className='font-bold text-2xl text-white'>Hit: {hit}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Opr;
