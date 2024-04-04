import React, {useState, useEffect} from 'react';
import bp from './Path.js'; 
import ToDoSearch from './ToDoSearch.jsx';
import ToDoItem from './ToDoItem.jsx';
import ToDoAdd from './ToDoAdd.jsx';
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

function ToDoPrototype()
{
    let _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks when component mounts
        searchTasks('');
    }, []);

    //Search Tasks; given query of searchItem, uses current user's ID.
    const searchTasks = async searchItem => {
        try {
            const response = await fetch(bp.buildPath(`api/todo/search?query=${searchItem}&userID=${ud.UserID}`), {
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
                //setTaskName(''); // Clear task name input

            } else {
                console.log(res);
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
                // Remove the deleted task from the tasks array
                setTasks(prevTasks => prevTasks.filter(task => task._id !== currTaskID));
            } else {
                console.log(res.error);
            }
        } catch (e) {
            alert(e.toString());
        }

    }

    //IN-PROGRESS: Function that will clear all tasks that are marked done
    const clearCompleted = async event =>
    {
        event.preventDefault();
    }

    return(
        <div>
            <div className='bg-gray w-1/2 relative left-1/4'>
                <h1 className='text-[50px] text-bold'>
                    To-Do List
                </h1>
                <div>
                    <ToDoSearch
                        searchTasks={searchTasks}
                    />
                    <CheckboxGroup id="todoList" w="100%" size="lg" h="100%" minH="100vh">
                        {tasks.map((task, index) => (
                            <ToDoItem key={index} taskName={task.Task} doneStatus={task.Done} taskID={task._id} onMark={onMark} deleteTask={deleteTask}/>
                        ))}
                    </CheckboxGroup>
                    <ToDoAdd 
                        setTaskName={setTaskName}
                        createTask={createTask}
                    />
                </div>
            </div>
        </div>
    );
};

export default ToDoPrototype;