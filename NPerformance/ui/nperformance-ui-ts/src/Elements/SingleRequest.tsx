import React, { Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Headers from './Headers'
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import ModeEditRoundedIcon from '@mui/icons-material/ModeEditRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function SingleRequest(props) {
  const [expanded, setExpanded] = React.useState(false);
  const [expand, setExpand] = React.useState(false);
  const [isEdit, setIsEdit] = React.useState(false);
  const [reqexpanded, setReqexpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    //console.log(panel)
    if (props.func) {
        props.func(panel);
        setExpand(props.expanded);
        setReqexpanded(panel);
    }
    else {
        setExpanded(isExpanded ? panel : false);
        if (reqexpanded === panel) {
            setExpand(false);
            setReqexpanded("");
        }
        else {
            setExpand(true);
            setReqexpanded(panel);
        }
    }
  };

    return (
        <Accordion 
                expanded={props.func ? props.expanded : expand} 
                key={'single-request-' + props.request.Id} 
                id={'single-request-' + props.request.Id}
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
                    <Typography sx={{ color: 'text.secondary' }}>{props.request.Url}{props.request.Uri}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <Stack direction="row">
                        <Box sx={{ width: '95%'}} >
                            <List>
                                <ListItem disablePadding>
                                    <strong>Headers:</strong>
                                </ListItem>
                                <Headers request={props.request} isEditable={isEdit}/>
                            </List>
                            <List>
                                <ListItem disablePadding>
                                    <strong>Body:</strong>
                                </ListItem>
                                <ListItem> {props.request.Body} </ListItem>
                            </List>
                        </Box>
                        <Box sx={{width: "5%"}}>
                            <List>
                                <ListItem disablePadding>
                                    <IconButton onClick={() => setIsEdit(true)} >
                                        <ModeEditRoundedIcon color="primary" />
                                    </IconButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <IconButton>
                                        <DeleteRoundedIcon sx={{ color: "red" }}/>
                                    </IconButton>
                                </ListItem>
                            </List>
                        </Box>
                    </Stack>
                </AccordionDetails>
            </Accordion>
    );
}