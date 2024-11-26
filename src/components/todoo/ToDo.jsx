import React from 'react'
import { TfiWrite } from "react-icons/tfi";
import { MdDelete } from "react-icons/md";
function ToDo({text,updateMode,deleteToDo}) {
  return (
<div className='todo'>
    <div className="text">
   {text}
    </div>
    <div className="icons">
      <TfiWrite className='icon' onClick={updateMode}></TfiWrite>
      <MdDelete className='icon' onClick={deleteToDo} />
    </div>
</div>
  )
}

export default ToDo