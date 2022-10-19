import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav id="sidebar" className="sidebar-wrapper">
    <div className="sidebar-content" data-simplebar style={{ "height": "calc(100% - 60px)" }}>
        <div className="sidebar-brand">
            <h4>MyArthritisRx</h4>
        </div>
        <ul className="sidebar-menu pt-3">
            <li><Link to="/ContactUs"><i className="uil uil-dashboard me-2 d-inline-block" />ContactUs</Link></li>
            <li><Link to="/Referral"><i className="uil-user me-2 d-inline-block" />Referral</Link></li>
            <li><Link to="/UserListing"><i className="uil-user me-2 d-inline-block" />User Listing</Link></li>
            <li><Link to="/Users"><i className="uil-user me-2 d-inline-block" />Users</Link></li>
            <li><Link to="/NotIntrested"><i className="uil-user me-2 d-inline-block" />Not Intrested</Link></li>
            <li><Link to="/Groups"><i className="uil-user me-2 d-inline-block" />Groups</Link></li>
            <li><Link to="/RedFlaged"><i className="uil-user me-2 d-inline-block" />Red Flaged</Link></li>
            <li><Link to="/SelfManaged"><i className="uil-user me-2 d-inline-block" />Self Managed</Link></li>
            <li><Link to="/CaochAssign"><i className="uil-user me-2 d-inline-block" />Caoch Assigned</Link></li>
            <li><Link to="/CoachListing"><i className="uil-user me-2 d-inline-block" />Caoch Listing</Link></li>
            <li><Link to="/Resource"><i className="uil-user me-2 d-inline-block" />Resource</Link></li>
 
           
        </ul>
        {/* sidebar-menu  */}
    </div>
    {/* sidebar-content  */}
    <ul className="sidebar-footer list-unstyled mb-0">
        <li className="list-inline-item mb-0 ms-1">
            <a href="#" className="btn btn-icon btn-pills btn-soft-primary">
                <i className="uil uil-comment icons" />
            </a>
        </li>
    </ul>
</nav>
  )
}
