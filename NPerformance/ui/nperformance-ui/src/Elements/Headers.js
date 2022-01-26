import React, {Component } from 'react';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';

export default function Headers(props) {

    if (props.request.Headers) {
        //console.log(props)
        return (
            <div>
                {
                    props.request.Headers.map((value, index) => {
                        // console.log('headers-'+props.request.Id+'-'+index)
                        return (
                            <>
                                <ListItem disablePadding  key={'headers-'+props.request.Id+'-'+index}>
                                    <Typography sx={{ width: '20%', flexShrink: 0 }}>{value.HeaderName} :</Typography>
                                    <Typography > {value.HeaderValue}</Typography>
                                </ListItem> 
                            </>
                        );
                    })
                }
            </div>
        );
    }
}