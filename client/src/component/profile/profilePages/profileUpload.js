import { Modal, Row, Col, Button, Form } from "react-bootstrap";
import React, { useState, useEffect, useDebugValue } from "react";
import { isLoggedIn, getUser } from "../../../redux/Selectors/user";
import { BsCheck2Circle, BsDownload } from "react-icons/bs";
import { IconContext } from "react-icons";
import { useDispatch } from "react-redux";
import { uploadUserProfilePicAsync } from "../../../redux/actions/user"

const ProfileUpload = (props) => {
  const [dragState, setDragState] = useState('')
  const [uploadState, setUploadState] = useState(false)
  const [dragEventCounter, setDragEventCounter] = useState(0)
  const [imgFile, setImgFile] = useState()
  const dispatch =  useDispatch()

  useEffect(() => {
    if (dragEventCounter === 0) {
      setDragState('')
    }
  }, [dragEventCounter])

  const handleChange = (e) => {
    e.preventDefault()
    const files = e.target.files
    if (files.length > 0) {
      setUploadState(true)
      setImgFile(files[0])
    }
  }

  const handleDragEnter = (e) => {
    e.preventDefault()
    if (uploadState === false) {
      setDragState('dragOver')
      setDragEventCounter(dragEventCounter + 1)
    }
  }

  const handleDragOver = (e) => {
    e.preventDefault()
  }

  const handleDrop = (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files
    if (files.length > 0) {
      setDragState('')
      setUploadState(true)
      setImgFile(files[0])
    }
  }

  const handleLeave = (e) => {
    e.preventDefault()
    setDragEventCounter(dragEventCounter - 1)
  }

  const handleModalExit = () => {
    setUploadState(false)
  }

  const handleSubmit = async (e) =>{
    e.preventDefault()
    props.onHide()
    try{
      await dispatch(uploadUserProfilePicAsync(imgFile))
    } catch(err){
      throw (err)
    }
  }

  return (
    <Modal size="lg" {...props} onExited={handleModalExit} centered={true} >
      <Row className={`uploadSection ${dragState}`} onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleLeave} onDragEnter={handleDragEnter}>
        <Col>
          <Form className='fileArea'>
            <Row>
              <Col className="dropIconContainer" xs='12'>
                <IconContext.Provider value={{ size: 100 }}>
                  {!uploadState
                    ? <BsDownload />
                    : <BsCheck2Circle />
                  }
                </IconContext.Provider>
              </Col>
            </Row>
            <Row>
              <Col className="uploadButtoncontainer" xs={{ span: 8, offset: 2 }}>
                {!uploadState
                  ?
                  <div>
                    <input type="file" id="file" className="fileInput" onChange={handleChange} />
                    <label htmlFor="file"><strong>Choose a file</strong><span> or drag it here</span>.</label>
                  </div>
                  :
                  <div>
                    <p className="fileReceivedText">File received</p>
                    <Button size="lg" onClick={handleSubmit}> Upload</Button>
                  </div>
                }
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

    </Modal>
  );
};
export default ProfileUpload
