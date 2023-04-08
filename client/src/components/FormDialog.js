import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';
import {useState} from 'react'


export default function FormDialog({update,setUpdate,id}) {
  
  const handleClose = () => {
    update()
  };

  const handleChange=(e)=>{
    console.log('In handle Change')
    setVal(e.target.value)
  }
  const handleSave=()=>{
    setUpdate(val,id)
    update();
  }

  const [val,setVal]=useState();
  console.log(val)
  return (
    <div>
      <Dialog open={true} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Chnage</DialogTitle>
        <DialogContent>
          <DialogContentText>
               Are You sure You want to change the Plan
          </DialogContentText>
         <TextField type="text" onChange={(e)=>setVal(e.target.value)} style={{width:'100%'}}/>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleSave} color="primary">
            save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}