
import React, {useContext, useEffect, Component } from 'react';
import Box from '@mui/material/Box';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { minWidth } from '@mui/system';

export default function Pagination(props) {
    const [rows, setRows] = React.useState(10);

  const handleChange = (event) => {
    setRows(event.target.value);
  };

return (
    <>
        <Box sx={{height: '7px', backgroundColor: 'white',}} />
        <Box  sx={{
            width: '100%',
            height: '45px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'stretch'}}
        >
            <div style={{textAlign: 'center', width: '15%',  justifyContent: 'center'}}>
                <ArrowBackIosIcon color='primary'/>
            </div>
            
            <div style={{textAlign: 'center', width: '60%', }}>
            
            <TextField
                label="Page"
                color='secondary'
                id="outlined-size-small"
                defaultValue="1"
                size="small"
                sx={{width:'9%', minWidth: '50px'}}
                inputProps={{style: { textAlign: 'center' }}} 
            /> of Pages
            </div>

            <div style={{textAlign: 'center', width: '15%',}}>
                <ArrowForwardIosIcon color='primary'/>
            </div>

            <div style={{textAlign: 'center', width: '10%',  justifyContent: 'center'}}>
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Rows</InputLabel>
                    <Select
                        labelId="demo-simple-select-helper-label"
                        size='small'
                        id="demo-simple-select-helper"
                        value={rows}
                        label="Rows"
                        onChange={handleChange}
                    >
                        <MenuItem value={10}>10</MenuItem>
                        <MenuItem value={25}>25</MenuItem>
                        <MenuItem value={50}>50</MenuItem>
                        <MenuItem value={100}>100</MenuItem>
                    </Select>
                </FormControl>
            </div>

        </Box>
    </>
   );
}