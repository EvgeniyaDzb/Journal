import AlbumId from "../pages/AlbumId";
import Albums from "../pages/Albums";
import Error from "../pages/Error";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

export const privateRoutes = [
    {path: '/', element: <Posts/>, exect: true},
    {path: '/albums', element: <Albums/>, exect: true},
    {path: '/album/:id', element: <AlbumId/>, exect: true},
    {path: '/posts', element: <Posts/>, exect: true},
    {path: '/post/:id', element: <PostIdPage/>, exect: true},
    {path: '/error', element: <Error/>, exect: true},
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exect: true},
]