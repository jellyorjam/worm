import Login from "./components/Login";
import Signup from "./components/Signup";
import Home from "./components/Home";
import Logout from "./components/Logout"
import Search from "./components/Search";
import Book from "./components/Book";
import {Routes, Route} from "react-router-dom";


function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="home" element={<Home/>}/>
        <Route path="logout" element={<Logout/>}/>
        <Route path="search" element={<Search/>}/>
        <Route path="books/:book" element={<Book/>}/>
      </Routes>
    </div>
  );
}

export default App;
