// CONPONENT: PersonForm
// PURPOSE: FORM TO ADD NEW NAME + NUMBER
// PROPS:
// - newName = CURRENT VALUE OF NAME FIELD
// - newNumber = CURRENT VALUE OF NUMBER FIELD
// - handleNameChange = EVENT HANDLER TO UPDATE NAME
// - handleNumberChange = EVENT HANDLER TO UPDATE NUMBER
// - addPerson = FORM SUBMISSION HANDLER

// Import CSS styles (optional)
import '../App.css'

// PersonForm component: renders a form to add a new person to the phonebook
// Props received from the parent component (App.js):
// - newName: current value of the "name" input (state)
// - newNumber: current value of the "number" input (state)
// - handleNameChange: function to handle changes in the name input
// - handleNumberChange: function to handle changes in the number input
// - addPerson: function to handle form submission (adding a person)

const PersonForm = ({
  newName,
  newNumber,
  handleNameChange,
  handleNumberChange,
  addPerson
}) => {
  return (
    // <form> container for the inputs and submit button
    // When submitted, calls the addPerson function
    <form onSubmit={addPerson}>

      {/* Name input field */}
      <div>
        name: 
        <input
          value={newName}           // Controlled input value from state
          onChange={handleNameChange} // Update state when user types
        />
      </div>

      {/* Number input field */}
      <div>
        number: 
        <input
          value={newNumber}           // Controlled input value from state
          onChange={handleNumberChange} // Update state when user types
        />
      </div>

      {/* Submit button */}
      <div>
        <button 
          type="submit"               // Submits the form when clicked
          className="submit-button"  // Applies CSS styling
        >
          add
        </button>
      </div>
    </form>
  )
}

// Export PersonForm to use in App.js
export default PersonForm

