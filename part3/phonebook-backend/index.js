import cors from 'cors';

// Add this line after creating the app
// app.use(cors());


// Log message to indicate server setup is starting
console.log("Starting server setup...");

// ============================================
// Import required modules
// ============================================
import express from 'express';              // Import the Express web framework
import morgan from 'morgan';               // Import Morgan for HTTP request logging


// ============================================
// Create an Express application
// ============================================
const app = express();

// ============================================
// Define the port number the server will listen on
// Uses environment variable PORT (for production) or defaults to 3001
// ============================================
const PORT = process.env.PORT || 3001;

// ============================================
// Middleware setup
// ============================================

// Enable CORS for all origins (allows frontend to communicate with backend)
// In production, you might want to restrict this to specific origins
app.use(cors());

// Use express.json() middleware to automatically parse incoming JSON data
// into JavaScript objects
app.use(express.json());

// Serve static files from 'dist' directory (for production build of frontend)
// This allows the backend to serve the frontend application
app.use(express.static('dist'));

// ============================================
// CUSTOM MORGAN TOKEN TO LOG POST DATA
// ============================================

// Define a custom token 'postData' that returns the JSON string of the request body,
// but ONLY for POST requests. For other HTTP methods, it returns an empty string.
// This avoids cluttering logs for GET, DELETE, etc.
morgan.token('postData', (req) => {
  // Check if request method is POST and body is present
  if (req.method === 'POST') {
    // JSON.stringify converts JS object to a string for logging
    return JSON.stringify(req.body);
  }
  return '';
});

// ============================================
// Morgan middleware setup with custom format
// ============================================

// Create a Morgan format string that includes:
// :method - HTTP method (GET, POST, etc.)
// :url - Requested URL
// :status - HTTP response status code
// :res[content-length] - Size of the response content in bytes
// :response-time ms - Time taken to respond in milliseconds
// :postData - Our custom token that logs POST request body JSON
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :postData'));

// Example log for POST might look like:
// POST /api/persons 201 123 - 15.234 ms {"name":"John Doe","number":"123-4567"}

// ============================================
// Sample data representing phonebook entries
// ============================================
let persons = [
  {
    id: "1",
    name: "Arto Hellas",
    number: "040-123456"
  },
  {
    id: "2",
    name: "Ada Lovelace",
    number: "39-44-5323523"
  },
  {
    id: "3",
    name: "Dan Abramov",
    number: "12-43-234345"
  },
  {
    id: "4",
    name: "Mary Poppendieck",
    number: "39-23-6423122"
  }
];

// ============================================
// GET /api/persons - Return all phonebook entries as JSON
// ============================================
app.get('/api/persons', (request, response) => {
  response.json(persons); // Send the entire persons array as JSON
});

// ============================================
// GET /info - Return number of entries and current timestamp
// ============================================
app.get('/info', (request, response) => {
  const numEntries = persons.length;         // Count how many entries are in the phonebook
  const currentTime = new Date();            // Get current date and time

  // Respond with an HTML string containing info
  response.send(`
    <div>
      <p>Phonebook has info for ${numEntries} people</p>
      <p>${currentTime}</p>
    </div>
  `);
});

// ============================================
// GET /api/persons/:id - Return a single person by ID
// ============================================
app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id;              // Get the ID from the request parameters
  const person = persons.find(p => p.id === id);  // Search for the person with matching ID

  if (person) {
    response.json(person);                   // If found, return the person as JSON
  } else {
    response.status(404).send({ error: "Person not found" }); // If not found, return 404 error
  }
});

// ============================================
// DELETE /api/persons/:id - Delete a person by ID
// ============================================
app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id;              // Get the ID of the person to delete

  const initialLength = persons.length;      // Store original array length before deletion
  persons = persons.filter(person => person.id !== id); // Remove the person with the given ID

  if (persons.length < initialLength) {
    response.status(204).end();              // If deletion happened, respond with 204 No Content
  } else {
    response.status(404).send({ error: "Person not found" }); // If no match, send 404 Not Found
  }
});

// ============================================
// POST /api/persons - Add a new person to the phonebook
// ============================================
app.post('/api/persons', (request, response) => {
  const body = request.body; // Extract the data sent in the request body (should contain name and number)

  // === Error Check 1: Ensure that 'name' and 'number' are provided ===
  if (!body.name || !body.number) {
    // If either is missing, respond with status code 400 (Bad Request)
    return response.status(400).json({
      error: "Name or number is missing"
    });
  }

  // === Error Check 2: Ensure that the name is unique (not already in 
  // the phonebook) ===
  const nameExists = persons.some(person => person.name.toLowerCase() === body.name.toLowerCase());
  if (nameExists) {
    // If the name already exists, return a 400 error with a clear message
    return response.status(400).json({
      error: "Name must be unique"
    });
  }

  // === Generate a unique ID for the new person ===
  // Uses Math.random() with a large enough range to avoid likely collisions
  const newId = Math.floor(Math.random() * 1000000).toString();

  // === Construct the new person object ===
  const newPerson = {
    id: newId,
    name: body.name,
    number: body.number
  };

  // === Add the new person to the persons array ===
  persons = persons.concat(newPerson);

  // === Respond with the newly added person and status code 201 (Created) ===
  response.status(201).json(newPerson);
});

// ============================================
// PUT /api/persons/:id - Update an existing person's phone number
// This endpoint is for future implementation when frontend editing is added
// ============================================
app.put('/api/persons/:id', (request, response) => {
  const id = request.params.id;
  const body = request.body;

  // Find the person to update
  const personIndex = persons.findIndex(p => p.id === id);
  
  if (personIndex === -1) {
    return response.status(404).json({ error: "Person not found" });
  }

  // Validate that name and number are provided
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "Name or number is missing"
    });
  }

  // Check if the new name is unique (excluding the current person)
  const nameExists = persons.some((person, index) => 
    index !== personIndex && 
    person.name.toLowerCase() === body.name.toLowerCase()
  );
  
  if (nameExists) {
    return response.status(400).json({
      error: "Name must be unique"
    });
  }

  // Update the person
  const updatedPerson = {
    id: id,
    name: body.name,
    number: body.number
  };

  persons[personIndex] = updatedPerson;
  response.json(updatedPerson);
});

// ============================================
// Start the server and listen on the specified port
// ============================================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});