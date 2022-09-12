import { useEffect, useState } from "react";
import { useSelector } from "react-redux"

export const useConfigButtons = (books, wishlist, book) => {

  const userId = useSelector(state => state.user.user._id);
  const [inLibrary, setInLibrary] = useState(false);
  const [inWishlist, setInWishlist] = useState(false);

    useEffect(() => {
      books.forEach((title) => {
        if (title.googleLink === book.selfLink) {
          if (title.users.includes(userId)) {
            setInLibrary(true)
          }
          
        }
      })
      
      wishlist.forEach((title) => {
        if (title.googleLink === book.selfLink) {
          if (title.wishlistUsers.includes(userId))
          setInWishlist(true)
        }
      })
  
  }, [books, book, wishlist]);

  return {
    inLibrary,
    inWishlist,
    setInLibrary,
    setInWishlist
  }
}