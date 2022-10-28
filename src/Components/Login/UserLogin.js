import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import ValidationHelper from "../../Helpers/ValidationHelper";
import { apibaseUrl, AuthenticateApi } from "../../Helpers/ApiUrlHelper";


export default function UserLogin() {

  const initialValues = {
    userName: "",
    password: "",
    userTypeId: 1,
  };

  const validationSchema = Yup.object({
    userName: Yup.string().required("User name is required !"),
    password: Yup.string().required("Password is required !"),
  });

  const Authenticate = (values, { resetForm }) => {
    axios.post(apibaseUrl + AuthenticateApi, values).then((resp) => {
        debugger
      if (resp.data.statusCode == 200) {
        window.sessionStorage.setItem("token", resp.data.response);
        window.location.href='/';
      }
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
            <h5>MyArthritis Rx Login</h5>
          </div>

          <div className="col-md-12">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={(values, { resetForm }) =>
                Authenticate(values, { resetForm })
              }
            >
              <Form>
                <div className="col-md-12 form-group">
                  <label>User Name:</label>
                  <Field className="form-control" name="userName"></Field>
                  <ValidationHelper name="userName"></ValidationHelper>
                </div>

                <div className="col-md-12 form-group">
                  <label>Password:</label>
                  <Field type='password' className="form-control" name="password"></Field>
                  <ValidationHelper name="password"></ValidationHelper>
                </div>

                <div className="col-md-8"></div>
                <div className="col-md-4">
                    <button type="submit" className="btn btn-success">Login</button>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
}
