import React, { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Headers from './Headers'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import SingleRequest from './SingleRequest';

export default function RequestsSequence(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [reqexpanded, setReqexpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    //console.log(panel)
    setExpanded(isExpanded ? panel : false);
    props.func(panel);
  };
  //console.log(props)

  const pull_data = (panel) => {
    if (reqexpanded == panel) {
      setReqexpanded("");
    }
    else {
        setReqexpanded(panel);
    }
  }


    return (
        <Accordion 
                expanded={props.expanded} 
                key={'request-sequence-' + props.userNo + props.index} 
                id={'request-sequence-' + props.userNo + props.index}
                onChange={ handleChange('request-sequence-' + props.userNo + props.index)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id={'Accorion-Content-' + props.userNo + props.index}
                >
                    <Typography sx={{ width: '50%', flexShrink: 0 }}>
                        {props.userRequestSequence.Description}
                    </Typography>
                    <Typography sx={{ width: '30%', flexShrink: 0 }}>
                        Requests:  {props.userRequestSequence.Requests.length}
                    </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {
                        props.userRequestSequence.Requests.map((request, index) => {
                            return (
                                <SingleRequest 
                                    request={request} 
                                    expanded={'request' + props.userNo + props.index} 
                                    key={'request-' + props.userNo + props.index + index}
                                />
                            );
                        })
                    }
                </AccordionDetails>
            </Accordion>
    );
}