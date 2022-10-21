import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import Category from "./Category";
import axios from "axios";
import { apibaseUrl, GetMasterMenuLinkApi } from "../../Helpers/ApiUrlHelper";

export default function Utilities() {
  const [masterLink, setMasterLink] = useState([]);

  useEffect(() => {
    GetMasterLink();
  }, []);

  const GetMasterLink = () => {
    axios.get(apibaseUrl + GetMasterMenuLinkApi).then((resp) => {
      setMasterLink(resp.data.response);
    });
  };

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="col-md-8">
          <Outlet></Outlet>
        </div>

        <div className="col-md-4">
          <div
            className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
            style={{ "margin-top": "50px" }}
          >
            <div className="row" style={{ marginBottom: "30px" }}>
              <div className="col-md-12">
                <h4 style={{ "text-align": "center" }}>Master Search</h4>
              </div>
              <div className="col-md-12">
                <ul>
                  {masterLink.map((data, index) => (
                    <>
                    <hr/>
                      <li key={index}>
                        <Link activeClassName='active' to={data.link}>{data.displayName}</Link>
                      </li>
                    </>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
