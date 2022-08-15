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
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';

export default function RequestModalMaterial(props) {
    const [editMode, setEditMode] = useState(props.isEdit);
    const [open, setOpen] = React.useState(props.show);
    const newReq = {};
    const [currentObj, setCurrentObj] = useState(props.request);
    const [headers, setHeaders] = useState(props.request.Headers)
    console.log(props)

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

    const BootstrapDialog = styled(Dialog)(({ theme }) => ({
        '& .MuiDialogContent-root': {
          padding: theme.spacing(2),
        },
        '& .MuiDialogActions-root': {
          padding: theme.spacing(1),
        },
      }));
      
      const BootstrapDialogTitle = (props) => {
        const { children, onClose, ...other } = props;
      
        return (
          <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
            {children}
            {onClose ? (
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  position: 'absolute',
                  right: 8,
                  top: 8,
                  color: (theme) => theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            ) : null}
          </DialogTitle>
        );
      };

    const addEmptyHeader = () => {
        let tmp = currentObj;
        let newHeader = {
            HeaderName: "Accept",
			HeaderValue: ""
        };
        tmp.Headers.push(newHeader);
        setCurrentObj(tmp);
        console.log(currentObj);
    }

    const handleClose = () => {
        setOpen(false);
    };

    // useEffect(() => {
    //     if (props.isEdit) {
    //         setCurrentObj(props.request)
    //     }
    //     else {
    //         //new request
    //         console.log("rerender modal", props);
    //         //setCurrentObj(createNewRequestObject());
    //     }
    // }, [props,currentObj.Headers])

    return (
        <BootstrapDialog
            onClose={handleClose}
            open={open}
            >
            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                Add/Edit Request
            </BootstrapDialogTitle>
            <DialogContent >
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
                            <Input id="request-url" value={currentObj.Url} />
                        </FormControl>
                    </Box>
                    <Box sx={{ width: '45%' }}>
                        <FormControl variant="standard"  sx={{width: '100%'}} >
                            <InputLabel htmlFor="request-uri">Uri</InputLabel>
                            <Input id="request-uri" value={currentObj.Uri} />
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
                    {currentObj.Headers.map((value, index) => {
                        console.log("rendering headers")
                        return (
                            <HeadersEditable header={value} key={currentObj.Id + '-' + value.HeaderName + '-' + index}/>
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

            </DialogContent >
            <DialogActions>
                <Button onClick={props.onHide}>Save</Button>
                <Button onClick={props.onHide} variant="danger">Close</Button>
            </DialogActions>
        </BootstrapDialog>
    );
}