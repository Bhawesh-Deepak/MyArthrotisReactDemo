import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import "antd/dist/antd.css";
import {
  apibaseUrl,
  downloadUserListExcel,
  getUserListDetails,
  getUserListDetailsApi,
} from "../../Helpers/ApiUrlHelper";
import ArthritisModal from "../Common/ArthritisModal";

export default function UserListing() {
  const [userList, setUserList] = useState([]);
  const [pageValue, setPageValue] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pageSizeValue, setPageSizeValue] = useState(10);
  const [totalCount, setTotalCount] = useState(0);
  const [name, setName] = useState("");
  const [show, setShow]= useState(true);

  const Paging = (page, pagesize) => {
    setPageSizeValue(pagesize);
    setPageValue(page);
  };

  const columns = [
    {
      title: "S.No",
      dataIndex: "rowNumber",
      sorter: (record1, record2) => {
        return record1.rowNumber > record2.rowNumber;
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
      title: "Email",
      dataIndex: "email",
      sorter: (record1, record2) => {
        return record1.name > record2.name;
      },
    },
    {
      title: "News",
      dataIndex: "newsLetterSubscription",
      sorter: (record1, record2) => {
        return record1.name > record2.name;
      },
      render: (newsLetterSubscription) =>
        newsLetterSubscription ? "Yes" : "No",
    },

    {
      title: "Blog",
      dataIndex: "blogSubscription",
      sorter: (record1, record2) => {
        return record1.name > record2.name;
      },
      render: (blogSubscription) => (blogSubscription ? "Yes" : "No"),
    },

    {
      title: "Event",
      dataIndex: "eventSubscription",
      sorter: (record1, record2) => {
        return record1.name > record2.name;
      },
      render: (eventSubscription) => (eventSubscription ? <b>Yes</b> : "No"),
    },

    {
      title: "Added On",
      dataIndex: "createdDate",
      sorter: (record1, record2) => {
        return record1.name > record2.name;
      },
      render: (createdDate) => createdDate.split("T")[0],
    },
  ];

  useEffect(() => {
    GetUserList();
  }, [pageValue]);

  const GetUserList = (nameSearch = "") => {
    axios
      .post(apibaseUrl + getUserListDetailsApi, {
        firstName: nameSearch,
        lastName: "",
        email: "",
        startDate: null,
        endDate: null,
        blogSubscription: 0,
        eventSubscription: 0,
        newsLetterSubscription: 0,
        pageNumber: pageValue,
        pageSize: pageSizeValue,
        sortColumn: "CreatedDate",
        sortOrder: "ASC",
      })
      .then((resp) => {
        setUserList(resp.data.response);
        setTotalCount(resp.data.response[0].totalCount);
      });
  };

  const SearchWithParams = () => {
    GetUserList(name);
  };

  const DownloadExcelFile = () => {
    axios({
      url: apibaseUrl + downloadUserListExcel,
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "UserListingReport.xls");
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
              <label>Start Date </label>
              <input
                type="Date"
                // onClick={(e) => setName(e.target.value)}
                className="form-control"
                // placeholder="search ..."
              ></input>
            </div>
            <div className="col-md-3 form-group">
              <label>End Date</label>
              <input
                type="Date"
                // onClick={(e) => setName(e.target.value)}
                className="form-control"
                // placeholder="search ..."
              ></input>
            </div>
            <div className="col-md-3 form-group">
              <label>Subscriptions</label>
              <input
                type="text"
                onClick={(e) => setName(e.target.value)}
                className="form-control"
                placeholder="search ..."
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
              <button
                onClick={() => DownloadExcelFile()}
                className="btn btn-success"
              >
                Download Xls
              </button>
            </div>
          </div>

          <div className="col-md-12">
            <Table
              columns={columns}
              dataSource={userList}
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
