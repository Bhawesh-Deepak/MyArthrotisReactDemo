import React, { useState, useEffect } from "react";
import axios from "axios";
import * as Yup from "yup";
import { Form, Formik, Field, ErrorMessage } from "formik";
import ValidationHelper from "../../Helpers/ValidationHelper";
import { apibaseUrl, getCountryListApi, GetGenderByIdApi, getGenderListApi, UpdateUserProfile } from "../../Helpers/ApiUrlHelper";

export default function EditProfile() {
  const initialValue = {
    id: 0,
    firstName: "",
    lastName: "",
    dateOfBirth: "",
    gender: "",
    height: "",
    weight: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    countryId: "",
    phoneNumber: "",
    emailId: "",
  };

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required !"),
    lastName: Yup.string().required("Last name is required !"),
    dateOfBirth: Yup.string().required("Date of Birth is required !"),
    gender: Yup.string().required("Gender is required !"),
    height: Yup.string().required("Height is required !"),
    weight: Yup.string().required("Weight is required !"),
    address: Yup.string().required("Address is required !"),
    city: Yup.string().required("City is required !"),
    state: Yup.string().required("state is required !"),
    zipCode: Yup.string().required("Zip code is required !"),
    countryId: Yup.string().required("Country Id is required !"),
    phoneNumber: Yup.string().required("Phone is required !"),
    emailId: Yup.string().required("Email Id is required !"),
  });

  const [formValue, setFormValue] = useState(initialValue);

  const [genderList, setGenderList]= useState([]);
  const [countryList, setCountryList]= useState([]);

  const GetGenderList=()=>{
    axios.get(apibaseUrl+getGenderListApi).then(resp=>{
        setGenderList(resp.data.response);
    })
  }

  const GetCountryList=()=>{
    axios.get(apibaseUrl+getCountryListApi).then(resp=>{
        setCountryList(resp.data.response);
    })
  }

  useEffect(()=>{
    GetGenderList();
    GetCountryList();
  },[])

  const HandleSubmit=(values,{resetForm})=>{
    values.gender=parseInt(values.gender);
    values.height=parseInt(values.height);
    values.weight=parseInt(values.weight);
    values.countryId=parseInt(values.countryId);

    axios.post(apibaseUrl+UpdateUserProfile,values).then(resp=>{
        window.alert(resp.data.message);
        
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
            <h5>Edit Profile</h5>
          </div>

          <div className="col-md-12">
            <Formik
              initialValues={formValue}
              validationSchema={validationSchema}
              enableReinitialize="true"
              onSubmit={(values,{resetForm})=>HandleSubmit(values,{resetForm})}
            >
              <Form>
                <div className="row">
                  <div className="col-md-4 form-group">
                    <label>First Name</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="firstName"
                    ></Field>
                    <ValidationHelper name="firstName"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Last Name</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="lastName"
                    ></Field>
                    <ValidationHelper name="lastName"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Date Of Birth</label>
                    <Field
                      type="date"
                      className="form-control"
                      name="dateOfBirth"
                    ></Field>
                    <ValidationHelper name="dateOfBirth"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Gender</label>
                    <Field as="select" className="form-control" name="gender">
                      <option value="">--Select--</option>
                      {
                        genderList.map((data, index)=>(<option value={data.id}>{data.name}</option>))
                      }
                    </Field>
                    <ValidationHelper name="gender"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Phone#</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="phoneNumber"
                    ></Field>
                    <ValidationHelper name="phoneNumber"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Email</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="emailId"
                    ></Field>
                    <ValidationHelper name="emailId"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Height</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="height"
                    ></Field>
                    <ValidationHelper name="height"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Weight</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="weight"
                    ></Field>
                    <ValidationHelper name="weight"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Country</label>
                    <Field
                      as="select"
                      className="form-control"
                      name="countryId"
                    >
                      <option value="">--Select--</option>
                      {
                        countryList.map((data, index)=>(<option value={data.id}>{data.name}</option>))
                      }
                    </Field>
                    <ValidationHelper name="countryId"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>State</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="state"
                    ></Field>
                    <ValidationHelper name="state"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>City</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="city"
                    ></Field>
                    <ValidationHelper name="city"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Zip Code</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="zipCode"
                    ></Field>
                    <ValidationHelper name="zipCode"></ValidationHelper>
                  </div>

                  <div className="col-md-4 form-group">
                    <label>Address</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="address"
                    ></Field>
                    <ValidationHelper name="address"></ValidationHelper>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-8"></div>
                  <div className="col-md-4">
                    <button className="btn btn-success" type="submit">
                      Update
                    </button>
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
