import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Series from "./views/series/Series";
import Home from "./views/Home";
import Discover from "./views/discover/Discover";
import Profile from "./views/user/Profile";
import DiscoverDetails from "./views/discover/DiscoverDetails";
import SeriesDetails from "./views/series/SerieDetails";
import SeasonDetails from "./views/series/SeasonDetails";
import NotFound from "./views/NotFound";
import ViewingMonth from "./views/series/ViewingMonth";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import ShowsToContinue from "./views/series/ShowsToContinue";
import NotStartedShows from "./views/series/NotStartedShows";
import ShowsToResume from "./views/series/ShowsToResume";
import { ToastContainer } from "react-toastify";
import Friends from "./views/activities/Friends";
import Stats from "./views/user/Stats";
import Favorites from "./views/series/Favorites";

const router = createBrowserRouter([
  {
    path: "*", element: <Root />
  }
]);

function App() {
  return <RouterProvider router={router} />;
};

function Root() {
  return (
    <>
      <ToastContainer limit={3} autoClose={1000} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/series/:id/seasons/:num" element={<SeasonDetails />} />
        <Route path="/continue" element={<ShowsToContinue />} />
        <Route path="/not-started" element={<NotStartedShows />} />
        <Route path="/resume" element={<ShowsToResume />} />
        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/:id" element={<DiscoverDetails />} />
        <Route path="/last-months" element={<ViewingMonth />} />
        <Route path="/favorites" element={<Favorites />} />

        <Route path="/friends" element={<Friends />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/stats" element={<Stats />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
