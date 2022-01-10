import React, {useContext, useEffect, Component } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ConfigContext from '../Shared/ConfigContext'
import SingleRequest from '../Elements/SingleRequest'
import Pagination from '../Elements/Pagination'

export default function Requests() {
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
          conf.Requests.map((value, index) => {
            return <SingleRequest 
              request={value} 
              expanded={expand == 'request-' + value.Id} 
              key={'Accordion' + value.Id} 
              id={'Accordion' + value.Id}
              func={pull_data}
              />
          })}
    </div>
    );
}