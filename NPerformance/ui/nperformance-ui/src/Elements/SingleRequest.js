import React, { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Headers from './Headers'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

export default function SingleRequest(props) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    console.log(panel)
    setExpanded(isExpanded ? panel : false);
    props.func(panel)
  };

    return (
        <Accordion 
                expanded={props.expanded} 
                key={props.request.Id} 
                id={'request-'+props.request.Id}
                onChange={ handleChange('request-'+props.request.Id)}
            >
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id={'Accorion-Content-'+props.request.Id}
                >
                    <Typography sx={{ width: '5%', flexShrink: 0 }}>
                        {props.request.Id}
                    </Typography>
                    <Typography sx={{ width: '10%', flexShrink: 0 }}>
                        <strong>{props.request.Method}</strong>
                    </Typography>
                    <Typography sx={{ color: 'text.secondary' }}>{props.request.Url + props.request.Uri}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                        <List>
                            <ListItem disablePadding>
                                <strong>Headers:</strong>
                            </ListItem>
                            <Headers request={props.request} />
                        </List>
                        <List>
                            <ListItem disablePadding>
                                <strong>Body:</strong>
                            </ListItem>
                            <ListItem> {props.request.Body} </ListItem>
                        </List>
                </AccordionDetails>
            </Accordion>
    );
}