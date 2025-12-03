import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import DonationHistoryPage from '../DonorProfile/pages/DonationHistoryPage/DonationHistoryPage'
import HomePage from '../HomePage/pages/HomePage/HomePage'
import ProtectedRoute from './ProtectedRoute'
import AboutPage from '../AboutUs/pages/AboutPage/AboutPage'
import AdminDashboard from '../ADMIN/pages/AdminDashboard/AdminDashboard'
import RegisterLoginPage from '../RegisterLoginPage/pages/RegisterLoginPage/RegisterLoginPage'
import DonorRegisterPage from '../Register/pages/DonorRegisterPage/DonorRegisterPage'
import ManagerRegisterPage from '../Register/pages/ManagerRegisterPage/ManagerRegisterPage.jsx'
import RecoveryPass from '../RegisterLoginPage/components/RecoverPass/RecoveryPass'
import FundifyNotFoundPage from '../NotFound/pages/NotFoundPage'
import DonorMain from '../DonorProfile/pages/DonorMain/DonorMain'
import DonorFollowed from '../DonorProfile/pages/DonorFollowed/DonorFollowed'
import DonationHistoryPage from '../DonorProfile/pages/DonationHistoryPage/DonationHistoryPage'
import DonorConfig from '../DonorProfile/pages/DonorConfig/DonorConfig'
import ManagerMain from '../ManagerProfile/pages/ManageProfile/ManagerMain/ManagerMain.jsx'
import ManagerCampaigns from '../ManagerProfile/pages/ManageProfile/ManagerCampaigns/ManagerCampaigns.jsx'
import ManagerAnalytics from '../ManagerProfile/pages/ManageProfile/ManagerAnalytics/ManagerAnalytics.jsx'
import ManagerConfig from '../ManagerProfile/pages/ManageProfile/ManagerConfig/ManagerConfig.jsx'



const Routing = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<HomePage/>}/>
                <Route path='/about-us' element={<AboutPage/>}/>
                <Route path='/auth-user' element={<RegisterLoginPage/>}/>
                <Route path='/register-donor' element={<DonorRegisterPage/>}/>
                <Route path='/register-manager' element={<ManagerRegisterPage/>}/>
                <Route path='/donor_profile/main' element={<DonorMain/>}/>
                <Route path='/donor_profile/followed' element={<DonorFollowed/>}/>
                <Route path='/donor_profile/history' element={<DonationHistoryPage/>}/>
                <Route path='/donor_profile/config' element={<DonorConfig/>}/>
                <Route path='/manager_profile/main' element={<ManagerMain/>}/>
                <Route path='/manager_profile/campaigns' element={<ManagerCampaigns/>}/>
                <Route path='/manager_profile/analytics' element={<ManagerAnalytics/>}/>
                <Route path='/manager_profile/config' element={<ManagerConfig/>}/>
                <Route path='/admin-main' element={<AdminDashboard/>}/>
                <Route path='/semeolvidolaclaveyporesoquierorecuperarlasesuponequemevaallegaruncorreo' element={<RecoveryPass/>}/>
                <Route path='*' element={<FundifyNotFoundPage/>}/>
                
            </Routes>
        </Router>
    )
}
export default Routing