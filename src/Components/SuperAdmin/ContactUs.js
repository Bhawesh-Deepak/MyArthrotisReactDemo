import React, { useState, useEffect } from "react";
import axios from "axios";
import { apibaseUrl, apiContactUsList } from "../../Helpers/ApiUrlHelper";

export default function ContactUs() {
  const [contactList, setContactList] = useState([]);
  const [emailSearch, setEmailSearch]= useState();


  useEffect(() => {
    GetContactList();
  }, []);

  const GetContactList = () => {
    debugger;
    axios
      .post(apibaseUrl + apiContactUsList, {
        pageSize: 10,
        pageIndex: 1,
        sortBy: "createdDate",
        sortOrder: 1,
        email: emailSearch,
        startDate: null,
        endDate: null,
        totalRecords: 0,
      })
      .then((resp) => {
        setContactList(resp.data.response);
      });
  };

  const SearchConatctUs=()=>{
    GetContactList();
  }

  return (
    <div
      className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
      style={{ "margin-top": "50px" }}
    >
      <div className="row" style={{ marginBottom: "30px" }}>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-12">
            <div className="col-md-3 form-group">
              <label>Email :</label>
              <input type="text" name="email" value={emailSearch} onClick={(e)=> setEmailSearch(e.target.value)}
               className="form-control"></input>
            </div>
            <div className="col-md-3 form-group">
              <label>Start Date :</label>
              <input type="Date" className="form-control"></input>
            </div>
            <div className="col-md-3 form-group">
              <label>End Date :</label>
              <input type="Date" className="form-control"></input>
            </div>
            <div className="col-md-3 form-group">
              <button className="btn btn-success" onClick={()=> SearchConatctUs()} style={{ marginTop: "20px" }}>
                Search
              </button>{" "}
              &nbsp;&nbsp;
              <button className="btn btn-success" style={{ marginTop: "20px" }}>
                Downlaod
              </button>
            </div>
          </div>

          <div className="col-md-12">
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Inquiry Type</th>
                  <th>Email</th>
                  <th>Country</th>
                  <th>City</th>
                  <th>ZipCode</th>
                </tr>
              </thead>
              <tbody>
                {contactList.map((data, index) => (
                  <tr>
                    <td>{data.id}</td>
                    <td>{data.name}</td>
                    <td>{data.inquiry}</td>
                    <td>{data.email}</td>
                    <td>{data.country}</td>
                    <td>{data.city}</td>
                    <td>{data.zipCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
