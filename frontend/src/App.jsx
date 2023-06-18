import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import { Homepage } from './components/pages/Homepage';
import { Contact } from './components/pages/Contact';

function App() {
  return (
    <Routes>
      <Route path="/" exact element={<Homepage />} />
      <Route path="/contact/:id" element={<Contact />} />
    </Routes>
  );
}

export default App;
