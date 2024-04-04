import React, {useState} from 'react';
import { Checkbox, CloseButton } from "@chakra-ui/react";

function ToDoItem({taskName, doneStatus, taskID, onMark, deleteTask}){

    const handleCheckboxChange = () => {
        onMark(taskID); // Call the function to update the status in parent component
        console.log("clicked checkbox");
    };

    return (   
        <div className="w-[90%] flex justify-between pl-3 pt-1 pb-1">
            <Checkbox id={taskID} isChecked={doneStatus} onChange={handleCheckboxChange} size='lg' spacing={6}>
                {taskName}
            </Checkbox>
            <CloseButton size='sm' onClick={() => deleteTask(taskID)}>
               
            </CloseButton>
        </div>
    );
};

export default ToDoItem;