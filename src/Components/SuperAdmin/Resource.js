import React,{useEffect, useState} from 'react';
import axios from 'axios';
import { apibaseUrl, deleteResourceApi, resourceListApi } from '../../Helpers/ApiUrlHelper';
import { Link } from 'react-router-dom';

export default function Resource() {

  const [resourceList,setResourceList ]= useState([]);

  useEffect(()=>{
    GetResourceList();
  },[])

  const GetResourceList=()=>{
    axios.get(apibaseUrl+resourceListApi).then(resp=>{
      setResourceList(resp.data.response);
    })
  }

  const DeleteResource=(id)=>{
    if(window.confirm("Are you want to delete the record ?")){
      axios.get(apibaseUrl+deleteResourceApi+id).then(resp=>{
        window.alert(resp.data.message);
        GetResourceList();
      })
    }
  }


  return (
    <div
    className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
    style={{ "margin-top": "50px" }}
  >
    <div className="row" style={{ marginBottom: "30px" }}>
      <div className="row" style={{ marginBottom: "10px" }}>
        <div className='col-md-9'></div>
        <div className='col-md-3'>
          <Link to='/AddResource' className='btn btn-success'>Add Resource</Link>
        </div>
        <div className='col-md-12'>
        <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Coach</th>
                  <th>Document</th>
                  <th>Document Link</th>
                  <th>Added On</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {resourceList.map((data, index) => (
                  <tr>
                    <td>{data.coachName}</td>
                    <td>{data.documentName}</td>
                    <td>{data.documentPath}</td>
                    <td>{data.createdDate.split('T')[0]}</td>
                    <td>
                      <Link to={`/AddResource?id=`+ data.id}>Edit</Link> | <a onClick={()=>DeleteResource(data.id)}>Delete</a>
                    </td>
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
