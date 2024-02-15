import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { FavoritesProvider } from './context/FavoriteContext';
import { LanguageProvider } from './context/LanguageContext';
import { MessageProvider } from './context/MessageContext';
import Favorites from './pages/Favorites';
import Home from './pages/Home';
import Login from './pages/Login';
import NewAccount from './pages/NewAccount';
import ProductDetails from './pages/ProductDetails';
import Reservation from './pages/Reservation';
import ReservationConfirmation from './pages/ReservationConfirmation';
import { DateSelectedCalendarProvider } from './context/DateSelectedCalendarContext'
import MyReserves from './pages/MyReserves';
import Admin from './pages/Admin';

function App() {
  return (
    <DateSelectedCalendarProvider>
    <FavoritesProvider>
    <MessageProvider>
    <LanguageProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/login" element={<Login/>}></Route>
          <Route path="/newAccount" element={<NewAccount/>}></Route>
          <Route path="/productDetails/:infoItem" element={<ProductDetails/>}></Route>
          <Route path="/reservation/:infoItem" element={<Reservation/>}></Route>
          <Route path="/confirmation/:info" element={<ReservationConfirmation/>}></Route>
          <Route path="/bookingsuserid/:id" element={<MyReserves/>}></Route>
          <Route path="/favorites" element={<Favorites/>}></Route>
          <Route path="/administration/:infoItem" element={<Admin/>}></Route>
        </Routes>
      </BrowserRouter>
    </LanguageProvider>
    </MessageProvider>
    </FavoritesProvider>
    </DateSelectedCalendarProvider>
  );
}

export default App;
