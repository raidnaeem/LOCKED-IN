import React, {useState, useEffect, useRef} from 'react';
import {Input, FormControl, FormErrorMessage } from "@chakra-ui/react";
import './style_ToDo.css'

function ToDoAdd({setTaskName, taskName, createTask})
{    
    const [showInput, setShowInput] = useState(false);
    const [isError, setIsError] = useState(false);
    const inputRef = useRef(null); 
    
    //Opens field for add task submissoin
    const showAdd = () => {
        setShowInput(!showInput);
        setIsError(false);
    };

    // Function to focus input field when it becomes visible
    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);

    const submitTask = event => {
        event.preventDefault();
        if(document.getElementById("taskAddField").value === '') {
            setIsError(true);
            return;
        }
        setIsError(false);
        createTask(event);
    }

    return(
        <div className='mt-5 p-3 pr-5 flex sm:flex-row justify-between'>
            <FormControl isInvalid={isError}>
                <form onSubmit={(e) => submitTask(e)}>
                    <Input bg='white' height='50px'
                        className={`ml-10 ${showInput ? 'fadeInLeft' : 'hidden'}`}
                        type='text'
                        placeholder='Task Name'
                        width='200px'
                        id="taskAddField"
                        value={taskName}
                        onChange={(e) => setTaskName(e.target.value)}   
                        ref={inputRef}
                    />
                </form>
                <FormErrorMessage className={`ml-10 ${isError ? 'hidden' : ''}`}>Please enter name of task.</FormErrorMessage>
            </FormControl>
            <button className="mt-2 addButtonMenu rounded-full w-[15%] h-[10%]" onClick={showAdd}>
                {showInput ? 'Close Menu': '+ Add Task'}
            </button>
        </div>
    );
};

export default ToDoAdd;