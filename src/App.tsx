import { BrowserRouter, Routes, Route } from "react-router-dom";
import Series from "./views/user/Series";
import Home from "./views/Home";

import 'bootstrap/dist/css/bootstrap.min.css';
import Discover from "./views/discover/Discover";
import WatchList from "./views/user/WatchList";
import Profile from "./views/user/Profile";
import ShowDetails from "./views/discover/ShowDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/series" element={<Series />} />
          <Route path="/discover/series" element={<Discover />} />
          <Route path="/discover/series/:id" element={<ShowDetails />} />
          <Route path="/watchlist" element={<WatchList />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
