import React, {useState, useContext, useEffect, Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import IconButton from '@mui/material/IconButton';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import HeadersEditable from './HeadersEditable';

export default function RequestModal(props) {
    const [editMode, setEditMode] = useState(props.isEdit);
    const newReq = {};
    const [currentObj, setCurrentObj] = useState(props.request);
    const [headers, setHeaders] = useState(props.request.Headers)
    const [state, updateState] = React.useState();
    
    console.log(props)

    const forceUpdate = React.useCallback(() => updateState({}), []);

    const createNewRequestObject = () => {
        let req = {
            Id: 0,
			Url: "",
			Uri: "",
			Method: "GET",
			Body: "",
			Headers: [
				{
					HeaderName: "Accept",
					HeaderValue: "application/json"
				}
			]
        }
        return req
    }

    const addEmptyHeader = () => {
        let tmp = currentObj;
        let tmpHeaders = currentObj.Headers;
        let newHeader = {
            HeaderName: "Accept",
			HeaderValue: ""
        };
        tmpHeaders.push(newHeader);
        setHeaders(tmpHeaders);
        tmp.Headers=tmpHeaders;
        setCurrentObj(tmp);
        console.log(headers, currentObj);
        //force update modal
        forceUpdate();
    }

    const deleteHeader = (index) => {
        let tmp = currentObj;
        let tmpHeaders = currentObj.Headers;
        tmpHeaders.splice(index, 1);
        setHeaders(tmpHeaders);
        tmp.Headers=tmpHeaders;
        setCurrentObj(tmp);
        console.log(index, tmpHeaders, tmp);
        //force update modal
        forceUpdate();
    }

    const handleReqsave = () => {
        props.handlerequest(currentObj)
        props.onHide();
    }

    const handleChange = (event) => {
        console.log(event.target);
        console.log(event.target.value)
        console.log(event.target.id)
    }

    // useEffect(() => {
    //     if (props.isEdit) {
    //         setCurrentObj(props.request)
    //     }
    //     else {
    //         //new request
    //         console.log("rerender modal", props);
    //         //setCurrentObj(createNewRequestObject());
    //     }
    // }, [ currentObj])

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                Add/Edit Request
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Stack direction='row' spacing={2}>
                    <Box sx={{ width: '5%', flexShrink: 0 }}>
                        <FormControl variant="standard" sx={{width: '100%'}} disabled={true}>
                            <InputLabel htmlFor="request-url">Id</InputLabel>
                            <Input id="request-url" value={currentObj.Id} />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '10%', flexShrink: 0 }}>
                        <FormControl fullWidth>
                            <InputLabel variant="standard" htmlFor="method">
                                Method
                            </InputLabel>
                            <NativeSelect
                                defaultValue={10}
                                inputProps={{
                                    name: 'method',
                                    id: 'method',
                                }}
                                onChange={handleChange}
                            >
                            <option value={10}>GET</option>
                            <option value={20}>POST</option>
                            <option value={30}>PUT</option>
                            <option value={40}>DELETE</option>
                            <option value={50}>HEAD</option>
                            <option value={60}>OPTIONS</option>
                            <option value={70}>PATCH</option>
                            </NativeSelect>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '35%' }}>
                        <FormControl variant="standard" sx={{width: '100%'}} >
                            <InputLabel htmlFor="request-url">Url</InputLabel>
                            <Input id="request-url" value={currentObj.Url} onChange={handleChange}/>
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '45%' }}>
                        <FormControl variant="standard"  sx={{width: '100%'}} >
                            <InputLabel htmlFor="request-uri">Uri</InputLabel>
                            <Input id="request-uri" value={currentObj.Uri} onChange={handleChange}/>
                        </FormControl>
                    </Box>
                </Stack>
                <Box sx={{height: '30px'}}/>
                <Box>
                    <Stack direction='row' sx={{display: 'flex', justifyContent: 'left', alignItems: 'center'}}>
                        <Box sx={{width: "150px"}}>
                            <strong>Headers</strong>
                        </Box> 
                        <Box>
                        <IconButton onClick={addEmptyHeader} >
                            <AddCircleIcon color="primary" fontSize="medium" />
                        </IconButton>
                        </Box>
                    </Stack>
                    {headers.map((value, index) => {
                        console.log("rendering headers")
                        return (
                            <HeadersEditable 
                                header={value} 
                                key={currentObj.Id + '-' + value.HeaderName + '-' + index}
                                index={index}
                                delete={deleteHeader}
                                handlechange={handleChange}
                            />
                        );
                    })}
                </Box>
                <Box sx={{height: '30px'}}/>
                <Box>
                    <Box>
                        <TextField
                            id="outlined-multiline-static"
                            label="Request Body"
                            multiline
                            rows={5}
                            defaultValue={currentObj.Body}
                            sx={{width:'100%'}}
                        />
                    </Box>
                </Box>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleReqsave}>Save</Button>
                <Button onClick={props.onHide} variant="danger">Close</Button>
            </Modal.Footer>
        </Modal>
    );
}