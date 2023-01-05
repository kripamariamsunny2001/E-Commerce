import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import MyProfile from "../pages/MyProfile";
import Home from "../pages/Home";


const UserRouter = () => {
    return (
        <div>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/myprofile' element={<MyProfile />} />
                </Routes>
        </div>
    )
}

export default UserRouter;