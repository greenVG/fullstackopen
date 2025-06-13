// FILTER COMPONENT
// PURPOSE: PROVIDES SEARCH INPUT TO FILTER PHONEBOOK ENTRIES
// RECEIVES searchTerm AND handleSearchChange AS PROPS FROM PARENT

const Filter = ({ searchTerm, handleSearchChange }) => {
  return (
    <div>
      {/* LABEL FOR ACCESSIBILITY - ASSOCIATES TEXT WITH INPUT FIELD */}
      <label htmlFor="filter-input">
        Filter shown with: 
      </label>
      
      {/* CONTROLLED INPUT FIELD FOR SEARCH/FILTER FUNCTIONALITY */}
      <input
        id="filter-input"           // ID FOR LABEL ASSOCIATION
        type="text"                 // TEXT INPUT TYPE
        value={searchTerm}          // CONTROLLED VALUE FROM PARENT STATE
        onChange={handleSearchChange} // EVENT HANDLER FROM PARENT
        placeholder="Enter name to search..." // HELPFUL PLACEHOLDER TEXT
        style={{ marginLeft: '10px' }} // BASIC SPACING
      />
    </div>
  )
}

// EXPORT FILTER COMPONENT FOR USE IN APP.JS
export default Filter