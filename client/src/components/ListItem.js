import React from 'react';
import './ListItem.css';
import {BsFillTrashFill} from 'react-icons/bs';
import FlipMove from 'react-flip-move';
import { useEffect, useState } from 'react';
// import EditIcon from '@material-ui/icons/Edit';
import { IconButton } from '@material-ui/core';
import FormDialog from './FormDialog';

function ListItem({ item , deleteItem, setUpdate}) {
  const [open,setOpen]=useState(false)

  const handleClick=()=>{
      setOpen(!open)
  }

  const update=()=>{
      console.log('In Update func')
      setOpen(false);
  }

  // const listItems = props.items.map(item => {
  //     return <div className="list" key={item._id}>
  //     <p>
  //       <input type="text" id={item._id} value={item.text} />
  //       <span style={{marginRight:'40px'}}>
  //           <IconButton onClick={handleClick}>
  //                 <EditIcon />
  //           </IconButton>
  //           {open && <FormDialog update={update} setUpdate={props.setUpdate} id={item._id}/>}
  //       </span>
  //       <span>
  //           {/* <BsFillTrashFill className="trash" onClick={()=> props.deleteItem(item._id)} /> */}
  //           <button onClick={()=> props.deleteItem(item._id)}>Delete</button>
  //       </span>
  //     </p>
  //     </div>
  //     });

  return (
    <div>
      <FlipMove duration={300} easing="ease-in-out">

        <div className="list" key={item._id}>
        <p>
          <input type="text" id={item._id} value={item.place} />
          <input type="text" id={item._id} value={item.expenditure} />
          <span style={{marginRight:'40px'}}>
              {/* <IconButton onClick={handleClick}>
                    <EditIcon />
              </IconButton> */}
              {/* {open && <FormDialog update={update} setUpdate={props.setUpdate} id={item._id}/>} */}
          </span>
          <span>
              <BsFillTrashFill className="trash" onClick={()=> deleteItem(item._id)} />
          </span>
        </p>
        </div>

      </FlipMove>
    </div>
  );
}

export default ListItem;
