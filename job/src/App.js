import {BrowserRouter, Route, Routes} from 'react-router-dom'
import { Register, Landing, Errorr } from "./pages/index.js";
import AddJob from './pages/Dashboard/AddJob.js';
import AllJobs from './pages/Dashboard/AllJobs.js';
import Stats from './pages/Dashboard/Stats.js';
import Profile from './pages/Dashboard/Profile.js';
import SharedLayout from './pages/Dashboard/SharedLayout.js';
import ProtectedLayout from './pages/ProtectedLayout.mjs'
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <ProtectedLayout>
          <SharedLayout />
          </ProtectedLayout>}> 
          <Route  path='stats' index={true} element={<Stats />} />
          <Route path='add-jobs' element={<AddJob />} />
          <Route path='all-jobs' element={<AllJobs />} />
          <Route path='profile' element={<Profile />} />
          </Route>
  <Route path='/register' element={ <Register/>} />
  <Route path='/landing' element={ <Landing/>} />
  <Route path='*' element={ <Errorr/>} />
      
      </Routes>
    </BrowserRouter>
  );
}

export default App;
