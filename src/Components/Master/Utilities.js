import React from "react";
import { Link } from "react-router-dom";
import Category from "./Category";

export default function Utilities() {
  return (
    <div className="row">
      <div className="col-md-12">
        <div className="col-md-8">
          <Category />
        </div>

        <div className="col-md-4">
          <div
            className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
            style={{ "margin-top": "50px" }}
          >
            <div className="row" style={{ marginBottom: "30px" }}>
               <div className="col-md-12">
                   <h4 style={{'text-align':'center'}}>Master Search</h4>
               </div>
               <div className="col-md-12">
                <ul>
                    <li>
                        <Link></Link>
                    </li>
                </ul>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
