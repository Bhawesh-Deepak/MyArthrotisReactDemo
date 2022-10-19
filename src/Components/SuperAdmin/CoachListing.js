import React,{useState, useEffect} from 'react';
import axios  from 'axios';
import { apibaseUrl, CoachListApi } from '../../Helpers/ApiUrlHelper';
import { Link } from 'react-router-dom';

export default function CoachListing() {

  const [coachList, setCoachList]= useState([]);

  useEffect(()=>{
    GetCoachList();
  },[])

  const GetCoachList = () => {
    axios
      .post(apibaseUrl + CoachListApi, {
        pageSize: 10000,
        pageIndex: 1,
        totalRecords: 0,
        sortBy: "",
        sortOrder: 1,
      })
      .then((resp) => {
        setCoachList(resp.data.response);
      });
  };

  return (
    <div
    className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
    style={{ "margin-top": "50px" }}
  >
    <div className="row" style={{ marginBottom: "30px" }}>
      <div className="row" style={{ marginBottom: "10px" }}>
        <div className='col-md-9'>
        
        </div>
        <div className='col-md-3'>
        <Link to="/CreateCoach" className='btn btn-success'>Create Coach</Link>
        </div>
        <div className='col-md-12'>
        <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Account Status</th>
                </tr>
              </thead>
              <tbody>
                {coachList.map((data, index) => (
                  <tr>
                    <td>{data.id}</td>
                    <td>{data.userName}</td>
                    <td>{data.email}</td>
                    <td>{data.role}</td>
                    <td>{data.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
        </div>

      </div>
    </div>
  </div>
  )
}
