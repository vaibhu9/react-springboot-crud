import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Home from './component/Home';
import UpdateEmployee from './component/UpdateEmployee';
import AddEmployee from './component/AddEmployee';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/update-employee/:id" element={<UpdateEmployee />} />
        <Route path="/add-employee" element={<AddEmployee />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
