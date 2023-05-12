import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Home from "./components/Home";
import Coindetail from "./components/Coindetail";
import Exchanges from "./components/Exchanges"
import Coins from './components/Coins'
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/coins' element={<Coins/>}  />
        <Route path='coins/coin/:id' element={<Coindetail/>}/>
        <Route path="/exchanges" element={<Exchanges/>}/>

      </Routes>
    <Footer/>
    </Router>
  
  );
  }

export default App;
