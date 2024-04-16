import React, {useRef, useEffect, useState} from 'react';
import { Button, Checkbox, CloseButton, Input } from "@chakra-ui/react";
import {FaEdit, FaCopy} from 'react-icons/fa';
import { IoIosCloseCircle } from "react-icons/io";


function ToDoItem({taskName, doneStatus, taskID, onMark, deleteTask, updateTask, updateTaskName, setUpdateTaskName}){

    const [isHovered, setIsHovered] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const inputRef = useRef(null); 

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        //setEditMode(false);
    };

    const handleCheckboxChange = () => {
        onMark(taskID); 
    };

    const delEvent = () => {
        deleteTask(taskID);
    }

    const copyTask = () => {
        navigator.clipboard.writeText(taskName);
    }

    //Toggle editMode that will re-render elements based on the status
    const editEvent = () => {
        setEditMode(!editMode);
    }

    //Calls endpoint in ToDo parent to update task
    const editSubmit = (e) => {
        e.preventDefault();
        setEditMode(false);
        updateTask(taskID);
    }

    // Function to focus input field when it becomes visible
    useEffect(() => {
        if (editMode && inputRef.current) {
            inputRef.current.focus();
        }
    }, [editMode]);

    return (   
        <div 
            id={`task-${taskID}`} 
            className={`w-[100%] flex rounded-md justify-between items-center pl-5 pr-5 pt-3 pb-3 ${isHovered ? 'bg-gray' : 'bg-white'}`} 
            onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}
        >
            <Checkbox colorScheme='yellow' border='brown' isChecked={doneStatus} onChange={handleCheckboxChange} size='lg' spacing={6}>
                <span className={`text-[20px] ${editMode ? 'hidden' : ''}`}>
                    {taskName}
                </span>
            </Checkbox>
            <form className={`${editMode ? '' : 'hidden'} w-full`} onSubmit={(e) => editSubmit(e)}>
                <Input 
                    placeholder={taskName}
                    ref={inputRef}
                    value={updateTaskName}
                    onChange={(e) => setUpdateTaskName(e.target.value)}   
                />
            </form>
            {isHovered && (
                <div className='flex inline-block items-center'>
                    <Button onClick={editEvent} alt='edit'>
                        <FaEdit className={`${editMode ? 'hidden' : ''}`}/>
                        <IoIosCloseCircle className={`${editMode ? '' : 'hidden'}`}/>
                    </Button>
                    <Button onClick={copyTask} alt='copy' hidden={editMode}>
                        <FaCopy className='text-blue'/>
                    </Button>
                    <CloseButton size='md' color='red' hidden={editMode} onClick={delEvent} alt='del-button'>
                        {/* Close button content */}
                    </CloseButton>
                </div>
            )}
        </div>
    );
};

export default ToDoItem;