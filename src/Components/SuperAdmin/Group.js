import React, { useState, useEffect } from "react";
import ArthritisModal from "../Common/ArthritisModal";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";
import axios from "axios";
import { apibaseUrl, GetGroupDetailsApi, getProgramTypeListApi } from "../../Helpers/ApiUrlHelper";
import { Select, Table } from "antd";
import "antd/dist/antd.css";

export default function Group() {
  const [show, setShow] = useState(false);
  const [groupDetails, setGroupDetails] = useState([]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [groupSearchParam, setGroupSearchParam]= useState(null);
  const [programType, setProgramType]= useState(null);
  const [coach, setCoach]= useState(null);
  const [isReload, setIsReload]= useState(1);
  const [programTypeList, setProgramTypeList]= useState([]);

  const GetProgramTypeList=()=>{
    axios.get(apibaseUrl + getProgramTypeListApi).then((resp) => {
      setProgramTypeList(resp.data.response);
  });
  }

  const GetGroupDetails = () => {
    axios
      .post(apibaseUrl + GetGroupDetailsApi, {
        pageSize: 10,
        pageIndex: 1,
        totalRecords: 0,
        sortBy: "Id",
        sortOrder: 1,
        groupName: groupSearchParam,
        coachName: coach,
        programTypeId: programType,
      })
      .then((resp) => {
        setGroupDetails(resp.data.response);
      });
  };

  useEffect(() => {
    GetGroupDetails();
    GetProgramTypeList();
  }, [isReload]);

  const SearchGroupDetail=()=>{
    let groupSearch= groupSearchParam;
    setIsReload((prev)=>prev+1);
    debugger
  }

  const ClearSearch=()=>{
    setProgramType('');
    setCoach(null);
    setGroupSearchParam(null);
    setIsReload((prev)=>prev+1);
  }

  const COLUMNS = [
    {
      title: "S.No",
      dataIndex: "rowNumber",
      sorter: (record1, record2) => {
        return record1.rowNumber > record2.rowNumber;
      },
    },

    {
      title: "Group Name",
      dataIndex: "groupName",
      sorter: (record1, record2) => {
        return record1.groupName > record2.groupName;
      },
    },

    {
      title: "Program Type",
      dataIndex: "programType",
      sorter: (record1, record2) => {
        return record1.programType > record2.programType;
      },
    },

    {
      title: "Start Date",
      dataIndex: "startDate",
      sorter: (record1, record2) => {
        return record1.startDate > record2.startDate;
      },
      render: (startDate) => startDate.split("T")[0],
    },

    {
      title: "End Date",
      dataIndex: "endDate",
      sorter: (record1, record2) => {
        return record1.endDate > record2.endDate;
      },
      render: (endDate) => endDate.split("T")[0],
    },

    {
      title: "UserName",
      dataIndex: "userName",
      sorter: (record1, record2) => {
        return record1.userName > record2.userName;
      },
    },

    {
      title: "Coach",
      dataIndex: "coachName",
      sorter: (record1, record2) => {
        return record1.coachName > record2.coachName;
      },
    },
  ];

  return (
    <div
      className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
      style={{ "margin-top": "50px" }}
    >
      <div className="row" style={{ marginBottom: "30px" }}>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-8">
            <div className="col-md-3 form-group">
              <label>Group Name</label>
              <input className="form-control" onChange={(e)=>setGroupSearchParam(e.target.value)} ></input>
            </div>
            <div className="col-md-3 form-group">
              <label>Program Type</label>
              <select className="form-control" onChange={(e)=>setProgramType(e.target.value)} >
                <option value={null}>-Select--</option>
                {
                  programTypeList.map((data, index)=>(<option value={data.id}>{data.name}</option>))
                }
              </select>
            </div>
            <div className="col-md-3 form-group">
              <label>Coach Name</label>
              <input className="form-control" onChange={(e)=>setCoach(e.target.value)} ></input>
            </div>

            <div className="col-md-3 form-group">
             <button type="button" onClick={()=>SearchGroupDetail()} className="btn btn-success">Search</button>
           
            </div>
          </div>
          <div className="col-md-4">
            <Link to="/AddGroup" className="btn btn-success">
              Add Group
            </Link>
          </div>
        </div>

        <div className="row" style={{ marginBottom: "30px" }}>
          <div className="col-md-12">
            <Table columns={COLUMNS} dataSource={groupDetails}></Table>
          </div>
        </div>
      </div>
    </div>
  );
}
