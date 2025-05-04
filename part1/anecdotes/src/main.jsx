//  Import ReactDOM from the React DOM client package
import ReactDOM from 'react-dom/client'

// Import the main App component (your application UI lives here)
import App from './App'

// Create a root using the HTML element with id="root"
// React 18+ uses createRoot instead of older ReactDOM.render
ReactDOM.createRoot(document.getElementById('root')).render(
  // Render the <App /> component into the root
  <App />
)
