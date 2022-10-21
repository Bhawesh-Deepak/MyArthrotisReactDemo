import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import "antd/dist/antd.css";
import { apibaseUrl, GetCountryListApi } from "../../Helpers/ApiUrlHelper";

export default function Country() {
  const Columns = [
    {
      title: "S.No",
      dataIndex: "id",
      sorter: (record1, record2) => {
        return record1.id > record2.id;
      },
    },

    {
      title: "Name",
      dataIndex: "name",
      sorter: (record1, record2) => {
        return record1.name > record2.name;
      },
    //   filteredValue: [searchText],
    //   onFilter: (value, record) => {
    //     return String(record.name).toLowerCase().includes(value.toLowerCase());
    //   },
    },

    {
      title: "Code",
      dataIndex: "code",
      sorter: (record1, record2) => {
        return record1.description > record2.description;
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
        console.log(record1);
        return record1.isDefault > record2.isDefault;
      },
      render: (isDefault) => (isDefault == true ? "Yes" : "No"),
    },

    {
      title: "Action",
      render: (record) => (
        <>
          <button type="button">
            Delete
          </button>
          
        </>
      ),
    },
  ];

  const [countryList, setCountryList]= useState([]);

  useEffect(()=>{
    GetCountryList();
  },[])

  const GetCountryList=()=>{
    axios.get(apibaseUrl+ GetCountryListApi).then(resp=>{
        setCountryList(resp.data.response);
    })
  }

  return (
    <div
      className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
      style={{ "margin-top": "50px" }}
    >
      <div className="row" style={{ marginBottom: "30px" }}>
        <div className="col-md-12">
          <div className="col-md-6">
            <label>Search..</label>
            <input
              className="form-control"
              placeholder="Search name.."
            
              style={{ marginBottom: "10px" }}
            ></input>
          </div>
          <div className="col-md-6">
            <div className="col-md-3">
              {/* <Link to="/UpsertCategpry" className="btn btn-success">
                Add{" "}
              </Link> */}
            </div>
          </div>
        </div>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-12">
            <Table columns={Columns} dataSource={countryList}></Table>
          </div>
        </div>
      </div>
    </div>
  );
}
