import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { apibaseUrl, GetQuestionOptionDetailsApi } from '../Helpers/ApiUrlHelper';

export default function WeekProgramQuestion() {

    const [userId, setUserId]= useState(1);
    const [intakeProcess, setIntakeProcess]= useState('')
    const [questionOptionList, setQuestionOptionList]= useState()

    useEffect(()=>{
        GetQuestionOptionDetails();
        console.log(questionOptionList);
        debugger
    },[userId,intakeProcess])
  
   const GetQuestionOptionDetails=()=>{
    axios.get(apibaseUrl+GetQuestionOptionDetailsApi+userId).then(resp=>{

       var details=groupBy(resp.data.response,'question');
        setQuestionOptionList(details);
       debugger
    })
   } 

   var groupBy = function(xs, key) {
    return xs.reduce(function(rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };


  return (
    <div className="row">
    <div className="col-md-12">
      
    </div>
  </div>
  )
}
