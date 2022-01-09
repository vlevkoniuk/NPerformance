import React, { useContext, useEffect, useRef, useState } from "react";
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import ConfigContext from '../Shared/ConfigContext'
import PerformanceContext from '../Shared/PerformanceContext'


function AppDefault() {
    const {conf, setConf} = useContext(ConfigContext);
    // const [perf, setPerf] = useContext(PerformanceContext);
    const [show, setShow] = useState(false);
    const inputForm = useRef(null);
    const [file, setFile] = useState(null)
    const [conconf, setConconf] = useState(null)

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleRead = async () => 
    {
        //read file here
        const reader = new FileReader()
        reader.onload = async (file) => { 
            const text = (file.target.result)
            var cnf = JSON.parse(text)
            setConconf(cnf)
            setConf(cnf);
            //alert(text)
        };
        reader.readAsText(file.target.files[0])
        console.log(conconf)
        console.log(conf)
        setShow(false);
    }

  const showFile = async (e) => {
    e.preventDefault()
    setFile(e)
  }

  return (
      <div>
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
            <Label file={file}/>
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
                    Select Input File
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

function Label(props) {
    console.log(props);
    if (props.file)
        return <h3>Loaded file: {props.file.target.files[0].name}</h3>;
    else 
        return <h3>No Files Selected yet</h3>;
  }

export default AppDefault;

