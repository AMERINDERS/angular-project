const express = require('express');
const dboperations = require('./dbOperations');
const sql = require('msnodesqlv8'); // Using msnodesqlv8
const config = require('./dbConfig');
const app = express();
const cors= require("cors");

// Enable JSON response
app.use(express.json());
app.use(cors());

// Test database connection
sql.query(config, "SELECT 1", (err, result) => {
  if (err) {
    console.error("Connection Failed:", err);
  } else {
    console.log("Connected to SQL Server!");
  }
});

// API to fetch all authors
app.get('/api/authors', async (req, res) => {
  try {
    const result = await dboperations.getAuthors();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/authors/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const author = await dboperations.getAuthor(id);
    res.status(200).json(author);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
});

app.put('/api/authors/:id', async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;// getting json data from body in postman
  console.log("Request Body:", updatedData);
  console.log("Author ID:", id);

  try {
    const result = await dboperations.updateAuthor(id, updatedData);
    res.status(200).json({ message: "Author updated successfully", result });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new author endpoint
app.post('/api/authors', async (req, res) => {
  const newAuthorData = req.body;
  console.log("New Author Data:", newAuthorData);

  
  if (!newAuthorData.au_id || !newAuthorData.au_lname) {
    return res.status(400).json({ error: "Missing required fields: au_id and au_lname" });
  }

  try {
    
    const result = await dboperations.createAuthor(newAuthorData);
    res.status(201).json({ message: "Author created successfully", result });
  } catch (error) {
    console.error("Error creating author:", error);
    res.status(500).json({ error: error.message });
  }
});
app.delete('/api/authors/:id', async (req, res) => {
  const { id } = req.params;
  console.log("Attempting to delete Author with ID:", id);

  try {
    const result = await dboperations.deleteAuthor(id);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Author not found or already deleted" });
    }

    console.log("Delete Successful:", result);
    res.status(200).json({ message: "Author deleted successfully" });
  } catch (error) {
    console.error("Error during DELETE operation:", error); // Detailed error log
    res.status(500).json({ error: error.message });
  }
});




// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
