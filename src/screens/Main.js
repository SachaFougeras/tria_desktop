import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../screens/LoginScreen';
import PrincipalScreen from '../screens/PrincipalScreen';
import ShowsScreen from '../screens/ShowsScreens';
import UserScreen from '../screens/UserScreen';
import AddTheaterScreen from '../screens/AddTheaterScreen';
import AddShowScreen from '../screens/AddShowScreen';
import UpdateScreen from '../screens/UpdateScreen';
import CommentScreen from './CommentScreen';
import UpdateTheaterScreen from './UpdateTheaterScreen';

function Main() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/connexion' element={<Login />} />
        <Route path='/PrincipalScreen' element={<PrincipalScreen />} />
        <Route path="/theater/:id/shows" element={<ShowsScreen />} />
        <Route path="/utilisateurs" element={<UserScreen />} />
        <Route path="/add/theater" element={<AddTheaterScreen />} />
        <Route path="/theater/show" element={<AddShowScreen />} />
        <Route path="/update/show/:id" element={<UpdateScreen />} />
        <Route path="/update/theater/:id" element={<UpdateTheaterScreen />} />
        <Route path="/comment" element={<CommentScreen />} />
      </Routes>
    </Router>
  );
}

export default Main;