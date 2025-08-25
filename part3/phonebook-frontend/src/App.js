// Replace the contents of: phonebook-frontend/src/App.js

import { useState, useEffect } from 'react'
import personService from './services/persons'
import './App.css'

// Component to display a single person
const Person = ({ person, onDelete }) => {
  return (
    <div style={{ marginBottom: '10px', padding: '10px', border: '1px solid #ccc' }}>
      <strong>{person.name}</strong>: {person.number}
      <button 
        onClick={() => onDelete(person.id, person.name)}
        style={{ marginLeft: '10px', backgroundColor: '#ff4444', color: 'white', border: 'none', padding: '5px 10px' }}
      >
        Delete
      </button>
    </div>
  )
}

// Component for the add person form
const PersonForm = ({ onSubmit, newName, onNameChange, newNumber, onNumberChange }) => {
  return (
    <form onSubmit={onSubmit}>
      <div style={{ marginBottom: '10px' }}>
        <label>Name: </label>
        <input 
          value={newName}
          onChange={onNameChange}
          placeholder="Enter name"
          required
        />
      </div>
      <div style={{ marginBottom: '10px' }}>
        <label>Number: </label>
        <input 
          value={newNumber}
          onChange={onNumberChange}
          placeholder="Enter phone number"
          required
        />
      </div>
      <button type="submit" style={{ padding: '10px 20px', backgroundColor: '#4CAF50', color: 'white', border: 'none' }}>
        Add Person
      </button>
    </form>
  )
}

// Component to display filter/search
const Filter = ({ filter, onChange }) => {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label>Filter by name: </label>
      <input 
        value={filter}
        onChange={onChange}
        placeholder="Search names..."
      />
    </div>
  )
}

// Main App Component
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState('')

  // Load persons from backend when component mounts
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
      .catch(error => {
        console.error('Error fetching persons:', error)
        showMessage('Error loading phonebook data', 'error')
      })
  }, [])

  // Show temporary message
  const showMessage = (text, type = 'success') => {
    setMessage(text)
    setMessageType(type)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  // Handle form submission
  const addPerson = (event) => {
    event.preventDefault()
    
    // Check if name already exists
    const existingPerson = persons.find(p => p.name.toLowerCase() === newName.toLowerCase())
    
    if (existingPerson) {
      alert(`${newName} is already added to phonebook`)
      return
    }

    const personObject = {
      name: newName,
      number: newNumber
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        showMessage(`Added ${returnedPerson.name}`, 'success')
      })
      .catch(error => {
        console.error('Error adding person:', error)
        const errorMessage = error.response?.data?.error || 'Error adding person'
        showMessage(errorMessage, 'error')
      })
  }

  // Handle person deletion
  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== id))
          showMessage(`Deleted ${name}`, 'success')
        })
        .catch(error => {
          console.error('Error deleting person:', error)
          showMessage(`Error deleting ${name}`, 'error')
        })
    }
  }

  // Filter persons based on search
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  )

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>Phonebook</h1>
      
      {/* Message display */}
      {message && (
        <div style={{
          padding: '10px',
          marginBottom: '20px',
          backgroundColor: messageType === 'error' ? '#ffebee' : '#e8f5e8',
          color: messageType === 'error' ? '#c62828' : '#2e7d32',
          border: `1px solid ${messageType === 'error' ? '#c62828' : '#2e7d32'}`,
          borderRadius: '4px'
        }}>
          {message}
        </div>
      )}

      {/* Search filter */}
      <Filter 
        filter={filter} 
        onChange={(e) => setFilter(e.target.value)} 
      />

      <h2>Add New Person</h2>
      {/* Add person form */}
      <PersonForm
        onSubmit={addPerson}
        newName={newName}
        onNameChange={(e) => setNewName(e.target.value)}
        newNumber={newNumber}
        onNumberChange={(e) => setNewNumber(e.target.value)}
      />

      <h2>Numbers ({personsToShow.length} entries)</h2>
      {/* Display persons */}
      <div>
        {personsToShow.length === 0 ? (
          <p>No persons found</p>
        ) : (
          personsToShow.map(person => 
            <Person 
              key={person.id} 
              person={person} 
              onDelete={deletePerson}
            />
          )
        )}
      </div>
    </div>
  )
}

export default App