import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from '../LoginPage/pages/LoginPage'

const Routing = ()=>{
    return(
        <Router>
            <Routes>
                <Route path='/' element={<Register/>}/>
            </Routes>
        </Router>
    )
}
export default Routing