import React,{useState, useEffect} from 'react';
import axios from 'axios';
import { Formik, ErrorMessage,Field, Form } from 'formik';
import * as Yup from 'yup';
import ValidationHelper from '../../Helpers/ValidationHelper';
import { apibaseUrl, createCoachApi, roleListApi } from '../../Helpers/ApiUrlHelper';

export default function CoachInsert() {

 const [image, setImage]= useState();
 const [roleList, setRoleList]= useState([]);

 useEffect(()=>{
    GetRoleList();
 },[])

 const GetRoleList=()=>{
    axios.get(apibaseUrl+roleListApi).then(resp=>{
        setRoleList(resp.data.response)
    })
 }

const setFieldValue = (e) => {
    debugger
    setImage(e.target.files[0]);
}
  const initialValue={
    id:0,
    roleId:'',
    firstName:'',
    lastName:'',
    email:'',
    heading:'',
    description:'',
    imagePath:'',
    password:'',
    confirmPassword:''
  };

  const validationScheme=Yup.object({
    roleId:Yup.string().required('Role is required !'),
    firstName:Yup.string().required('First name is required !'),
    lastName: Yup.string().required('Last name is required !'),
    email:Yup.string().required('Email is required !'),
    heading:Yup.string().required('Heading is required !'),
    description:Yup.string().required('Description is required !'),
    password: Yup.string().required('Password is required !'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null],'Password do not match !').required('Confirm password is required !')
  });

  const onSubmit=(values, {resetForm})=>{
    let formBody = new FormData();
    formBody.append('Id',parseInt(values.id));
    formBody.append("RoleId", parseInt(values.roleId));
    formBody.append("FirstName",values.firstName);
    formBody.append("LastName",values.lastName);
    formBody.append("Email", values.email);
    formBody.append("Heading", values.heading);
    formBody.append("Description", values.description);
    formBody.append("Image",image);
    formBody.append("Password", values.password)


     axios({
        url:apibaseUrl+createCoachApi,
        method: "POST",
        data: formBody,
        headers: { 'Content-Type': 'multipart/form-data' }

    }).then((resp) => {
        window.alert(resp.data.message)
    }).catch(err => {
        window.alert(err)
    }).finally(() => {
        resetForm({values:''})
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
          <h5>Create Coach</h5>
        </div>
        <Formik initialValues={initialValue} validationSchema={validationScheme} onSubmit={(values,{resetForm})=>onSubmit(values, {resetForm})}>
          <Form>
            <div className='col-md-12'>
                <div className='col-md-4 form-group'>
                    <label>Select Role</label>
                    <Field as='select' name='roleId' className='form-control'>
                        <option>--Select--</option>
                        {
                            roleList.map((data, index)=>(
                                <option key={index} value={data.id}>{data.name}</option>
                            ))
                        }
                    </Field>
                    <ValidationHelper name="roleId"></ValidationHelper>
                </div>

                <div className='col-md-4 form-group'>
                    <label>First Name</label>
                    <Field  name='firstName' className="form-control"></Field>
                    <ValidationHelper name="firstName"></ValidationHelper>
                </div>
                <div className='col-md-4 form-group'>
                    <label>Last Name</label>
                    <Field  name='lastName' className="form-control"></Field>
                    <ValidationHelper name="lastName"></ValidationHelper>
                </div>

                <div className='col-md-4 form-group'>
                    <label>Email</label>
                    <Field  name='email' className="form-control"></Field>
                    <ValidationHelper name="email"></ValidationHelper>
                </div>

                <div className='col-md-4 form-group'>
                    <label>Password</label>
                    <Field type="password" name='password' className="form-control"></Field>
                    <ValidationHelper name="password"></ValidationHelper>
                </div>

                <div className='col-md-4 form-group'>
                    <label>Confirm Password</label>
                    <Field type='password' name='confirmPassword' className="form-control"></Field>
                    <ValidationHelper name="confirmPassword"></ValidationHelper>
                </div>

                <div className='col-md-4 form-group'>
                    <label>Heading</label>
                    <Field  name='heading' className="form-control"></Field>
                    <ValidationHelper name="heading"></ValidationHelper>
                </div>

                <div className='col-md-4 form-group'>
                    <label>Description</label>
                    <Field  name='description' className="form-control"></Field>
                    <ValidationHelper name="description"></ValidationHelper>
                </div>

              


                <div className='col-md-4 form-group'>
                    <label>Upload Image</label>
                    <input type='file' className='form-control' 
                        onChange={(e) => setFieldValue(e)} name='imagePath'></input>
                   
                </div>


            </div>

            <div className='col-md-12'>
                <div className='col-md-10'>

                </div>
                <div className='col-md-2'>
                    <button type='submit' className='btn btn-success'>Save</button>
                </div>
            </div>
          </Form>
        </Formik>
      </div>
    </div>
  </div>
  )
}
