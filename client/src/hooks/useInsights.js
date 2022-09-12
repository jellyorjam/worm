import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setLongestBook, setShortestBook, setSortedByYear } from "../reducers/insightsSlice";

export const useInsights = (library) => {
  const dispatch = useDispatch();

    useEffect(() => {
    const bookWithMostPages = findLongestBook();
    const longestBook = bookWithMostPages[bookWithMostPages.length - 1];
    dispatch(setLongestBook(longestBook));

    const bookWithLeastPages = findShortestBook();
    const shortestBook = bookWithLeastPages[bookWithLeastPages.length - 1];
    dispatch(setShortestBook(shortestBook));

    const sortedByYear = organizeByYear();
    dispatch(setSortedByYear(sortedByYear));
  }, [library])


  const findLongestBook = () => {
    let bookWithMostPages = {
      pageCount: 0
    }

    return library.map((book) => {
      if (book.pageCount > bookWithMostPages.pageCount) {
        bookWithMostPages = book
      }
      return bookWithMostPages
    })
  };

  const findShortestBook = () => {
    let bookWithLeastPages = {
      pageCount: 10000000000
    }

    return library.map((book) => {
      if (book.pageCount < bookWithLeastPages.pageCount) {
        bookWithLeastPages = book
      }
      return bookWithLeastPages
    })
  };

  const organizeByYear = () => {
    const sortLibrary = [...library];
    const filterLibrary = sortLibrary.filter((book) => {
      return book.firstPublishYear !== ""
    })

    const sortedArray = filterLibrary.sort((a, b) => parseInt(a.firstPublishYear) - parseInt(b.firstPublishYear));
    return sortedArray;
  };

  const totalPages = library.reduce((accumulator, books) =>  accumulator + parseInt(books.pageCount), 0
  ).toLocaleString("en-US");

  return {
    totalPages
  }
}