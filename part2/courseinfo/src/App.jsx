// FILE: App.jsx
// PURPOSE: MAIN APPLICATION 

import Course from './Course' // IMPORT Course MODULE

const App = () => {

  // MULTIPLE COURSES DEFINED HERE

      const courses = [
      {
        name: 'Half Stack application development',
      id: 1,
      parts: [
        { name: 'Fundamentals of React', exercises: 10, id: 1 },
        { name: 'Using props to pass data', exercises: 7, id: 2 },
        { name: 'State of a component', exercises: 14, id: 3 },
        { name: 'Redux', exercises: 11, id: 4 }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        { name: 'Routing', exercises: 3, id: 1 },
        { name: 'Middlewares', exercises: 7, id: 2 }
      ]
    }
  ]

  // RENDER A Course COMPONENT FOR EACH COURSE OBJECT

//  Course è un componente React. In React, i nomi dei componenti devono essere 
//  scritti con la prima lettera
//  maiuscola. Questo è un requisito di React per distinguere tra componente
//  React e elemento HTML standard. Ricordare poi che:
// import Course from './Course' // IMPORT Course MODULE


// course è il nome della prop che viene passata al componente Course per
// rappresentare ogni singolo oggetto corso (con name, id, ecc.).

// course (con la minuscola) è una variabile che rappresenta un singolo elemento 
// (oggetto) nell'array courses, o una prop passata al componente Course.
//  course è un nome che puoi cambiare come preferisci! È una variabile che
//  rappresenta ogni singolo elemento dell'array courses durante l'iterazione}
//  con .map().

//  courses e´definito sopra nella parte  MULTIPLE COURSES DEFINED HERE
//  const courses

// Nel componente Course, avrai accesso a questi dati:
// course.id: Il valore dell'ID, es. 1.
// course.name: Il nome del corso, es. 'React Basics'.
// course.parts: Un array di parti del corso, ognuna con un nome e un numero
//  di esercizi. Per esempio, [{ name: 'Introduction', exercises: 5, id: 1 }, ...].

  return (
    <div>
      {courses.map(course => (
        <Course key={course.id} course={course} />
      ))}
    </div>
  )
}

export default App

