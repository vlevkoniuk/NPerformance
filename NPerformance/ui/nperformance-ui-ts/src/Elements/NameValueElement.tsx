import React, {ChangeEvent, useContext, useEffect, Component } from 'react';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';

interface RulesProps {
    name: string;
    value: string;
    editable: boolean;
    func: Function;
}

const inputPropsObj = {variant: "standard"}

export default function Rules(props: RulesProps) {

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.value);
        props.func(props.name, event.target.value)
    }

    return (
        <>
            <Stack spacing={1} direction='row' style={{padding: "5px"}} key={"stack-" + props.value}> 
                <Box sx={{ width: '30%', flexShrink: 0 }} style={{textAlign:"right"}} key={"name-" + props.name}>
                    <strong> {props.name} :  </strong>
                </Box>
                <Box sx={{ width: '70%', flexShrink: 0 }} hidden={props.editable} key={"value-" + props.name}>
                    {props.value}
                </Box>
                <Box sx={{ width: '70%', flexShrink: 0 }} hidden={!props.editable} key={"edit-value-" + props.name}>
                    <Input  defaultValue={props.value} onChange={handleChange} inputProps={inputPropsObj} />
                </Box>
            </Stack> 
        </>
    );
}