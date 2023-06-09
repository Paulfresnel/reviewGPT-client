import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/Signup/Signup';
import Header from './components/Header/Header';
import GenerateReview from './pages/GenerateReview/GenerateReview';
import IsAnon from './components/middlewares/IsAnon';
import IsPrivate from './components/middlewares/IsPrivate';
import Profile from './pages/Profile/Profile';
import UsersLeaderboard from './pages/UsersLeaderboard/UsersLeaderboard';

function App() {
  return (
    <div className="App">
    <Header/>
      <Routes>
      <Route path={"/"} element={<HomePage/>}/>
      <Route path={'/login'} element={<IsAnon><LoginPage/></IsAnon>}/>
      <Route path={'/signup'} element={<IsAnon><SignupPage/></IsAnon>}/>
      <Route path={'/profile'} element={<IsPrivate><Profile/></IsPrivate>}/>
      <Route path={'/generate-review'} element={<IsPrivate><GenerateReview/></IsPrivate>}/>
      <Route path={'/leaderboard'} element={<IsPrivate><UsersLeaderboard/></IsPrivate>}/>
      </Routes>
    </div>
  );
}

export default App;
