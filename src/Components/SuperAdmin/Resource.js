import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { apibaseUrl, deleteResourceApi, resourceListApi } from '../../Helpers/ApiUrlHelper';
import { Link } from 'react-router-dom';
import { Table } from 'antd';
import 'antd/dist/antd.css';

export default function Resource() {

  const [resourceList, setResourceList] = useState([]);
  const [pageSizeValue, setPageSizeValue] = useState(10);
  const [loading, setLoading] = useState(false);
  const [pageValue, setPageValue] = useState(1);
  const [totalCount, setTotalCount] = useState(10);

  const Paging = (page, pagesize) => {
    setPageSizeValue(pagesize);
    setPageValue(page);
  }

  const columns = [
    {
      title: 'Coach',
      dataIndex: 'coachName',
      sorter: (record1, record2) => {
        return record1.coachName > record2.coachName
      }
    },
    {
      title: 'Document',
      dataIndex: 'documentName',
      sorter: (record1, record2) => {
        return record1.documentName > record2.documentName
      }
    },
    {
      title: 'Document Link',
      dataIndex: 'documentPath',
      sorter: (record1, record2) => {
        return record1.documentPath > record2.documentPath
      }
    },
    {
      title: 'Added On',
      dataIndex: 'createdDate',
      sorter: (record1, record2) => {
        return record1.createdDate > record2.createdDate
      },
      render: ((createdDate) => createdDate.split('T')[0])
    },
    {
      title: "Action",
      render: (record) => (<><button type="button" onClick={() => DeleteResource(record)}>Delete</button>
        <Link to={`/AddResource?id=${record.id}`}>Edit</Link></>)
    },
  ];

  useEffect(() => {
    GetResourceList();
  }, [pageValue])

  const GetResourceList = () => {
    axios.get(apibaseUrl + resourceListApi).then(resp => {
      setResourceList(resp.data.response);
      setTotalCount(resp.data.response[0].totalCount);
    })
  }

  const DeleteResource = (id) => {
    if (window.confirm("Are you want to delete the record ?")) {
      axios.get(apibaseUrl + deleteResourceApi + id).then(resp => {
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
            {/* <table className="table table-bordered">
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
            </table> */}
            <Table
              columns={columns}
              dataSource={resourceList}
              pagination={{
                pageSize: pageSizeValue,
                total: totalCount,
                onChange: (page, pageSize) => {
                  Paging(page, pageSize);
                },
              }}
            ></Table>
          </div>
        </div>
      </div>
    </div>
  )
}
