import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
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
import Gender from "./Components/Master/Gender";
import Inquire from "./Components/Master/Inquire";
import Program from "./Components/Master/Program";
import ProgramType from "./Components/Master/ProgramType";
import RiskOfProgression from "./Components/Master/RiskOfProgression";
import UpsertCategory from "./Components/Master/UpsertCategory";
import UpsertCountry from "./Components/Master/UpsertCountry";
import UpsertGender from "./Components/Master/UpsertGender";
import UpsertInquire from "./Components/Master/UpsertInquire";
import UpsertProgram from "./Components/Master/UpsertProgram";
import UpsertProgramType from "./Components/Master/UpsertProgramType";
import UpsertRiskOfProgression from "./Components/Master/UpsertRiskOfProgression";
import Role from "./Components/Master/Role";
import UpsertRole from "./Components/Master/UpsertRole";
import Subscription from "./Components/Master/Subscription";
import UpsertSubscription from "./Components/Master/UpsertSubscription";
import Topic from "./Components/Master/Topic";
import UpsertTopic from "./Components/Master/UpsertTopic";
import UserStatus from "./Components/Master/UserStatus";
import UpsertUserStatus from "./Components/Master/UpsertUserStatus";
import UserType from "./Components/Master/UserType";
import UpsertUserType from "./Components/Master/UpsertUserType";
import Utilities from "./Components/Master/Utilities";
import Country from "./Components/Master/Country";


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
              <Route exact path="/ContactUs" element={<ContactUs />}></Route>
              <Route exact path="/Referral" element={<Referral />}></Route>
              <Route exact path="/UserListing" element={<UserListing />}></Route>
              <Route exact path="/Users" element={<Users />}></Route>
              <Route exact path="/NotIntrested" element={<NotInterested />}></Route>
              <Route exact path="/Groups" element={<Group />}></Route>
              <Route exact path="/RedFlaged" element={<RedFlaged />}></Route>
              <Route exact path="/SelfManaged" element={<SelfManaged />}></Route>
              <Route exact path="/CaochAssign" element={<CoachAssigned />}></Route>
              <Route exact path="/CoachListing" element={<CoachListing />}></Route>
              <Route exact path="/Resource" element={<Resource />}></Route>
              <Route exact path="/AddGroup" element={<AddGroup />}></Route>
              <Route exact path="/CreateCoach" element={<CoachInsert />}></Route>
              <Route exact path="/AddResource" element={<AddRescource />}></Route>
              <Route exact path="/Category" element={<Category />}></Route>
              <Route exact path="/UpsertCategory" element={<UpsertCategory />}></Route>
              <Route exact path="/Gender" element={<Gender />}></Route>
              <Route exact path="/UpsertGender" element={<UpsertGender />}></Route>
              <Route exact path="/Inquire" element={<Inquire />}></Route>
              <Route exact path="/UpsertInquire" element={<UpsertInquire />}></Route>
              <Route exact path="/Program" element={<Program />}></Route>
              <Route exact path="/UpsertProgram" element={<UpsertProgram />}></Route>
              <Route exact path="/ProgramType" element={<ProgramType />}></Route>
              <Route exact path="/UpsertProgramType" element={<UpsertProgramType />}></Route>
              <Route exact path="/RiskOfProgression" element={<RiskOfProgression />}></Route>
              <Route exact path="/UpsertRiskOfProgression" element={<UpsertRiskOfProgression />}></Route>
              <Route exact path="/Country" element={<Country />}></Route>
              <Route exact path="/UpsertCountry" element={<UpsertCountry />}></Route>
              <Route exact path="/Role" element={<Role />}></Route>
              <Route exact path="/UpsertRole" element={<UpsertRole />}></Route>
              <Route exact path="/Subscription" element={<Subscription />}></Route>
              <Route exact path="/UpsertSubscription" element={<UpsertSubscription />}></Route>
              <Route exact path="/Topic" element={<Topic />}></Route>
              <Route exact path="/UpsertTopic" element={<UpsertTopic />}></Route>
              <Route exact path="/UserStatus" element={<UserStatus />}></Route>
              <Route exact path="/UpsertUserStatus" element={<UpsertUserStatus />}></Route>
              <Route exact path="/UserType" element={<UserType />}></Route>
              <Route exact path="/UpsertUserType" element={<UpsertUserType />}></Route>
              <Route exact path="/Master" element={<Utilities />}>
              <Route path='Category' element={<Category />}></Route>
              <Route path='Gender' element={<Gender />}></Route>
              <Route path='Inquire' element={<Inquire />}></Route>
              <Route path='Program' element={<Program />}></Route>
              <Route path='ProgramType' element={<ProgramType />}></Route>
              <Route path='RiskOfProgression' element={<RiskOfProgression />}></Route>
              <Route path='Role' element={<Role />}></Route>
              <Route path='Subscription' element={<Subscription />}></Route>
              <Route path='Topic' element={<Topic />}></Route>
              <Route path='UserStatus' element={<UserStatus />}></Route>
              <Route path='UserType' element={<UserType />}></Route>
              <Route path='Country' element={<Country />}></Route>
              </Route>
            </Routes>
          </Router>
        </main>
      </div>
    </div>
  );
}

export default App;
