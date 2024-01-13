import './App.css';
import Header from './components/header';
import NotesListPage from './pages/NotesListPage';
import NotePage from './pages/NotePage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
      <Routes>

          <Route path="/" exact element={ <NotesListPage /> } />
          <Route path="/note/:id" element={ <NotePage /> } />
      </Routes>
      </div>
    </Router>
  );
}

export default App;
