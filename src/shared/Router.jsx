import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';
import MyPage from '../pages/MyPage';
import NewPostPage from '../pages/NewPostPage';
import DetailPage from '../pages/DetailPage';
import ProfilePage from '../pages/ProfilePage';
import UpdatePostPage from '../pages/UpdatePostPage';
import ProtectedRoute from '../components/ProtectedRoute';
// import Layout from '../components/Layout';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route element={<Layout />}> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route element={<ProtectedRoute />}>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/newpost" element={<NewPostPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/updatepost" element={<UpdatePostPage />} />
        </Route>
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
