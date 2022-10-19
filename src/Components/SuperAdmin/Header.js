import React from 'react'

export default function Header(props) {
  return (
    <div className="top-header">
    <div className="header-bar d-flex justify-content-between border-bottom">
        <div className="d-flex align-items-center">
            <a href="#" className="logo-icon">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6y-HrljkFNGLNLNbKGA_AHYb1r0mmGu5Jpg&usqp=CAU" height={50} className="small" alt />
                <span className="big">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6y-HrljkFNGLNLNbKGA_AHYb1r0mmGu5Jpg&usqp=CAU" height={24} className="logo-light-mode" alt />
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6y-HrljkFNGLNLNbKGA_AHYb1r0mmGu5Jpg&usqp=CAU" height={24} className="logo-dark-mode" alt />
                </span>
            </a>
            <a id="close-sidebar" onClick={() => props.OnToggle()} className="btn btn-icon btn-pills btn-soft-primary ms-2" href="#">
                <i className="uil uil-bars" />
            </a>
            <div className="search-bar p-0 d-none d-md-block ms-2">
                <div id="search" className="menu-search mb-0">

                </div>
            </div>
        </div>
        <ul className="list-unstyled mb-0">
            <li className="list-inline-item mb-0">
                <div className="dropdown dropdown-primary">
                    <button type="button" className="btn btn-pills btn-soft-primary dropdown-toggle p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="../assets/images/language/indian.png" className="avatar avatar-ex-small rounded-circle p-2" alt /></button>
                </div>
            </li>

            <li className="list-inline-item mb-0 ms-1">
                <div className="dropdown dropdown-primary">
                    <button type="button" className="btn btn-pills btn-soft-primary dropdown-toggle p-0" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6y-HrljkFNGLNLNbKGA_AHYb1r0mmGu5Jpg&usqp=CAU" className="avatar avatar-ex-small rounded-circle" alt /></button>
                    <div className="dropdown-menu dd-menu dropdown-menu-end bg-white shadow border-0 mt-3 py-3" style={{ "min-width": "200px" }}>
                        <a className="dropdown-item d-flex align-items-center text-dark" href="/">
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ6y-HrljkFNGLNLNbKGA_AHYb1r0mmGu5Jpg&usqp=CAU" className="avatar avatar-md-sm rounded-circle border shadow" alt />
                            <div className="flex-1 ms-2">
                                <span className="d-block mb-1">Super Admin</span>
                                <small className="text-muted">Appoinntment (AMS)</small>
                            </div>
                        </a>
                        <a className="dropdown-item text-dark" href="/"><span className="mb-0 d-inline-block me-1"><i className="uil uil-dashboard align-middle h6" /></span> Dashboard</a>

                        <div className="dropdown-divider border-top" />
                        <a className="dropdown-item text-dark" href="/"><span className="mb-0 d-inline-block me-1"><i className="uil uil-sign-out-alt align-middle h6" /></span> Logout</a>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</div>
  )
}
