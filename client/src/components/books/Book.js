import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { useGetBookQuery, useGetWishlistQuery } from "../../reducers/libraryApi";
import { useLoginHook } from "../../hooks/useLoginHook";
import { useGetBookDetailQuery } from "../../reducers/googleBooksApi";
import BookDisplay from "./BookDisplay";


const Book = () => {

  const { state } = useLocation();
  const selfLink = state;
  const { loggedIn } = useLoginHook();
  const { data: book, error: bookError, isLoading} = useGetBookDetailQuery(selfLink);
  const usersBooks = useSelector(state => state.user.user.books);
  const usersWishlist = useSelector(state => state.user.user.wishlist);
  const { data: books, error,  isLoading: booksLoading } = useGetBookQuery(usersBooks);
  const { data: wishlist, isLoading: wishlistLoading } = useGetWishlistQuery(usersWishlist);

  if (loggedIn && books && book && wishlist) {
    return (
      <BookDisplay books={books} wishlist={wishlist} book={book}/>
    )
  }
}

export default Book;