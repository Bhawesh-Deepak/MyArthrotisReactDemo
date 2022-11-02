import React, { useState, useEffect } from "react";
import axios from "axios";
import { apibaseUrl, apiContactUsList,downloadContactUsListExcel} from "../../Helpers/ApiUrlHelper";
import {Table} from 'antd';
import 'antd/dist/antd.css';

export default function ContactUs() {

  const [contactList, setContactList] = useState([]);
  const [emailSearch, setEmailSearch] = useState();
  const [pageSizeValue, setPageSizeValue] = useState(10);
  const [loading, setLoading] = useState(false);
  const [pageValue, setPageValue] = useState(1);
  const [totalCount, setTotalCount] = useState(10);

  const Paging = (page, pagesize) => {
    setPageSizeValue(pagesize);
    setPageValue(page);
  };

  const columns = [
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
    },
    {
      title: "Inquire Type",
      dataIndex: "inquiry",
      sorter: (record1, record2) => {
        return record1.inquiry>record2.inquiry;
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
      title: "Country",
      dataIndex: "country",
      sorter: (record1, record2) => {
        return record1.country > record2.country;
      },
    },
    {
      title: "City",
      dataIndex: "city",
      sorter: (record1, record2) => {
        return record1.city > record2.city;
      },
    },
    {
      title: "ZipCode",
      dataIndex: "zipCode",
      sorter: (record1, record2) => {
        return record1.zipCode > record2.zipCode;
      },
    },
  ];

  useEffect(() => {
    GetContactList();
  }, [pageValue]);

  const GetContactList = () => {
    axios.post(apibaseUrl + apiContactUsList, {
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
        setTotalCount(resp.data.response[0].totalCount);
        setContactList(resp.data.response);
      });
  };

  const SearchConatctUs = () => {
    GetContactList();
  };

  const DownloadExcelFile = () => {
    axios({
      url: apibaseUrl + downloadContactUsListExcel,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ContactUsReport.xls");
      document.body.appendChild(link);
      link.click();
    });
  };

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
              <input
                type="text"
                name="email"
                value={emailSearch}
                onClick={(e) => setEmailSearch(e.target.value)}
                className="form-control"
              ></input>
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
              <button
                className="btn btn-success"
                onClick={() => SearchConatctUs()}
                style={{ marginTop: "20px" }}
              >
                Search
              </button>{" "}
              &nbsp;&nbsp;
              <button onClick={() => DownloadExcelFile()} 
              className="btn btn-success" style={{ marginTop: "20px" }}>
                Downlaod
              </button>
            </div>
          </div>

          <div className="col-md-12">
            {/* <table className="table table-bordered">
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
            </table> */}

            <Table
              columns={columns}
              dataSource={contactList}
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
  );
}
