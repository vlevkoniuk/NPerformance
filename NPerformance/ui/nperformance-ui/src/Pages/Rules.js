import React, {useContext, useEffect, useState } from 'react';
import Typography from '@mui/material/Typography';
import NameValueElement from '../Elements/NameValueElement';
import ConfigContext from '../Shared/ConfigContext';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

export default function Rules() {
    const {conf, setConf} = useContext(ConfigContext);
    const [isEditable, setIsEditable] = useState(false);

    const confChange = (key, value) => {
        //console.log(key, value);
        let tmpConf = conf;
        let intValue = Number(value);
        if (!!intValue){
            tmpConf.Configuration[key] = intValue;
        }
        else {
            tmpConf.Configuration[key] = value;
        }
        setConf(tmpConf);
    }

    return (
        <>
            <Stack spacing={1} direction='row' style={{padding: "5px"}}> 
                <Box sx={{ width: '30%', flexShrink: 0 }} style={{textAlign:"right"}}>
                    <Button variant="contained" 
                    onClick={() => setIsEditable(true)}
                    disabled={isEditable}>
                        Edit
                    </Button>
                </Box>
                <Box sx={{ width: '70%', flexShrink: 0 }}>
                    <Button variant="contained" 
                    onClick={() => setIsEditable(false)}
                    disabled={!isEditable}>
                        Save
                </Button>
                </Box>
            </Stack> 

            {Object.keys(conf.Configuration).map((value) => {
                return (
                    <NameValueElement 
                        name={value} 
                        value={conf.Configuration[value]}
                        editable={isEditable}
                        func={confChange}
                        key={"conf-" + value} 
                    />
                );
            })}
        </>
    );
}