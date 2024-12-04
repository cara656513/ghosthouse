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
import Layout from '../components/Layout';
import SearchPage from '../pages/SearchPage';
import GuestRoute from '../components/GuestRoute';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          {/* 퍼블릭 라우트: 누구나 접근 가능 */}
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/detail/:id" element={<DetailPage />} />

          {/* 게스트 라우트: 로그인 안한 사람만 */}
          <Route element={<GuestRoute />}>
            <Route path="/signin" element={<SignInPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Route>

          {/* 프로텍티드 라우트: 로그인 한 사람만 */}
          <Route element={<ProtectedRoute />}>
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/newpost" element={<NewPostPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/edit/:id?" element={<UpdatePostPage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
