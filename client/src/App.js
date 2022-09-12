import Login from "./components/Login";
import Signup from "./components/Signup";
import MyLibrary from "./components/books/MyLibrary"
import Book from "./components/books/Book";
import Insights from "./components/insights/Insights";
import GeoInsights from "./components/insights/GeoInsights";
import {Routes, Route} from "react-router-dom";
import SearchResults from "./components/SearchResults";
import PublishYearInsights from "./components/insights/PublishYearInsights";
import USInsights from "./components/insights/maps/USInsights";
import GenreInsights from "./components/insights/GenreInsights";
import Wishlist from "./components/books/Wishlist";
import PagesReadInsights from "./components/insights/PagesReadInsights";



function App() {
  return (
    <div>
      <Routes>
        <Route path="*" element={<Login/>}/>
        <Route path="login" element={<Login/>}/>
        <Route path="signup" element={<Signup/>}/>
        <Route path="home" element={<MyLibrary/>}/>
        <Route path="wishlist" element={<Wishlist/>}/>
        <Route path="search" element={<SearchResults/>}/>
        <Route path="books/:book" element={<Book/>}/>
        <Route path="insights" element={<Insights/>}/>
        <Route path="insights/pages" element={<PagesReadInsights/>}/>
        <Route path="insights/year" element={<PublishYearInsights/>}/>
        <Route path="insights/geo" element={<GeoInsights/>}/>
        <Route path="insights/geo/us" element={<USInsights/>}/>
        <Route path="insights/genre" element={<GenreInsights/>}/>
      </Routes>
    </div>
  );
}

export default App;
