import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table } from "antd";
import "antd/dist/antd.css";
import { apibaseUrl, getCategoryListApi } from "../Helpers/ApiUrlHelper";

export default function Category() {
  const [categoryList, setCategoryList] = useState([]);
  const [pageSizeValue, setPageSizeValue] = useState(10);
  const [loading, setLoading] = useState(false);
  const [pageValue, setPageValue] = useState(1);
  const [totalCount, setTotalCount] = useState(10);

  const Columns = [
    {
      title: "S.No",
      dataIndex: "id",
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
      title: "Description",
      dataIndex: "description",
      sorter: (record1, record2) => {
        return record1.rowCount > record2.rowCount;
      },
    },

    {
      title: "SortOrder",
      dataIndex: "sortOrder",
      sorter: (record1, record2) => {
        return record1.rowCount > record2.rowCount;
      },
    },

    {
      title: "Is Default",
      dataIndex: "isDefault",
      sorter: (record1, record2) => {
        return record1.rowCount > record2.rowCount;
      },
    },
  ];

  const GetCategoryList = () => {
    axios.get(apibaseUrl + getCategoryListApi).then((resp) => {
        setCategoryList(resp.data.response);
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
          <div className="col-md-12">
            <Table
              columns={Columns}
              dataSource={categoryList}
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
