import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import RegisterDonor from '../Register/pages/RegisterPageD/RegisterDonor'
import DonationHistoryPage from '../DonorProfile/pages/DonationHistoryPage/DonationHistoryPage'
import HomePage from '../HomePage/pages/HomePage/HomePage'
import ProtectedRoute from './ProtectedRoute'
import AboutPage from '../AboutUs/pages/AboutPage/AboutPage'
import AdminDashboard from '../ADMIN/pages/AdminDashboard/AdminDashboard'
import RegisterLoginPage from '../RegisterLoginPage/pages/RegisterLoginPage/RegisterLoginPage'


const Routing = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/about-us' element={<AboutPage/>}/>
                <Route path='/auth-user' element={<RegisterLoginPage/>}/>
                <Route path='/register-donor' element={<RegisterDonor/>}/>
                <Route path='/donor_profile/donation_history' element={<DonationHistoryPage/>}/>
                <Route path='/admin-main' element={<AdminDashboard/>}/>
                <Route path='*' element={<h1>404 Not Found</h1>}/>
                
            </Routes>
        </Router>
    )
}
export default Routing