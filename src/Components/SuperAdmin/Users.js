import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import "antd/dist/antd.css";
import {
  apibaseUrl,
  ChangeUserInterestApi,
  getUserListDetailsApi,
  getUserListingdetailsApi,
} from "../../Helpers/ApiUrlHelper";

export default function Users() {
  const [pageValue, setPageValue] = useState(1);
  const [pageSizeValue, setPageSizeValue] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [userDetails, setUserDetails] = useState([]);
  const [name, setName] = useState("");

  const Paging = (page, pagesize) => {
    setPageSizeValue(pagesize);
    setPageValue(page);
  }

  const Column = [
    {
      title: "S.No",
      dataIndex: "rowCount",
      sorter: (record1, record2) => {
        return record1.rowCount > record2.rowCount;
      },
    },

    {
      title: "Name",
      dataIndex: "name",
      sorter: (record1, record2) => {
        return record1.rowCount > record2.rowCount;
      },
    },

    {
      title: "Email",
      dataIndex: "email",
      sorter: (record1, record2) => {
        return record1.email > record2.email;
      },
    },

    {
      title: "Date Of Registration",
      dataIndex: "createdDate",
      sorter: (record1, record2) => {
        return record1.createdDate > record2.createdDate;
      },
      render: (createdDate) => createdDate.split("T")[0],
    },

    {
      title: "Intake Completed",
      dataIndex: "inTakeCompletedDate",
      sorter: (record1, record2) => {
        return record1.inTakeCompletedDate > record2.inTakeCompletedDate;
      },
      render: (inTakeCompletedDate) =>
        inTakeCompletedDate == "0001-01-01T00:00:00"
          ? ""
          : inTakeCompletedDate.split("T")[0],
    },

    {
      title: "Risk of Progression",
      dataIndex: "riskOfProgression",
      sorter: (record1, record2) => {
        return record1.riskOfProgression > record2.riskOfProgression;
      },
    },

    {
      title: "Severity Name",
      dataIndex: "severityName",
      sorter: (record1, record2) => {
        return record1.severityName > record2.severityName;
      },
    },

    {
      title: "Program",
      dataIndex: "programName",
      sorter: (record1, record2) => {
        return record1.programName > record2.programName;
      },
    },

    {
      title: "Status",
      dataIndex: "userStatus",
      sorter: (record1, record2) => {
        return record1.userStatus > record2.userStatus;
      },
    },

    {
      title: "Assign Group",
      dataIndex: "groupName",

      render: (record) => {
        return (
          <>
            <button onClick={() => AssignGroup(record)}>Assign Group</button>
          </>
        );
      },
    },

    {
      title: "Review",
      dataIndex: "reviewName",
      sorter: (record1, record2) => {
        return record1.reviewName > record2.reviewName;
      },
    },

    {
      title: "Completion",
      dataIndex: "completionPercentage",
      sorter: (record1, record2) => {
        return record1.completionPercentage > record2.completionPercentage;
      },
      render: (completionPercentage) => completionPercentage + "%",
    },

    {
      title: "Intrested",
     
      sorter: (record1, record2) => {
        return record1.isIntrested > record2.isIntrested;
      },
      render: (record) => {
        debugger
        return (
          <>
          {
            record.isIntrested===true ? 
            ( <input type='checkbox' onChange={()=>ChangeInterest(record)} checked='checked'/>)
            :( <input type='checkbox' />)
          }

          </>
        );
      },
    },
  ];

  useEffect(() => {
    GetUserDetails();
  }, [pageValue]);

  const GetUserDetails = () => {
    axios
      .post(apibaseUrl + getUserListingdetailsApi, {
        isInterested: true,
        firstName: "",
        lastName: "",
        email: "",
        statusId: 0,
        programId: 0,
        caseNumber: "",
        pageNumber: 1,
        pageSize: 10,
        sortColumn: "",
        sortOrder: "",
      })
      .then((resp) => {
        setUserDetails(resp.data.response);
        setTotalCount(resp.data.response[0].totalCount);
      });
  };

  const AssignGroup = (record) => {
    debugger;
  };

  const SearchWithParams = () => {
    GetUserDetails(name);
  };

  const ChangeInterest=(record)=>{
    debugger
    let userInterest={
      userId: record.id,
      status:false
    };
    if(window.confirm("Are you sure want to change status ?")){
      axios.post(apibaseUrl+ChangeUserInterestApi, userInterest).then(resp=>{
        window.alert(resp.data.message);
        GetUserDetails();
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
          <div className="col-md-12" style={{ marginTop: "10px" }}>
            <div className="col-md-3 form-group">
              <label>Name</label>
              <input
                type="text"
                onClick={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="search ..."
              ></input>
            </div>
            <div className="col-md-3 form-group">
              <label>Email :</label>
              <input
                type="text" name="email"
                onClick={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="email..."
              ></input>
            </div>
            <div className="col-md-3 form-group">
              <label>Status</label>
              <input
                type="text"
                onClick={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="search ..."
              ></input>
            </div>
            
            
            <div className="col-md-3 form-group">
              <label>Program</label>
              <input
                type="text"
                onClick={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="search ..."
              ></input>
            </div>

            <div className="col-md-3 form-group">
            <label>Case Number</label>
              <input
                type="text"
                onClick={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="case number ..."
              ></input>
              </div>

            <div className="col-md-3 form-group">
              <button
                onClick={() => SearchWithParams()}
                className="btn btn-success"
              >
                Search
              </button>
            </div>
            <div className="col-md-3 form-group">
              <button className="btn btn-success"
              >
                Display All
              </button>
            </div>

            <div className="col-md-3">
            <button className="btn btn-success">Add User</button>
          </div>
          <div className="col-md-12">
          <Table columns={Column} dataSource={userDetails}
          pagination={{
            pageSize: pageSizeValue,
            total: totalCount,
            onChange: (page, pageSize) => {
              Paging(page, pageSize);
            },
          }}></Table>
          </div>

          </div>
          </div>
        </div>
      </div>
  );
}
