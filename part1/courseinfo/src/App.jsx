
// COMPONENT: Header
// PURPUSE: Display course name in an <h1> element
// INPUT: props.courseName (string)

const Header = ({ courseName }) => <h1>{courseName}</h1>

// COMPONENT: Part
// PURPUSE: Display a single part’s name and number of exercises
// INPUT: props.name (string), props.exercises (number)

const Part = ({ name, exercises }) => (
  <p>{name} {exercises}</p>
)

// COMPONENT: Content
// PURPUSE: Display all parts of the course
// INPUT: props.parts (array of objects)
// LOGIC: Access parts via array index (no loop)

const Content = ({ parts }) => (
  <div>
    <Part name={parts[0].name} exercises={parts[0].exercises} />
    <Part name={parts[1].name} exercises={parts[1].exercises} />
    <Part name={parts[2].name} exercises={parts[2].exercises} />
  </div>
)

// COMPONENT: Total
// PURPUSE: Calculate and display total number of exercises
// INPUT: props.parts (array of objects)
// LOGIC: Add exercises values of all 3 parts directly

const Total = ({ parts }) => {
  const total =
    parts[0].exercises + parts[1].exercises + parts[2].exercises

  return <p>Number of exercises {total}</p>
}

// MAIN COMPONENT: App
// PURPUSE: Holds course data and renders the full layout
// CHANGE: course is now a SINGLE OBJECT with:
// - course.name (string)
// - course.parts (array of 3 objects)


const App = () => {
  // COURSE OBJECT STRUCTURE:
  // - name: course title
  // - parts: array of part objects, each with name + exercises
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  // RENDER OUTPUT:
  // - Pass course.name to Header as courseName
  // - Pass course.parts (array) to Content and Total
  
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default App





