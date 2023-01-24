import { BrowserRouter, Routes, Route } from "react-router-dom";
import Series from "./views/user/Series";
import Home from "./views/Home";

import 'bootstrap/dist/css/bootstrap.min.css';
import WatchList from "./views/user/WatchList";
import Profile from "./views/user/Profile";
import Search from "./views/user/Search";
import ShowDetails from "./views/user/ShowDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/series" element={<Series />} />
          <Route path="/search/shows" element={<Search />} />
          <Route path="/search/shows/:id" element={<ShowDetails />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
