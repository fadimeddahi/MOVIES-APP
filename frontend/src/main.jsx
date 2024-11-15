// src/index.js
import ReactDOM from "react-dom/client";
import App from "./app";
import store from "./redux/store";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./pages/auth/PrivateRoute";
import Profile from "./pages/User/Profile";
import "./styles.css"; // Ensure this import is at the top of your main JS file
import AdminRoute from "./pages/Admin/AdminRoute";
import GenreList from "./pages/Admin/GenreList";
import CreateMovie from "./pages/Admin/CreateMovie";
import AdminMoviesList from "./pages/Admin/AdminMoviesList";
import UpdateMovie from "./pages/Admin/UpdateMovie";
import AllMovies from "./pages/Movies/AllMovies";
import MovieDetails from "./pages/Movies/MovieDetails";
import AllComments from "./pages/Admin/AllComments";
import AdminDashboard from "./pages/Admin/Dashboard/AdminDashboard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // App component as the main layout
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/movies",
        element: <AllMovies />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/movies/:id",
        element: <MovieDetails />,
      },

      {
        path: "",
        element: <PrivateRoute />, // Protects the following routes
        children: [
          {
            path: "/profile", // Protected Profile route
            element: <Profile />,
          },
        ],
      },
      {
        path: "",
        element: <AdminRoute />,
        children: [
          {
            path: "/admin/movies/genre",
            element: <GenreList />,
          },
          {
            path: "/admin/movies/create",
            element: <CreateMovie />,
          },
          {
            path: "/admin/movies-list",
            element: <AdminMoviesList />,
          },
          {
            path: "/admin/movies/update/:id",
            element: <UpdateMovie />,
          },
          {
            path: "/admin/movies/comments",
            element: <AllComments />,
          },
          {
            path: "/admin/movies/dashboard",
            element: <AdminDashboard />,
          }
          
        ],
      },
    ],
  },
]);

// Render the application
ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
