import Login from "./components/Login";
import Signup from "./components/Signup";
import MyLibrary from "./components/MyLibrary"
import Logout from "./components/Logout"
import Book from "./components/Book";
import NavBar from "./components/NavBar";
import {Routes, Route} from "react-router-dom";
import SearchResults from "./components/SearchResults";
import { Provider } from "react-redux";
import { store } from "./store"


function App() {
  return (
    <div>
      <Routes>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="home" element={<MyLibrary/>}/>
        <Route path="logout" element={<Logout/>}/>
        <Route path="search" element={<SearchResults/>}/>
        <Route path="books/:book" element={<Book/>}/>
      </Routes>
    </div>
  );
}

export default App;
