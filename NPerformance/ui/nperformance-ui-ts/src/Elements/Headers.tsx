import React, {Component } from 'react';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import {IHeader} from '../../Models/IHeader'
import { IReqeust } from '../../Models/IRequest'

interface HeaderProps {
    request: IReqeust;
}

export default function Headers(props: HeaderProps) {

    if (props.request.Headers) {
        //console.log(props)
        return (
            <div key={props.request.Id + '-headers'}>
                {
                    props.request.Headers.map((value: IHeader, index: number) => {
                        // console.log('headers-'+props.request.Id+'-'+index)
                        return (
                             <ListItem disablePadding  key={'headers-'+props.request.Id+'-'+index}>
                                <Typography sx={{ width: '20%', flexShrink: 0 }}>{value.HeaderName} :</Typography>
                                <Typography > {value.HeaderValue}</Typography>
                            </ListItem> 
                        );
                    })
                }
            </div>
        );
    }
}