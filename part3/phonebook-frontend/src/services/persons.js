// Create this file: phonebook-frontend/src/services/persons.js

import axios from 'axios'

// Base URL for API calls to your backend
const baseUrl = 'http://localhost:3001/api/persons'

// Get all persons from the backend
const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

// Create a new person in the backend
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)
}

// Delete a person from the backend
const remove = (id) => {
  return axios.delete(`${baseUrl}/${id}`)
}

// Update an existing person (for future use)
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject)
  return request.then(response => response.data)
}

export default { 
  getAll, 
  create, 
  remove, 
  update 
}