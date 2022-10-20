import React, { useEffect, useState } from "react";
import axios from "axios";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  apibaseUrl,
  CoachListApi,
  createGroupApi,
  ProgramListApi,
  ProgramTypeListApi,
} from "../../Helpers/ApiUrlHelper";
import { ProgramTypeValidation } from "../../Helpers/MessageHelper";
import ValidationHelper from "../../Helpers/ValidationHelper";

export default function AddGroup() {
  const [progrmList, setProgramList] = useState([]);
  const [programTypeList, setProgramTypeList] = useState([]);
  const [coachList, setCoachList] = useState([]);

  const groupInitialValue = {
    id: 0,
    programTypeId: "",
    programId: "",
    coachId: "",
    groupName: "",
    startDate: "",
    endDate: "",
    description: "",
    createdBy: 1,
  };

  const [initialValue, setInitialValue] = useState(groupInitialValue);

  const validationSchema = Yup.object({
    programTypeId: Yup.string().required("Program Type Id is required"),
    programId: Yup.string().required(ProgramTypeValidation),
    coachId: Yup.string().required("Coach is required"),
    groupName: Yup.string().required("Group name is required"),
    startDate: Yup.date().required("Start Date is required !"),
    endDate: Yup.date().required("End Date is required !")
      .min(Yup.ref('startDate'),"End date can not before start date !"),
  });

  useEffect(() => {
    GetCoachList();
    GetProgramList();
    GetProgramTypeList();
  }, []);

  const GetCoachList = () => {
    axios
      .post(apibaseUrl + CoachListApi, {
        pageSize: 10000,
        pageIndex: 1,
        totalRecords: 0,
        sortBy: "",
        sortOrder: 1,
      })
      .then((resp) => {
        setCoachList(resp.data.response);
      });
  };

  const GetProgramList = () => {
    axios.get(apibaseUrl + ProgramListApi).then((resp) => {
      setProgramList(resp.data.response);
    });
  };

  const GetProgramTypeList = () => {
    axios.get(apibaseUrl + ProgramTypeListApi).then((resp) => {
      setProgramTypeList(resp.data.response);
    });
  };

  const OnSubmit=(values,{resetForm})=>{
    values.programId= parseInt(values.programId);
    values.programTypeId= parseInt(values.programTypeId);
    values.coachId= parseInt(values.coachId);

    axios.post(apibaseUrl+createGroupApi, values).then(resp=>{
        window.alert(resp.data.message);
        resetForm({values:''});
    })
    console.log(values);
  }

  return (
    <div
      className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
      style={{ "margin-top": "50px" }}
    >
      <div className="row" style={{ marginBottom: "30px" }}>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-12">
            <h5>Add Group Details</h5>
          </div>
          <Formik
            initialValues={initialValue}
            validationSchema={validationSchema} onSubmit={(values,{resetForm})=>OnSubmit(values, {resetForm})}
          >
            <Form>
              <div className="col-md-12">
                <div className="col-md-4 form-group">
                  <label>Group Name:</label>
                  <Field
                    name="groupName"
                    type="text"
                    className="form-control"
                  ></Field>
                  <ValidationHelper name="groupName"></ValidationHelper>
                </div>
                <div className="col-md-4 form-group">
                  <label>Program Type:</label>
                  <Field
                    as="select"
                    name="programTypeId"
                    className="form-control"
                  >
                    <option value="">--Select--</option>
                    {programTypeList.map((data, index) => (
                      <option value={data.id}>{data.name}</option>
                    ))}
                  </Field>
                  <ValidationHelper name="programTypeId"></ValidationHelper>
                </div>
                <div className="col-md-4 form-group">
                  <label>Program:</label>
                  <Field as="select" name="programId" className="form-control">
                    <option value="">--Select--</option>
                    {progrmList.map((data, index) => (
                      <option value={data.id}>{data.name}</option>
                    ))}
                  </Field>
                  <ValidationHelper name="programId"></ValidationHelper>
                </div>
                <div className="col-md-4 form-group">
                  <label>Start Date:</label>
                  <Field
                    type="date"
                    name="startDate"
                    className="form-control"
                  ></Field>
                  <ValidationHelper name="startDate"></ValidationHelper>
                </div>
                <div className="col-md-4 form-group">
                  <label>End Date:</label>
                  <Field
                    type="date"
                    name="endDate"
                    className="form-control"
                  ></Field>
                  <ValidationHelper name="endDate"></ValidationHelper>
                </div>
                <div className="col-md-4 form-group">
                  <label>Assign Coach:</label>
                  <Field as="select" name="coachId" className="form-control">
                    <option value="">--Select--</option>
                    {coachList.map((data, index) => (
                      <option value={data.id}>{data.userName}</option>
                    ))}
                  </Field>
                  <ValidationHelper name="coachId"></ValidationHelper>
                </div>

                <div className="col-md-4 form-group">
                  <label>About Group:</label>
                  <Field name="description" className="form-control"></Field>
                </div>
              </div>
              <div className="col-md-12">
                <div className="col-md-10"></div>
                <div className="col-md-2">
                    <button className="btn btn-success">Create</button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
