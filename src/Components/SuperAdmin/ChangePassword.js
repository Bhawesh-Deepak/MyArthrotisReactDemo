import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ValidationHelper from "../../Helpers/ValidationHelper";
import { apibaseUrl, UpdatePasswordApi } from "../../Helpers/ApiUrlHelper";

export default function ChangePassword() {
  const initialValues = {
    userId: 1,
    userTypeId: 1,
    password: "",
    confirmPassword: "",
  };

  const validationSchema = Yup.object({
    password: Yup.string()
      .required("Please enter password !")
      .min(6, "Password is too small !"),
    confirmPassword: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Password or confirm Password do not match !"
    ),
  });

  const UpdatePassword=(values,{resetForm})=>{
    debugger
    values.userId=1;
    values.userTypeId=1;
    let config={
      headers: { Authorization: `Bearer ${window.sessionStorage.getItem('token')}` }
    }
    axios.post(apibaseUrl+UpdatePasswordApi,values,config).then(resp=>{
      window.alert(resp.data.message);
    })
    resetForm({values:''});
  }

  return (
    <div
      className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
      style={{ "margin-top": "50px" }}
    >
      <div className="row" style={{ marginBottom: "30px" }}>
        <div className="row" style={{ marginBottom: "10px" }}>
          <div className="col-md-9"></div>
          <div className="col-md-3">
            <button className="btn btn-success">Add User</button>
          </div>
          <div className="col-md-12">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={UpdatePassword}
            >
              <Form>
                <div className="col-md-12">
                  <div className="col-md-6 form-group">
                    <label>New Password</label>
                    <Field
                      className="form-control"
                      name="password"
                      type="password"
                    ></Field>
                    <ValidationHelper name='password'></ValidationHelper>
                  </div>
                  <div className="col-md-6 form-group">
                    <label>Confirm Password</label>
                    <Field
                      className="form-control"
                      name="confirmPassword"
                      type="password"
                    ></Field>
                    <ValidationHelper name='confirmPassword'></ValidationHelper>
                  </div>
                </div>
                <div className="col-md-12">
                    <div className="col-md-9"></div>
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-success">Update</button>
                    </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
