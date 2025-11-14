import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LoginPage from '../LoginPage/pages/Login/LoginPage'
import RegisterDonor from '../Register/pages/RegisterPageD/RegisterDonor'

const Routing = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/loginUser' element={<LoginPage/>}/>
                <Route path='/register-donor' element={<RegisterDonor/>}/>
            </Routes>
        </Router>
    )
}
export default Routing