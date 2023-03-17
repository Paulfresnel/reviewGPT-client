import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage/HomePage';
import { Routes, Route } from 'react-router-dom';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/Signup/Signup';
import Header from './components/Header/Header';
import GenerateReview from './pages/GenerateReview/GenerateReview';


function App() {
  return (
    <div className="App">
    <Header/>
      <Routes>
      <Route path={"/"} element={<HomePage/>}/>
      <Route path={'/login'} element={<LoginPage/>}/>
      <Route path={'/signup'} element={<SignupPage/>}/>
      <Route path={'/generate-review'} element={<GenerateReview/>}/>


      </Routes>
    </div>
  );
}

export default App;
