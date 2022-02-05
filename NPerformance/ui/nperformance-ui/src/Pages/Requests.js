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
import RequestModalMaterial from '../Elements/RequestModalMaterial';

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
    let ix = 0
    tmpConf.Requests.forEach((value, index) => {
      if (value.Id == newReq.Id) {
        ix = index;
      }
    })
    if(ix == 0) {
      //new request
      let  reqs = tmpConf.Requests;
      reqs.push(newReq)
      reqs.sort((a, b) => {
        return a.Id - b.Id;
      })
      tmpConf.Requests = reqs;
    }
    else {
      tmpConf.Requests[ix] = newReq;
    }
    setConf(tmpConf)
  }

  const selectIds = ({Id, ...rest}) => ({Id})

  function findFreeId(requests) {
    var Ids = requests.map(selectIds);
    Ids.sort(function(a, b) {
      return a - b;
    });
    console.log(Ids);
    var id = 1;
    for (let i = 0; i < Ids.length; i++) {
      if ((Ids.length >= i + 2) && (Ids[i + 1].Id != Ids[i].Id + 1)) {
        // we have a gap in sorted array with not used ID 
        id = Ids[i].Id + 1;
        break;
      }
    }
    if (id == 1) {
      id = Ids.length + 1;
    }
    console.log(id);
    return id;
  }

  const openNewModal = () => {
    var req = createNewRequestObject;
    req.Id = findFreeId(conf.Requests)

    setCurentReq(req);
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
  }, [conf, curentReq])

  console.log(conf, curentReq);

    return (
      <>
        <div>
          <Stack direction='row'>
            <Box sx={{ width: '5%'}}>
              <IconButton onClick={openNewModal}>
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
          <RequestModal key = {curentReq.Id}
            show={showModal}
            onHide={() => setShowModal(false)}
            request={curentReq}
            addnewheader={addEmptyHeader}
            handlerequest={addRequest}
          />
        </div>
      </>
    );
}