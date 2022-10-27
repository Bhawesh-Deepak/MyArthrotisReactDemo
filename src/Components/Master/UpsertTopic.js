import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form, Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import ValidationHelper from "../../Helpers/ValidationHelper";
import { apibaseUrl, GetTopicByIdApi, InsertTopicApi, UpdateTopicApi } from "../../Helpers/ApiUrlHelper";
import {Link} from 'react-router-dom';

export default function UpsertTopic() {
  const initialValue = {
    "id": 0,
    "name": "",
    "description": "",
    "isDefault": "",
    "sortOrder": "",
    "createdBy": "",
  };

  const validationSchema=Yup.object({
    name: Yup.string().required('Name is required !'),
  });

  const [topicId, setTopicId] = useState(
    window.location.href.split("=")[1]
  );

  useEffect(()=>{
    GetTopicById()
  },[topicId])

  const GetTopicById=()=>{
    axios.get(apibaseUrl+ GetTopicByIdApi+ topicId).then(resp=>{
      setFormValue(resp.data.response);
    })
  }

  const [formValue, setFormValue] = useState(initialValue);

  const HandleSubmit=(values, {resetForm})=>{
    console.log(values);
    values.isDefault= values.isDefault==""? false : true;
    values.createdBy= parseInt(1);
    if(values.id==0){
      InsertTopic(values);
    }else{
      UpdateTopic(values)
    }

  }

  const UpdateTopic=(values)=>{
    axios.post(apibaseUrl+ UpdateTopicApi,values).then(resp=>{
      window.alert(resp.data.message);
    })
  }

  const InsertTopic=(values)=>{
    axios.post(apibaseUrl+ InsertTopicApi,values).then(resp=>{
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
            <h5 style={{ "text-align": "center" }}>Add Topic</h5>
          </div>

          <div className="col-md-12">
            <div className="col-md-9">

            </div>
         
          </div>
          <Formik initialValues={formValue}
           validationSchema={validationSchema}
           enableReinitialize="true"
            onSubmit={(values, {resetForm})=> HandleSubmit(values, {resetForm})}>
            <Form>
              <div className="col-md-12">
                <div className="col-md-4">
                  <label>Name</label>
                  <Field className="form-control" name="name"></Field>
                  <ValidationHelper name='name'></ValidationHelper>
                </div>

                <div className="col-md-4">
                  <label>Description</label>
                  <Field className="form-control" name="description"></Field>
                </div>

                <div className="col-md-4">
                  <label>Sort Order</label>
                  <Field type='number' className="form-control" name="sortOrder"></Field>
                </div>

                <div className="col-md-4">
                  <label>Is Default</label>
                  <Field  type='checkbox' name="isDefault"></Field>
                </div>
              </div>

              <div className="col-md-12">
                <div className="col-md-9">

                </div>
                <div className="col-md-3">
                  <button type="submit" className="btn btn-success">Save</button>
                </div>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
