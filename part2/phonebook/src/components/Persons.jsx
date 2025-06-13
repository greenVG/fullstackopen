// CONPONENT: Persons
// PURPOSE: DISPLAY FILTERED LIST OF PERSON OBJECTS
// PROPS:
// - persons = ARRAY OF OBJECTS TO DISPLAY (name + number)

import '../App.css';

// const Persons = ({ persons }) => {
//  return (
//    <ul>
//      {persons.map(person =>
//        <li key={person.id}>
//          {person.name} — {person.number}
//        </li>
//      )}
//    </ul>
//  )
// }

// EXPORT Persons COMPONENT
// export default Persons

// NEW

// components/Persons.js

// import React from 'react'

// COMPONENT: Persons
// PURPOSE: DISPLAY A LIST OF PERSONS WITH THEIR NAME AND NUMBER
//          AND PROVIDE A DELETE BUTTON FOR EACH PERSON

const Persons = ({ persons, handleDelete }) => {
  return (

    // RETURN A LIST (<ul>) THAT CONTAINS MULTIPLE LIST ITEMS (<li>)
    // EACH LIST ITEM REPRESENTS ONE PERSON FROM THE 'persons' ARRAY

    <ul>
      {persons.map(person => (
        // 'key' IS REQUIRED TO HELP REACT IDENTIFY WHICH ITEMS HAVE CHANGED, ADDED, OR REMOVED
        <li key={person.id}>
          {/* DISPLAY PERSON'S NAME AND NUMBER */}
          {person.name} {person.number} {' '}
          
          {/* DELETE BUTTON */}
          {/* onClick: WHEN CLICKED, CALL 'handleDelete' FUNCTION */}
          {/* PASS PERSON'S ID AND NAME AS ARGUMENTS TO 'handleDelete' */}
          <button onClick={() => handleDelete(person.id, person.name)}>
            delete
          </button>
        </li>
      ))}
    </ul>
  )
}

// EXPORT COMPONENT TO USE IN OTHER PARTS OF THE APP



export default Persons

// COMPONENT: Persons — React functional component.

// PROP: persons — ARRAY OF PERSON OBJECTS TO DISPLAY.

// PROP: handleDelete — FUNCTION TO CALL WHEN USER WANTS TO DELETE A PERSON.

// MAP FUNCTION — ITERATES OVER ARRAY TO CREATE JSX FOR EACH PERSON.

// key — UNIQUE IDENTIFIER TO HELP REACT MANAGE THE LIST EFFICIENTLY.

// BUTTON onClick — TRIGGERS DELETE OPERATION WITH PERSON’S ID AND NAME.

// RETURN — RETURNS A JSX LIST ELEMENT CONTAINING ALL PERSONS.
