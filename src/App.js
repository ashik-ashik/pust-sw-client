import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AuthProvider from './contex/AuthProvider/AuthProvider';
import firebaseInit from './firebase/firebase.init/firebase.init';
import AdminRoute from './pages/Authentication/AdminRoute/AdminRoute';
import Login from './pages/Authentication/Login/Login';
import PrivateRoute from './pages/Authentication/PrivateRoute/PrivateRoute';
import Register from './pages/Authentication/Register/Register';
import Footer from './pages/CommonSections/Footer/Footer';
import Verification from './pages/CommonSections/Verification/Verification';
import CRrequestList from './pages/Dashboard/CRrquestList/CRrequestList';
import Dashboard from './pages/Dashboard/Dashboard/Dashboard';
import ManageMembers from './pages/Dashboard/ManageMembers/ManageMembers';
import Home from './pages/Home/Home';
import Allmembers from './pages/Menbers/AllMembers/Allmembers';
import SingleMember from './pages/Menbers/SingleMember/SingleMember';
import MissionVision from './pages/MissionVision/MissionVision';
import NotFound from './pages/NotFound/NotFound';
import ManageNotice from './pages/Notices/ManageNotice/ManageNotice';
import Notices from './pages/Notices/Notices';
import PublishNotice from './pages/Notices/PublishNotice/PublishNotice';
import SingleNotice from './pages/Notices/SingleNotice/SingleNotice';
import Contacts from './pages/ParticularInfo/Contacts/Contacts';
import FindBlood from './pages/ParticularInfo/FingBlood/FindBlood';
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
            <Route path='/dashboard' element={<AdminRoute>
              <Dashboard />
            </AdminRoute>
              
            }/>
            <Route path='/manage-members' element={<AdminRoute>
              <ManageMembers />
            </AdminRoute>
            }/>
            <Route path='/cr-request' element={<AdminRoute>
              <CRrequestList />
            </AdminRoute>
            }/>            
            <Route path='/manage-notice' element={<AdminRoute>
              <ManageNotice />
            </AdminRoute>
            }/>
            <Route path='/notice-board' element={<PrivateRoute>
              <Notices />
            </PrivateRoute>
            }/>
            <Route path='/publish-notice' element={<PrivateRoute>
              <PublishNotice />
            </PrivateRoute>
            }/>
            <Route path='/notice/:id' element={<PrivateRoute>
              <SingleNotice />
            </PrivateRoute>
            }/>
            <Route path='/setup-information' element={<PrivateRoute>
              <SetInformation />
            </PrivateRoute>
            }/>
            <Route path='/find-blood' element={<PrivateRoute>
              <FindBlood />
            </PrivateRoute>
            }/>
            <Route path='/contacts' element={<PrivateRoute>
              <Contacts />
            </PrivateRoute>
            }/>
            <Route path='/verify-your-account' element={<Verification />}/>
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
            <Route path='/mission-vision' element={<MissionVision />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </Router>
      </AuthProvider>
        <Footer />
    </>
  );
}

export default App;
