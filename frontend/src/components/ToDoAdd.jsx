import React, {useState, useEffect, useRef} from 'react';
import {Input, Button } from "@chakra-ui/react";
import './style_ToDo.css'

function ToDoAdd({setTaskName, taskName, createTask})
{    
    const [showInput, setShowInput] = useState(false);
    const inputRef = useRef(null); 

    //Opens field for add task submissoin
    const showAdd = () => {
        setShowInput(!showInput);
    };

    // Function to focus input field when it becomes visible
    useEffect(() => {
        if (showInput && inputRef.current) {
            inputRef.current.focus();
        }
    }, [showInput]);

    return(
        <div className='mt-5 p-3 pr-5 flex sm:flex-row justify-between'>
            <form onSubmit={createTask}>
                <Input bg='white' height='50px'
                    className={`w-full sm:w-[200px] ml-8 ${showInput ? 'fadeInLeft' : 'hidden'}`}
                    type='text'
                    placeholder='Task Name'
                    id="taskAddField"
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}   
                    ref={inputRef}
                />
            </form>
            <button className="mt-2 addButtonMenu rounded-full" onClick={showAdd}>
                {showInput ? 'Close Menu': '+ Add Task'}
            </button>
        </div>
    );
};

export default ToDoAdd;