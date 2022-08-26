import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setBooks } from "../reducers/bookSlice";

export const useLoadBooksArray = (isLoading) => {
  const dispatch = useDispatch();
  const bookData = useSelector(state => state.libraryApi.queries);
  const userBooks = useSelector(state => state.user.user.books)

 const dataArray = [];

 useEffect(() => {
   for (const book in bookData) {
     const data = bookData[book].data
     dataArray.push(data);
   }
  dispatch(setBooks(dataArray));
 }, [userBooks, isLoading]);
}

