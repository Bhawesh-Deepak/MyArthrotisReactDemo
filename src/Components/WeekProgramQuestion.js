import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  apibaseUrl,
  GetQuestionOptionDetailsApi,
} from "../Helpers/ApiUrlHelper";
import {Formik, Form, Field, FieldArray,ErrorMessage} from 'formik';

export default function WeekProgramQuestion() {
  const [userId, setUserId] = useState(1);
  const [intakeProcess, setIntakeProcess] = useState("");
  const [questionOptionList, setQuestionOptionList] = useState();

  useEffect(() => {
    GetQuestionOptionDetails();
    console.log(questionOptionList);
    debugger;
  }, [userId, intakeProcess]);

  const GetQuestionOptionDetails = () => {
    axios
      .get(apibaseUrl + GetQuestionOptionDetailsApi + userId)
      .then((resp) => {
        var details = groupBy(resp.data.response, "question");
        setQuestionOptionList(details);
        debugger;
      });
  };

  var groupBy = function (xs, key) {
    return xs.reduce(function (rv, x) {
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };

  return (
    <>
  <br/><br/><br/><br/>
    <div className="row">
      <div className="col-md-12">
        <ul className="ulWeekk">
          <li className="liWeek">Basic Information</li>
          <li className="liWeek">Basic Information</li>
          <li className="liWeek">Basic Information</li>
          <li className="liWeek">Basic Information</li>
          <li className="liWeek">Basic Information</li>
          <li className="liWeek">Basic Information</li>
          <li className="liWeek">Basic Information</li>
          <li className="liWeek">Basic Information</li>
        </ul>
      </div>
    </div>
    
      <div className="row">
        {questionOptionList != null ? (
          <div className="col-md-12">
            {Object.keys(questionOptionList).map((cat) => (
              <div>
                <h3>{cat}</h3>
                {questionOptionList[cat].map((ord) => (
                  <>
                    <input
                      type="radio"
                      value={ord.optionValue}
                      name={ord.optionValue}
                    ></input>
                    <label>{ord.optionValue}</label>
                  </>
                ))}
              </div>
            ))}
          </div>
        ) : (
          <span>No Record Found</span>
        )}
      </div>
    </>
  );
}
