
import './App.css';
import{BrowserRouter as Router,Routes,Route} from "react-router-dom";
import Homepage from './components/Homepage';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import NotLoggedInPage from './components/NotLoggedInPage';
import Logout from './components/Logout';
function App() {
  return (
    <div className="App">
      <Router>
     
      
     <Routes>
     <Route path="/" element={<Homepage/>}/>
    <Route path="/login" element={<Login/>}/>
    <Route path="/logout" element={<Logout />} />
     </Routes>
     
    </Router>
    </div>
  );
}

export default App;
