import React,{useState, useEffect} from 'react';
import axios  from 'axios';
import { apibaseUrl, CoachListApi } from '../../Helpers/ApiUrlHelper';
import { Link } from 'react-router-dom';
import {Table} from 'antd';
import 'antd/dist/antd.css';

export default function CoachListing() {

  const [coachList, setCoachList]= useState([]);
  const [pageSizeValue, setPageSizeValue]= useState(10);
  const [loading, setLoading]= useState(false);
  const [pageValue, setPageValue]= useState(1);
  const [totalCount, setTotalCount]= useState(10);

  const Paging=(page, pagesize)=>{
    setPageSizeValue(pagesize);
    setPageValue(page);
  }

  const columns=[
    {
      title:'Id',
      dataIndex:'id',
      sorter:(record1, record2)=>{
        return record1.id>record2.id
      }
    },
    {
      title:'Name',
      dataIndex:'userName',
      sorter:(record1, record2)=>{
        return record1.userName>record2.userName
      }
    },
    {
      title:'Email',
      dataIndex:'email',
      sorter:(record1, record2)=>{
        return record1.email>record2.email
      }
    },
    {
      title:'Role',
      dataIndex:'role',
      sorter:(record1, record2)=>{
        return record1.role>record2.role
      }
    },
    {
      title:'Account Status',
      dataIndex:'status',
      sorter:(record1, record2)=>{
        return record1.status>record2.status
      }
    },
  ];

  useEffect(()=>{
    GetCoachList();
  },[pageValue])

  const GetCoachList = () => {
    axios.post(apibaseUrl + CoachListApi, {
        pageSize: 10000,
        pageIndex: 1,
        totalRecords: 0,
        sortBy: "",
        sortOrder: 1,
      })
      .then((resp) => {
        setCoachList(resp.data.response);
        setTotalCount(resp.data.response[0].totalCount);
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
        {/* <table className="table table-bordered">
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
            </table> */}
            <Table 
            columns={columns} 
            dataSource={coachList}
            pagination={{
              pageSize:pageSizeValue,
              total:totalCount,
              onChange:(page, pageSize)=>{Paging(page,pageSize)}
              
            }}
            ></Table>
        </div>

      </div>
    </div>
  </div>
  )
}
