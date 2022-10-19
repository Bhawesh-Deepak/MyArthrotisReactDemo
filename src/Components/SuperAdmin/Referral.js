import React,{useState,useEffect} from 'react';
import axios from 'axios';
import { apibaseUrl, ReferralListApi } from '../../Helpers/ApiUrlHelper';
import {Table} from 'antd';
import 'antd/dist/antd.css';

export default function Referral() {

  const [referralList, setReferralList]= useState([]);
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
      title:'S.No',
      dataIndex:'rowCount',
      sorter:(record1, record2)=>{
        return record1.rowCount>record2.rowCount
      }
    },
    {
      title:'Email',
      dataIndex:'referrByEmail',
      sorter:(record1, record2)=>{
        return record1.referrByEmail>record2.referrByEmail
      }
    },
    {
      title:'Referral Email',
      dataIndex:'referrToEmail',
      sorter:(record1, record2)=>{
        return record1.referrToEmail>record2.referrToEmail
      }
    },
    {
      title:'Created On',
      dataIndex:'createdDate',
      sorter:(record1, record2)=>{
        return record1.createdDate>record2.createdDate
      },
      render:((createdDate)=> createdDate.split('T')[0])
    },
  ];

  useEffect(()=>{
    GetReferralDetails();
  },[pageValue])

  const GetReferralDetails=()=>{
    axios.post(apibaseUrl+ReferralListApi,
  {  
    "fromEmail": "",
    "toEmail": "",
    "startDate": null,
    "endDate": null,
    "pageNumber": pageValue,
    "pageSize": pageSizeValue,
    "sortColumn": "CreatedDate",
    "sortOrder": "1"
  }
    ).then(resp=>{
      setTotalCount(resp.data.response[0].totalCount);
      setReferralList(resp.data.response);
    })
  }



  return (
    <div
    className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
    style={{ "margin-top": "50px" }}
  >
    <div className="row" style={{ marginBottom: "30px" }}>
      <div className="row" style={{ marginBottom: "10px" }}>

      <div className="col-md-12">
            <div className="col-md-2 form-group">
              <label>Email :</label>
              <input type="text" name="email"
               className="form-control"></input>
            </div>
            <div className="col-md-2 form-group">
              <label>Refferal Email:</label>
              <input type="text" className="form-control"></input>
            </div>
            <div className="col-md-2 form-group">
              <label>Start Date :</label>
              <input type="Date" className="form-control"></input>
            </div>
            <div className="col-md-2 form-group">
              <label>End Date :</label>
              <input type="Date" className="form-control"></input>
            </div>
            <div className="col-md-3 form-group">
              <button className="btn btn-success"  style={{ marginTop: "20px" }}>
                Search
              </button>{" "}
              &nbsp;&nbsp;
              <button className="btn btn-success" style={{ marginTop: "20px" }}>
                Downlaod
              </button>
            </div>
          </div>

      <div className="col-md-12">
            {/* <table className="table table-bordered">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Email</th>
                  <th>Referral Email</th>
                  <th>Created On</th>
                </tr>
              </thead>
              <tbody>
                {referralList.map((data, index) => (
                  <tr>
                    <td>{index}</td>
                    <td>{data.referrByEmail}</td>
                    <td>{data.referrToEmail}</td>
                    <td>{data.createdDate.split('T')[0]}</td>
                   
                  </tr>
                ))}
              </tbody>
            </table> */}

            <Table 
            columns={columns} 
            dataSource={referralList}
            pagination={{
              pageSize:pageSizeValue,
              total:totalCount,
              onChange:(page, pageSize)=>{Paging(page,pageSize)}
              
            }}
            >

            </Table>
          </div>
      </div>
    </div>
  </div>
  )
}
