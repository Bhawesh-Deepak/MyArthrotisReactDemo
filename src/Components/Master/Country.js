import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import "antd/dist/antd.css";
import { apibaseUrl, deleteCountryApi, getCountryListApi } from "../../Helpers/ApiUrlHelper";
import { Link } from "react-router-dom";

export default function Country() {
  const [countryList, setCountryList] = useState([]);
 const [searchText,setSearchText] =useState('');
  const Columns = [
    {
      title: "S.No",
      dataIndex: "id",
      sorter: (record1, record2) => {
        return record1.id > record2.id;
      }
    },

    {
      title: "Name",
      dataIndex: "name",
      sorter: (record1, record2) => {
        return record1.name > record2.name;
      },
      filteredValue:[searchText]
      ,
      onFilter:(value, record)=>{
        return String(record.name).toLowerCase().includes(value.toLowerCase())
      }
    },

    {
      title: "Code",
      dataIndex: "code",
      sorter: (record1, record2) => {
        return record1.code > record2.code;
      },
    },

    {
      title: "SortOrder",
      dataIndex: "sortOrder",
      sorter: (record1, record2) => {
        return record1.sortOrder > record2.sortOrder;
      },
    },

    {
      title: "Is Default",
      dataIndex: "isDefault",
      sorter: (record1, record2) => {
        console.log(record1)
        return record1.isDefault > record2.isDefault;
       
      },
      render:(isDefault)=> (isDefault==true ? 'Yes': 'No')
    },

    {
      title: "Action",
      render:(record)=> (<><button type="button" onClick={()=> DeleteRecord(record)}>Delete</button>
        <Link to={`/UpsertCountry?id=${record.id}`}>Edit</Link></>)
    },
  ];

   const  DeleteRecord=(record)=>{
      if(window.confirm(`Are you sure want to delete ${record.name} ?`)){
        axios.get(apibaseUrl+deleteCountryApi+ record.id).then(resp=>{
          alert(resp.data.message);
          GetCountryList();
        })
      }
   }
  useEffect(()=>{
        GetCountryList();
  },[])

  const GetCountryList = () => {
    axios.get(apibaseUrl + getCountryListApi).then((resp) => {
        setCountryList(resp.data.response);
    });
  };

  return (
    <div
      className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
      style={{ "margin-top": "50px" }}
    >
      <div className="row" style={{ marginBottom: "30px" }}>
        <div className="col-md-12">
          <div className="col-md-6">
            <label>Search..</label>
            <input className="form-control" placeholder="Search name.."
              onChange={(e)=> setSearchText(e.target.value) } 
            style={{'marginBottom':'10px'}}></input>
          </div>
          <div className="col-md-6">
          <div className="col-md-3">
              <Link to='/UpsertCountry' className="btn btn-success">Add </Link>
            </div>
          </div>
        </div>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-12">
            <Table
              columns={Columns}
              dataSource={countryList}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  );
}
