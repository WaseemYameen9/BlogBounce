//import styles from './App.css';
import Navbar from './components/Navbar/Navbar'
import Login from './components/Login/Login';
import Blogs from './components/Blogs/Blogs';
import SignUp from './components/SignUp/SignUp';
import News from './components/News/News';
import Home from './components/Home/Home';
import Footer from './components/Footer/Footer';
import Protected from './components/Protected/Protected';
import ErrorPage from './components/Error/Error';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';
function App() {
  let isAuth = useSelector(state=>state.user.auth);
  return (
    <>
    <div>
      <BrowserRouter>
      <div >
      <Navbar />
      <Routes>
        <Route
        path='/'
        exact
        element={
          <div >
            <Home/>
          </div>
        }
        />
        <Route
        path='/home'
        exact
        element={
          <div >
            <Home/>
          </div>
        }
        />
        <Route
        path='/blogs'
        exact
        element={
          <Protected isAuth={isAuth}>
          <div >
            <Blogs/>
          </div>
        </Protected>
        }
        />
        <Route
        path='/News'
        exact
        element={
          <div >
            <News/>
          </div>
        }
        />
        <Route
        path='/login'
        exact
        element={
          <div >
            <Login/>
          </div>
        }
        />
        <Route
        path='/signup'
        exact
        element={
          <div >
            <SignUp/>
          </div>
        }
        />
        <Route
        path='*'
        element={
          <ErrorPage/>
        }
        />
      </Routes>
      <Footer/>
      </div>
      </BrowserRouter>
    </div>
    </>
  );
}

export default App;
