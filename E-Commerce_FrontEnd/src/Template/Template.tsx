import UserRouter from "../Router/UserRouter";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Navbar from "../components/Navbar";

const Template= () => {
    return (
        <div>
          <Router>
            <Navbar></Navbar>
            <UserRouter></UserRouter>
            </Router>
        </div>
    )
}

export default Template;