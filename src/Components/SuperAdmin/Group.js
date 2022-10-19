import React,{useState} from 'react'
import ArthritisModal from '../Common/ArthritisModal'
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';


export default function Group() {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  return (
    <div
    className="container-fluid shadow-lg p-3 mb-5 bg-white rounded"
    style={{ "margin-top": "50px" }}
  >
    <div className="row" style={{ marginBottom: "30px" }}>
      <div className="row" style={{ marginBottom: "10px" }}>
        <div className="col-md-8">

        </div>
        <div className='col-md-4'>
        <Link to='/AddGroup' className='btn btn-success'>Add Group</Link>
        </div>
        
      </div>
    </div>
  </div>
  )
}
