import About from "../pages/About";
import Error from "../pages/Error";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

export const privetRoutes = [
    {path: '/', element: <Posts/>, exect: true},
    {path: '/about', element: <About/>, exect: true},
    {path: '/posts', element: <Posts/>, exect: true},
    {path: '/posts/:id', element: <PostIdPage/>, exect: true},
    {path: '/error', element: <Error/>, exect: true},
]

export const publicRoutes = [
    {path: '/login', element: <Login/>, exect: true},
]