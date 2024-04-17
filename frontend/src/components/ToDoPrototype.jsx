import React, {useState, useEffect} from 'react';
import { Resizable } from 'react-resizable';
import bp from './Path.js'; 
import ToDoSearch from './ToDoSearch.jsx';
import ToDoItem from './ToDoItem.jsx';
import ToDoAdd from './ToDoAdd.jsx';
import { Button, Input, InputGroup, InputLeftAddon, InputRightAddon, CheckboxGroup } from "@chakra-ui/react";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import './style_ToDo.css'

function ToDoPrototype()
{
    let _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    
    const [taskName, setTaskName] = useState(''); // Keeps track of the added task name
    const [updateTaskName, setUpdateTaskName] = useState(''); // Keeps track of the updated task name
    const [queryTask, setQueryTask] = useState(''); // current value of search 
    const [pageNumber, setPageNumber] = useState(1); // Default page number is 1
    const [tasks, setTasks] = useState([]); // Array of tasks

    useEffect(() => {
        // Fetch tasks when component mounts
        searchTasks(queryTask);
    }, [pageNumber, queryTask]);

    //Sets page number and calls search to re-render task array
    const changePage = page => {
        page = parseInt(page);
        if(page <= 0 || isNaN(page))
        {
            return;
        }
        setPageNumber(page);
    }

    //Search Tasks; given query of searchItem, uses current user's ID.
    const searchTasks = async searchItem => {
        try {
            const response = await fetch(bp.buildPath(`api/todo/search?query=${searchItem}&userID=${ud.UserID}&page=${pageNumber}`), {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                setTasks(data); // Update tasks state with fetched tasks
            } else {
                console.log('Failed to fetch tasks');
            }
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };

    //Add Task  
    const createTask = async event =>
    {
        event.preventDefault();

        var obj_newTask = 
        {
            Task: taskName,
            TaskImage: {
                FileName: "default",
                ContentType: "default-type"
            },
            "Done": false,
            "UserID": ud.UserID
        };
        var js_newTask = JSON.stringify(obj_newTask);

        try {
            const response = await fetch(bp.buildPath('api/task/add'), {
                method: 'POST',
                body: js_newTask,
                headers:{'Content-Type': 'application/json'}
            });

            const res = await response.json();
            obj_newTask._id = res.TaskID; //return newly created task's _id

            //Success
            if(response.ok){
                console.log(res);
                setTasks([...tasks, obj_newTask]); // Add newly created task to tasks state
                setTaskName(''); // Clear task name input

            } else {
                console.log(res);
            }
            } catch (e) {
                alert(e.toString());
            }
    }

    //Update a task given a task's _id
    const updateTask = async (currTaskID) =>
    {
        var obj_updateTask = 
        {
            Task: updateTaskName
        };
        var js_updateTask = JSON.stringify(obj_updateTask);

        try {
            const response = await fetch(bp.buildPath(`api/task/update/${currTaskID}`), {
                method: 'PUT',
                body: js_updateTask,
                headers:{'Content-Type': 'application/json'}
            });

            const res = await response.json();

            //Success
            if(response.ok){
                console.log(res.message);
                //Update text on frontend

                // Find the index of the task with the given taskID
                const taskIndex = tasks.findIndex(task => task._id === currTaskID);

                // Create a reference copy of tasks array
                const updatedTasks = [...tasks];

                // Change the update field of the specific task
                updatedTasks[taskIndex].Task = updateTaskName;

                // Update the state with the modified tasks array
                setTasks(updatedTasks);

                setUpdateTaskName(''); // Clear task name input
            } else {
                console.log(res.error);
            }
        } catch (e) {
            alert(e.toString());
        }
    }

    //Mark a task given a task's _id
    const onMark = async (currTaskID) =>
    {
        try {
            const response = await fetch(bp.buildPath(`api/task/markDone/${currTaskID}`), {
                method: 'PUT',
            });

            const res = await response.json();

            //Success
            if(response.ok){
                console.log(res.message);
                //Update checkmark on frontend

                // Find the index of the task with the given taskID
                const taskIndex = tasks.findIndex(task => task._id === currTaskID);

                // Create a reference copy of tasks array
                const updatedTasks = [...tasks];

                // Toggle the 'Done' status of the specific task
                updatedTasks[taskIndex].Done = true;

                // Update the state with the modified tasks array
                setTasks(updatedTasks);
            } else {
                console.log(res.error);
            }
        } catch (e) {
            alert(e.toString());
        }
    }

    const deleteTask = async (currTaskID) =>
    {
        try {
            const response = await fetch(bp.buildPath(`api/task/delete/${currTaskID}`), {
                method: 'DELETE',
            });

            const res = await response.json();
            
            //Success
            if(response.ok) {
                console.log(res.message);

                //Delete animation
                const delTask = document.getElementById(`task-${currTaskID}`)
                console.log(delTask);
                delTask.classList.add('fadeOutLeft');

                // Wait for animation to finish
                delTask.addEventListener('animationend', () => {
                    // Remove the deleted task from the tasks array
                    console.log('deleted');
                    setTasks(prevTasks => prevTasks.filter(task => task._id !== currTaskID));
                });
            } else {
                console.log(res.error);
            }
        } catch (e) {
            alert(e.toString());
        }

    }

    //Function that will clear all rendered tasks that are marked done on the page 
    const clearCompleted = async event =>
    {
        event.preventDefault();
        if(window.confirm("Clear all completed tasks on this page?"))
        {
            var i;
            for(i = 0; i < tasks.length; i++)
            {
                const currTask = tasks[i];
                if(currTask.Done)
                {
                    deleteTask(currTask._id);
                }
            }
            setPageNumber(pageNumber);
        }
    }

    return(
        <div className='w-1/2 relative left-1/4 bg-white rounded-xl'>
            {/*Title and Clear Button*/}
            <div className='flex items-center justify-between pl-5 pr-5 rounded-t-xl bg-brown bg-opacity-70'>
                <h1 className='text-[50px] text-bold font-poppins text-white underline'>
                    To-Do List
                </h1>
                <Button onClick={clearCompleted} colorScheme='yellow'>
                    Clear Done
                </Button>
            </div>  
            {/*Search, List Items, Add*/}
            <div className='min-h-[720px]'>
                <ToDoSearch
                    setQueryTask={setQueryTask}
                />
                <CheckboxGroup id="todoList" w="100%" size="lg" h="100%" minH="100vh">
                    {tasks.map((task) => (
                        <ToDoItem key={task._id} taskName={task.Task} doneStatus={task.Done} taskID={task._id} onMark={onMark} deleteTask={deleteTask} updateTask={updateTask} updateTaskName={updateTaskName} setUpdateTaskName={setUpdateTaskName}/>
                    ))}
                </CheckboxGroup>
                <ToDoAdd 
                    setTaskName={setTaskName}
                    taskName={taskName}
                    createTask={createTask}
                />
            </div>
            {/*Pagination*/}
            <div className='flex items-center justify-center pb-5'>
                <h5 className='mr-5 hidden md:block'>
                    Page
                </h5>
                <InputGroup w='40%'>
                    <InputLeftAddon>
                        <Button onClick={() => changePage(pageNumber - 1)} isDisabled={pageNumber === 1}>
                            <MdKeyboardArrowLeft />
                        </Button>
                    </InputLeftAddon>
                    <Input className='hidden md:block' w='30%' placeholder={pageNumber}
                     onKeyDown={(e) => {
                        if(e.key === 'Enter')
                        {
                            e.preventDefault();
                            changePage(e.target.value);
                            e.target.value = '';
                        }
                     }}
                    >

                    </Input>
                    <InputRightAddon>
                        <Button onClick={() => changePage(pageNumber + 1)}>
                            <MdKeyboardArrowRight />
                        </Button>
                    </InputRightAddon>
                </InputGroup>
            </div>
        </div>
    );
};

export default ToDoPrototype;