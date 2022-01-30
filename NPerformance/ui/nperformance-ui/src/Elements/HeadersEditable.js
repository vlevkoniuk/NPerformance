import React, {Component } from 'react';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import IconButton from '@mui/material/IconButton';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

export default function HeadersEditable(props) {
    console.log(props);

    if (props.header) {
        //console.log(props)
        return (
            <>
                <Stack direction='row' spacing={10} sx={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                    <Box sx={{width: '30%'}}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="header-type">
                                Header Type
                            </InputLabel>
                            <NativeSelect
                                defaultValue={10}
                                inputProps={{
                                    name: 'header-type',
                                    id: 'header-type',
                                }}
                            >
                            <option value={10}>Accept</option>
                            <option value={20}>Accept-Encoding</option>
                            <option value={30}>Content-Type</option>
                            <option value={40}>Content-Length</option>
                            <option value={50}>Content-Encoding</option>
                            <option value={60}>Content-MD5</option>
                            <option value={70}>Authorization</option>
                            <option value={70}>User-Agent</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box sx={{width: '40%'}}>
                        <FormControl variant="standard" sx={{width: '100%'}} >
                            <InputLabel htmlFor="header-value">Url</InputLabel>
                            <Input id="header-value" value={props.header.HeaderValue} />
                        </FormControl>
                    </Box>
                    <Box>
                        <IconButton>
                            <DeleteRoundedIcon sx={{ color: "red" }}/>
                        </IconButton>
                    </Box>
               </Stack>
            </>
        );
    }
}