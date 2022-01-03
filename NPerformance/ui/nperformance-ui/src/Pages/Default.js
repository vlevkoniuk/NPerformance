import React, { useContext, useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ConfigContext from '../Shared/ConfigContext'


function AppDefault() {
    const [conconf, setConconf] = useContext(ConfigContext);
    const [show, setShow] = useState(false);
    const inputForm = useRef(null);
    const inputRef = useRef()
    const [file, setFiles] = useState(null)
    const [conf, setConf] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleRead = async () => 
    {
        //read file here
        const reader = new FileReader()
        reader.onload = async (file) => { 
            const text = (file.target.result)
            var cnf = JSON.parse(text)
            setConf(cnf)
            setConconf(cnf)
            //alert(text)
        };
        reader.readAsText(file.target.files[0])
        console.log(conf)
        console.log(conconf)
        setShow(false);
    }

  const showFile = async (e) => {
    e.preventDefault()
    setFiles(e)
  }

  return (
      <div className="App">
          <header className="App-header"> 
            Welcome to the NPerformance
          </header>
        <div className="App-content">
            <div>
                <Button variant="primary" size="lg">Create new configuration</Button><br />
            </div>
            <div>
                <Button variant="primary" size="lg" onClick={handleShow}>Open existing configuration</Button>
            </div>
        </div>
        <Modal
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            show={show} 
            onHide={handleClose}
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form ref={inputForm}>
                    <Form.Control type="file" 
                        name={"filepath"} 
                        onChange={(e) => showFile(e)}
                    />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleRead}>
                    Read
                </Button>
            </Modal.Footer>
        </Modal>
      
      
    </div>
  );
}

export default AppDefault;

