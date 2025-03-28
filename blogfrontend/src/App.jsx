import React from "react";
import { Route, Routes } from "react-router-dom";
import Layout from "./Layout";
import IndexPage from "./pages/IndexPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import { UserContextProvider } from "./UserContext";
import CreatePost from "./pages/CreatePost";
import PostPage from "./pages/PostPage";
import EditPost from "./pages/EditPost";
import ErrorPage from "./ErrorPage";

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<IndexPage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="create" element={<CreatePost />} />
          <Route path="post/:id" element={<PostPage />} />
          <Route path="edit/:id" element={<EditPost />} />
        </Route>
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </UserContextProvider>
  );
}

export default App;
