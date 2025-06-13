// FILE: Course.jsx
// PURPOSE: DEFINE Course COMPONENT WITH ALL SUBCOMPONENTS

// COMPONENT: HEADER
// PURPOSE: DISPLAY COURSE NAME

const Header = ({ courseName }) => {
  return <h1>{courseName}</h1>
}

// COMPONENT: PART
// PURPOSE: DISPLAY SINGLE PART INFO

const Part = ({ name, exercises }) => {
  return (
    <p>
      {name} {exercises}
    </p>
  )
}

// COMPONENT: CONTENT
// PURPOSE: DISPLAY MULTIPLE PARTS

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}

// COMPONENT: TOTAL
// PURPOSE: SUM EXERCISES FROM PARTS

const Total = ({ parts }) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0)
  return <p><strong>Total of {totalExercises} exercises</strong></p>
}

// COMPONENT: COURSE
// PURPOSE: WRAP HEADER, CONTENT, AND TOTAL FOR SINGLE COURSE

const Course = ({ course }) => {
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

// EXPORT MAIN COMPONENT
export default Course
