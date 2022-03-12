import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './contex/AuthProvider/AuthProvider';
import firebaseInit from './firebase/firebase.init/firebase.init';
import Login from './pages/Authentication/Login/Login';
import PrivateRoute from './pages/Authentication/PrivateRoute/PrivateRoute';
import Register from './pages/Authentication/Register/Register';
import Home from './pages/Home/Home';
import Allmembers from './pages/Menbers/AllMembers/Allmembers';
import SingleMember from './pages/Menbers/SingleMember/SingleMember';
import NotFound from './pages/NotFound/NotFound';
import Profile from './pages/Profile/Profile';
import UpdateProfile from './pages/Profile/UpdateProfile/UpdateProfile';
import SetInformation from './pages/SetInformation/SetInformation';
firebaseInit();
function App() {
  
  return (
    <>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path='/' element={<PrivateRoute>
              <Home />
            </PrivateRoute>
            }/>
            <Route path='/profile' element={<PrivateRoute>
              <Profile />
            </PrivateRoute>
            }/>
            <Route path='/setup-information' element={<PrivateRoute>
              <SetInformation />
            </PrivateRoute>
            }/>
            <Route path='/members' element={<PrivateRoute>
              <Allmembers />
            </PrivateRoute>
            }/>
            <Route path='/member/:id' element={<PrivateRoute>
              <SingleMember />
            </PrivateRoute>
            }/>
            <Route path='/update-profile/:id' element={<PrivateRoute>
              <UpdateProfile />
            </PrivateRoute>
            }/>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  );
}

export default App;
