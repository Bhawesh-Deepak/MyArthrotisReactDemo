import React, { useState, useEffect } from "react";
import { Form, Formik, ErrorMessage, Field } from "formik";
import * as Yup from "yup";
import ValidationHelper from "../../Helpers/ValidationHelper";
import { apibaseUrl, getResourceById, upsertResourceApi } from "../../Helpers/ApiUrlHelper";
import axios from 'axios';

export default function AddRescource(props) {
    
  const [file, setFile] = useState();
  const [resourceId, setResourceId]= useState(window.location.href.split('=')[1])


  const initailResourceValue = {
    id: 0,
    coachId: 0,
    documentName: "",
    documentPath: "",
  };

  const [resourceValue,setResourceValue]= useState(initailResourceValue);

  useEffect(()=>{
    GetResourceById();
  },[resourceId])

  const GetResourceById=()=>{
    axios.get(apibaseUrl+getResourceById+ resourceId).then(resp=>{
        debugger
        setResourceValue(resp.data.response);
    })
  }

  const validationScheme = Yup.object({
    documentName: Yup.string().required("Title name is required !"),
  });

  const HandleSubmit=(values)=>{
    let formBody = new FormData();
    formBody.append("Id", parseInt(values.id));
    formBody.append("DocumentName", values.documentName);
    formBody.append("Document" ,file);
    formBody.append('CoachId',2)

    axios({
        url:apibaseUrl+upsertResourceApi,
        method: "POST",
        data: formBody,
        headers: { 'Content-Type': 'multipart/form-data' }

    }).then((resp) => {
        window.alert(resp.data.message)
    }).catch(err => {
        window.alert(err)
    }).finally(() => {
        //resetForm({values:''})
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
            <h5>Add Resource</h5>
          </div>
          <Formik validationSchema={validationScheme} enableReinitialize="true" initialValues={resourceValue} onSubmit={HandleSubmit}>
            <Form>
              <div className="col-md-12">
                <div className="col-md-10">
                  <div className="col-md-6 form-group">
                    <label>Title</label>
                    <Field className="form-control" name="documentName"></Field>
                    <ValidationHelper name="documentName"></ValidationHelper>
                  </div>

                  <div className="col-md-6 form-group">
                    <label>Upload Document</label>
                    <input type="file" onChange={(e)=> setFile(e.target.files[0])} className="form-control"></input>
                  </div>
                </div>
              </div>

              <div className="col-md-10"></div>
<a href={"http://localhost:28371/"+resourceValue.documentPath}>Download Link</a>
              <div className="col-md-2">
                <button type="submit" className="btn btn-success">
                  Save
                </button>
              </div>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
}
