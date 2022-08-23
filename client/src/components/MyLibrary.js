import Search from "./Search";
import NavBar from "./NavBar";
import BookCard from "./BookCard";
import { useLoginHook } from "../hooks/useLoginHook";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useGetBookQuery } from "../reducers/libraryApi";


// ask about security of isLoggedIn prop
const MyLibrary = () => {
  const library = useSelector(state => state.library);
  const books = useSelector(state => state.user.user.books);


  const { loggedIn } = useLoginHook()

  const renderBooks = () => {
    if (books) {
      return books.map((book) => {
        return (
          <BookCard book={book}/>
        )
      })
    }
    
  }
  if (loggedIn) {
    return (
      <div>
        <NavBar/>
        <Search />
        <div>
          {renderBooks()}
        </div>
      </div>
    )
  }
 
}

export default MyLibrary