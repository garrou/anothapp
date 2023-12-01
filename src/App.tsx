import { createBrowserRouter, Route, RouterProvider, Routes } from "react-router-dom";
import Series from "./views/series/Series";
import Home from "./views/Home";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import Discover from "./views/discover/Discover";
import Profile from "./views/user/Profile";
import DiscoverDetails from "./views/discover/DiscoverDetails";
import SeriesDetails from "./views/series/SerieDetails";
import SeasonDetails from "./views/series/SeasonDetails";
import NotFound from "./views/NotFound";
import ViewingMonth from "./views/series/ViewingMonth";
import Register from "./views/auth/Register";
import Login from "./views/auth/Login";
import ShowsToContinueTable from "./views/series/ShowsToContinueTable";
import NotStartedShowsRow from "./views/series/NotStartedShowsRow";
import ShowsToResumeTable from "./views/series/ShowsToResumeTable";
import { ToastContainer } from "react-toastify";
import Next from "./views/activities/Next";

const router = createBrowserRouter([
  { path: "*", element: <Root /> },
]);

function App() {
  return <RouterProvider router={router} />;
};

function Root() {
  return (
    <>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        <Route path="/series" element={<Series />} />
        <Route path="/series/:id" element={<SeriesDetails />} />
        <Route path="/series/:id/seasons/:num" element={<SeasonDetails />} />

        <Route path="/continue" element={<ShowsToContinueTable />} />
        <Route path="/not-started" element={<NotStartedShowsRow />} />
        <Route path="/resume" element={<ShowsToResumeTable />} />

        <Route path="/discover" element={<Discover />} />
        <Route path="/discover/:id" element={<DiscoverDetails />} />

        <Route path="/month" element={<ViewingMonth />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/next" element={<Next />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
