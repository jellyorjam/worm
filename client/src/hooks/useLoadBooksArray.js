import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBooks } from "../reducers/bookSlice";
import { setWishlist } from "../reducers/wishlistSlice";

export const useLoadBooksArray = (isLoading) => {
  const dispatch = useDispatch();
  const bookData = useSelector(state => state.libraryApi.queries);
  const userBooks = useSelector(state => state.user.user.books)
  const userId = useSelector(state => state.user.user._id)

 const books = [];
 const wishlist= [];

//  useEffect(() => {
//   //  for (const book in bookData) {
//   //    const data = bookData[book].data
   
//   //    const users = bookData[book].data.users;
     
//   //    const wishlistUsers = bookData[book].data.wishlistUsers

//   //    if (users.length) {
//   //     if (users.includes(userId)) {
//   //       books.push(data);
//   //      }
//   //    }
    
//   //    if (wishlistUsers.length) {
//   //     if (wishlistUsers.includes(userId)) {
//   //       wishlist.push(data)
//   //     }
//   //    }
     

//   //  }
//   // dispatch(setBooks(bookArray));
//   // dispatch(setWishlist(wishlistArray))
//  }, []);

for (const book in bookData) {
  const data = bookData[book].data

  const users = bookData[book].data.users;
  
  const wishlistUsers = bookData[book].data.wishlistUsers

  if (users.length) {
   if (users.includes(userId)) {
     books.push(data);
    }
  }
 
  if (wishlistUsers.length) {
   if (wishlistUsers.includes(userId)) {
     wishlist.push(data)
   }
  }
}

 return {
   books: books,
   wishlist: wishlist
 }
}
