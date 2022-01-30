import React, {useContext, useEffect, Component, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConfigContext from '../Shared/ConfigContext'
import SingleRequest from '../Elements/SingleRequest'
import Pagination from '../Elements/Pagination'
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RequestModal from '../Elements/RequestModal';

export default function Requests() {
  const [expanded, setExpanded] = useState(false);
  const [expand, setExpand] = useState("");
  const {conf, setConf} = useContext(ConfigContext);
  const [showModal, setShowModal] = useState(false);
  const createNewRequestObject = {
    Id: 0,
    Url: "",
    Uri: "",
    Method: "GET",
    Body: "",
    Headers: [
      {
        HeaderName: "Accept",
        HeaderValue: "application/json"
      }
    ]
  }
  const [curentReq, setCurentReq] = useState(createNewRequestObject);

  const handleChange = (panel) =>  {
    setExpand(panel);
    console.log(panel);
  };
  const pull_data = (panel) => {
    if (expand == panel) {
      setExpand("")
    }
    else {
      setExpand(panel)
    }
  }

  const editRequest = (newReq) => {
    let tmpConf = conf;
    let ix;
    tmpConf.Requests((value, index) => {
      if (value.Id === newReq.id) {
        ix = index;
      }
    })
    tmpConf.Requests[ix] = newReq;
    setConf(tmpConf);
  }

  const addRequest = (newReq) => {
    let tmpConf = conf;
    tmpConf.Requests.push(newReq)
    setConf(tmpConf)
  }

  const openModal = () => {
    //setCurentReq(createNewRequestObject)
    setShowModal(true);
  }


  const addEmptyHeader = () => {
    let tmp = curentReq;
    let newHeader = {
      HeaderName: "Accept",
      HeaderValue: ""
    };
    tmp.Headers.push(newHeader);
    setCurentReq(tmp);
    console.log(curentReq);
  }

  useEffect(() => {
    console.log('rerender Requests')
    if (!conf) return;
  })

  console.log(conf, curentReq);

    return (
      <>
        <div>
          <Stack direction='row'>
            <Box sx={{ width: '5%'}}>
              <IconButton onClick={openModal}>
                <AddCircleIcon color="primary" fontSize="large" />
              </IconButton>
            </Box>
            <Box sx={{ width: '95%'}}>
              <Pagination />
            </Box>
          </Stack>
          {/* <Pagination /> */}
          {
            conf.Requests.map((value, index) => {
              return <SingleRequest 
                request={value} 
                expanded={expand == 'request-' + value.Id} 
                key={'Accordion' + value.Id} 
                id={'Accordion' + value.Id}
                func={pull_data}
                edit={editRequest}
                />
            })}
        </div>
        <div id="Modal">
          <RequestModal 
            show={showModal}
            onHide={() => setShowModal(false)}
            request={curentReq}
            
          />
        </div>
      </>
    );
}