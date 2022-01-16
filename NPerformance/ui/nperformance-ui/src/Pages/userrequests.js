import React, {useContext, useEffect, Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConfigContext from '../Shared/ConfigContext'
import SingleRequest from '../Elements/SingleRequest'
import Pagination from '../Elements/Pagination'
import SingleUserRequest from '../Elements/SingleUserRequest';
import { Description } from '@mui/icons-material';

export default function UserRequests() {
  const [expanded, setExpanded] = React.useState(false);
  const [expand, setExpand] = React.useState("");

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
  

  const {conf, setConf} = useContext(ConfigContext);

  useEffect(() => {
    if (!conf) return;
    // use user._id
  },[conf])
  console.log(conf);

    return (
      <div>
        <Pagination />
        {
            conf.UserRequests.map((value, index) => {
                var requestSequences = []
                
                value.RequestsSequences.forEach((RequestsSequence, index) => {
                    var userReq = {};
                    userReq["Description"]=RequestsSequence.Description;
                    userReq["Username"]=RequestsSequence.UserName;
                    userReq["Password"]=RequestsSequence.UserPwd;
                    var requests = [];
                    RequestsSequence.Requests.forEach((reqvalue, reqindex) => {
                        conf.Requests.forEach((globalreqvalue, globalreqindex) => {
                            if (globalreqvalue.Id == reqvalue.RequestId) {
                                requests.push(globalreqvalue);
                                console.log(requests)
                            }
                        })

                    })
                    userReq["Requests"] = requests;
                    requestSequences.push(userReq)
                })
                console.log(requestSequences)
                return (
                    <SingleUserRequest 
                        userRequest={value} 
                        userRequestSequences={requestSequences} 
                        expanded={expand == 'request-' + value.UserNo} 
                        key={'Accordion' + value.UserNo} 
                        id={'Accordion' + value.UserNo}
                        func={pull_data}
                    />
                );
                
          })}
    </div>
    );
}