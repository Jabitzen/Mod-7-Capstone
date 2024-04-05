import { createBrowserRouter } from 'react-router-dom';
import LoginFormPage from '../components/LoginFormPage';
import SignupFormPage from '../components/SignupFormPage';
import LandingPage from '../components/LandingPage';
import CommunityPage from '../components/CommunityPage';
import CreateCommunityForm from '../components/CommunityForms/CreateCommunityForm';
import UpdateCommunity from '../components/CommunityForms/UpdateCommunityForm';
import PostForm from '../components/PostForms/CreatePostForm';
import UpdatePost from '../components/PostForms/UpdatePostForm';
import PostPage from '../components/PostPage';
import Layout from './Layout';

export const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "login",
        element: <LoginFormPage />,
      },
      {
        path: "signup",
        element: <SignupFormPage />,
      },
      {
        path: "communities/:communityId/update",
        element: <UpdateCommunity />
      },
      {
        path: "communities/:communityId",
        element: <CommunityPage />
      },
      {
        path: "communities/new",
        element: <CreateCommunityForm />
      },
      {
        path: "posts/new",
        element: <PostForm />
      },
      {
        path: "posts/:postId/update",
        element: <UpdatePost />
      },
      {
        path: "posts/:postId",
        element: <PostPage />
      },
    ],
  },
]);
