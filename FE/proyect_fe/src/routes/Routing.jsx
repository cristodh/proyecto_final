import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import DonationHistoryPage from '../DonorProfile/pages/DonationHistoryPage/DonationHistoryPage'
import HomePage from '../HomePage/pages/HomePage/HomePage'
import ProtectedRoute from './ProtectedRoute'
import AboutPage from '../AboutUs/pages/AboutPage/AboutPage'
import AdminDashboard from '../ADMIN/pages/AdminDashboard/AdminDashboard'
import RegisterLoginPage from '../RegisterLoginPage/pages/RegisterLoginPage/RegisterLoginPage'
import DonorRegisterPage from '../Register/pages/DonorRegisterPage/DonorRegisterPage'
import RecoveryPass from '../RegisterLoginPage/components/RecoverPass/RecoveryPass'
import FundifyNotFoundPage from '../NotFound/pages/NotFoundPage'



const Routing = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/about-us' element={<AboutPage/>}/>
                <Route path='/auth-user' element={<RegisterLoginPage/>}/>
                <Route path='/register-donor' element={<DonorRegisterPage/>}/>
                <Route path='/donor_profile/donation_history' element={<DonationHistoryPage/>}/>
                <Route path='/admin-main' element={<AdminDashboard/>}/>
                <Route path='/semeolvidolaclaveyporesoquierorecuperarlasesuponequemevaallegaruncorreo' element={<RecoveryPass/>}/>
                <Route path='*' element={<FundifyNotFoundPage/>}/>
                
            </Routes>
        </Router>
    )
}
export default Routing