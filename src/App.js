import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {useState} from 'react'
import Header from "./Components/SuperAdmin/Header";
import Navbar from "./Components/SuperAdmin/Navbar";
import Dashboard from "./Components/Dashboard";
import ContactUs from "./Components/SuperAdmin/ContactUs";
import Referral from "./Components/SuperAdmin/Referral";
import UserListing from "./Components/SuperAdmin/UserListing";
import Users from "./Components/SuperAdmin/Users";
import NotInterested from "./Components/SuperAdmin/NotInterested";
import Group from "./Components/SuperAdmin/Group";
import RedFlaged from "./Components/SuperAdmin/RedFlaged";
import SelfManaged from "./Components/SuperAdmin/SelfManaged";
import CoachAssigned from "./Components/SuperAdmin/CoachAssigned";
import CoachListing from "./Components/SuperAdmin/CoachListing";
import Resource from "./Components/SuperAdmin/Resource";
import AddGroup from "./Components/SuperAdmin/AddGroup";
import CoachInsert from "./Components/SuperAdmin/CoachInsert";
import AddRescource from "./Components/SuperAdmin/AddRescource";
import Category from "./Components/Master/Category";
import UpsertCategory from "./Components/Master/UpsertCategory";
import Utilities from "./Components/Master/Utilities";


function App() {

  const [isToggle, setIsToggle] = useState('page-wrapper doctris-theme toggled')
  const OnToggle = () => {
    if (isToggle == 'page-wrapper doctris-theme') {
        setIsToggle('page-wrapper doctris-theme toggled')
    } else {
        setIsToggle('page-wrapper doctris-theme')
    }
}


  return (
    <div className="App">
      <div className={isToggle}>
        <main className="page-content bg-light">
          <Router>
          <Header OnToggle={OnToggle} />
          <br />
          <br />
            <Navbar />
            <Routes>
              <Route exact path="/" element={<Dashboard />}></Route>
              <Route exact path="/ContactUs" element={<ContactUs/>}></Route>
              <Route exact path="/Referral" element={<Referral/>}></Route>
              <Route exact path="/UserListing" element={<UserListing/>}></Route>
              <Route exact path="/Users" element={<Users/>}></Route>
              <Route exact path="/NotIntrested" element={<NotInterested/>}></Route>
              <Route exact path="/Groups" element={<Group/>}></Route>
              <Route exact path="/RedFlaged" element={<RedFlaged/>}></Route>
              <Route exact path="/SelfManaged" element={<SelfManaged/>}></Route>
              <Route exact path="/CaochAssign" element={<CoachAssigned/>}></Route>
              <Route exact path="/CoachListing" element={<CoachListing/>}></Route>
              <Route exact path="/Resource" element={<Resource/>}></Route>
              <Route exact path="/AddGroup" element={<AddGroup/>}></Route>
              <Route exact path="/CreateCoach" element={<CoachInsert/>}></Route>
              <Route exact path="/AddResource" element={<AddRescource/>}></Route>
              <Route exact path="/Category" element={<Category/>}></Route>
              <Route exact path="/UpsertCategpry" element={<UpsertCategory/>}></Route>
              <Route exact path="/Master" element={<Utilities/>}></Route>
            </Routes>
          </Router>
        </main>
      </div>
    </div>
  );
}

export default App;
