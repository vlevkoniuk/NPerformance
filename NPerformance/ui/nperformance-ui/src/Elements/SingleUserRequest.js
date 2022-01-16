import React, { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Headers from './Headers'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import RequestsSequence from './RequestsSequence';
import Box from '@mui/material/Box';

export default function SingleUserRequest(props) {
  const [reqexpanded, setReqexpanded] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    //console.log(panel)
    setExpanded(isExpanded ? panel : false);
  };

  const handleReqChange = (panel) => (event, isExpanded) => {
    //console.log(panel)
    setExpanded(isExpanded ? panel : false);
    props.func(panel)
  };

  const pull_data = (panel) => {
    if (reqexpanded == panel) {
      setReqexpanded("")
    }
    else {
        setReqexpanded(panel)
    }
  }
  //console.log(props)
    return (
        
        <Accordion 
                expanded={expanded === 'UserRequest-' + props.userRequest.UserNo} 
                key={'user-request-sequence-' + props.userRequest.UserNo} 
                id={'user-request-sequence-'+ props.userRequest.UserNo}
                onChange={ handleChange('UserRequest-'+props.userRequest.UserNo)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id={'Accorion-Content-' + props.userRequest.UserNo}
                >
                    <Typography sx={{ width: '5%', flexShrink: 0 }}>
                        {props.userRequest.UserNo}
                    </Typography>
                    <Typography sx={{ width: '50%', flexShrink: 0 }}>
                        <strong>{props.userRequest.Description}</strong>
                    </Typography>
                    <Typography sx={{ width: '45%', flexShrink: 0 }}>
                        Request in Sequence: {props.userRequest.RequestsSequences.length}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Typography sx={{ width: '50%', flexShrink: 0 }}>
                        <strong>Username:</strong> {props.userRequest.Username}
                    </Typography>
                    <Typography sx={{ width: '50%', flexShrink: 0 }}>
                        <strong>Password:</strong> {props.userRequest.Password}
                    </Typography>
                    {
                        props.userRequestSequences.map((userRequestSequence, index) => {
                            return (
                                <RequestsSequence 
                                    userRequestSequence={userRequestSequence}
                                    index = {index}
                                    userNo = {props.userRequest.UserNo}
                                    func={pull_data}
                                    key={'req-seq-' + index}
                                />
                            );
                        })
                    }
                </AccordionDetails>
            </Accordion>
    );
}