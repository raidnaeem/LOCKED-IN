import React, {useState} from 'react';
import { Button, Checkbox, CloseButton } from "@chakra-ui/react";
import {FaCopy} from 'react-icons/fa';

function ToDoItem({taskName, doneStatus, taskID, onMark, deleteTask}){

    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleCheckboxChange = () => {
        onMark(taskID); // Call the function to update the status in parent component
    };

    const delEvent = () => {
        deleteTask(taskID);
    }

    const copyTask = () => {
        navigator.clipboard.writeText(taskName);
    }

    return (   
        <div id={`task-${taskID}`} className={`w-[98%] flex justify-between items-center pl-5 pr-6 pt-3 pb-3 ${isHovered ? 'bg-gray' : 'bg-white'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}             >
            <Checkbox colorScheme='yellow' border='brown' isChecked={doneStatus} onChange={handleCheckboxChange} size='lg' spacing={6}>
                <span className='text-[20px]'>
                    {taskName}
                </span>
            </Checkbox>
            {isHovered && (
                <div className='flex inline-block items-center'>
                    <Button onClick={copyTask}>
                        <FaCopy className='text-blue'/>
                    </Button>
                    <CloseButton size='md' color='red' onClick={delEvent}>
                        {/* Close button content */}
                    </CloseButton>
                </div>
            )}
        </div>
    );
};

export default ToDoItem;