import React, { useState, useEffect } from 'react'
// Import the API functions
import personService from './services/persons'

// UI components
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

// Notification component
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])       // List of all persons
  const [newName, setNewName] = useState('')       // Input field for name
  const [newNumber, setNewNumber] = useState('')   // Input field for number
  const [searchTerm, setSearchTerm] = useState('') // Input for searching
  const [notificationMessage, setNotificationMessage] = useState(null) // Success or error message text
  const [isError, setIsError] = useState(false)    // Is the message an error?

  // Load persons when the component mounts
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => setPersons(initialPersons))
      .catch(error => {
        console.error('Error fetching persons:', error)
      })
  }, [])

  // Handle add or update
  const addPerson = (event) => {
    event.preventDefault()

    const existingPerson = persons.find(person => person.name === newName)

    if (existingPerson) {
      // Ask the user for confirmation to update
      const confirmUpdate = window.confirm(
        `${newName} is already added to phonebook. Replace the old number with a new one?`
      )
      if (!confirmUpdate) return

      // Prepare updated object with new number
      const updatedPerson = {
        ...existingPerson,
        number: newNumber
      }

      // Try updating the person on the server
      personService
        .update(existingPerson.id, updatedPerson)
        .then(returnedPerson => {
          // Update the state with the updated person
          setPersons(persons.map(person =>
            person.id !== existingPerson.id ? person : returnedPerson
          ))
          setNewName('')
          setNewNumber('')

          // Optional: success notification (you can remove this if you only want to show it on add)
          setIsError(false)
          setNotificationMessage(`Updated ${returnedPerson.name}'s number`)
          setTimeout(() => setNotificationMessage(null), 5000)
        })
        .catch(error => {
          // Error: person was likely deleted in another browser
          console.error('Error updating person:', error)

          // Show error message
          setIsError(true)
          setNotificationMessage(`Information of ${existingPerson.name} has already been removed from the server`)
          setTimeout(() => setNotificationMessage(null), 5000)

          // Remove person from the state list (since they no longer exist)
          setPersons(persons.filter(person => person.id !== existingPerson.id))
        })
    } else {
      // Create new person object
      // const maxId = persons.length > 0 ? Math.max(...persons.map(p => p.id)) : 0
      // const personObject = {
      //   name: newName,
      //   number: newNumber,
      //   id: maxId + 1
      // }

      // Let the backend generate the ID
// Let the backend generate the ID
        const personObject = {
          name: newName,
          number: newNumber
          // No ID field - let backend handle it
        }

      // Send to server to create
      personService
        .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')

          // Show success notification
          setIsError(false)
          setNotificationMessage(`Added ${returnedPerson.name}`)
          setTimeout(() => setNotificationMessage(null), 5000)
        })
        .catch(error => {
          console.error('Error adding person:', error)

          // Optional: Show error notification
          setIsError(true)
          setNotificationMessage('Failed to add the person')
          setTimeout(() => setNotificationMessage(null), 5000)
        })
    }
  }

  // Handle deleting a person
  const handleDelete = (id, name) => {
    const confirmDelete = window.confirm(`Delete ${name}?`)
    if (!confirmDelete) return

    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== id))
      })
      .catch(error => {
        console.error('Error deleting person:', error)

        // Show error if person is already removed
        setIsError(true)
        setNotificationMessage(`Information of ${name} has already been removed from the server`)
        setTimeout(() => setNotificationMessage(null), 5000)

        // Still remove from local state
        setPersons(persons.filter(person => person.id !== id))
      })
  }

  // Handlers for input fields
  const handleNameChange = (e) => setNewName(e.target.value)
  const handleNumberChange = (e) => setNewNumber(e.target.value)
  const handleSearchChange = (e) => setSearchTerm(e.target.value)

  // Filter persons list based on search term
  const filteredPersons = persons.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="app-container">
      {/* Notification message (error or success) */}
      <Notification message={notificationMessage} isError={isError} />

      <h2>Phonebook</h2>

      {/* Search bar */}
      <Filter
        searchTerm={searchTerm}
        handleSearchChange={handleSearchChange}
      />

      <h3>Add a new</h3>

      {/* Form to add or update a person */}
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}
      />

      <h3>Numbers</h3>

      {/* Display persons */}
      <Persons
        persons={filteredPersons}
        handleDelete={handleDelete}
      />
    </div>
  )
}

export default App

