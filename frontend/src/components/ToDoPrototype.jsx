import React, {useState, useEffect} from 'react';
import bp from './Path.js'; 
import ToDoForm from './ToDoForm.jsx';
import ToDoItem from './ToDoItem.jsx';
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

function ToDoPrototype()
{
    let _ud = localStorage.getItem('user_data');
    var ud = JSON.parse(_ud);
    //console.log(ud.UserID);
    
    const [taskName, setTaskName] = useState('');
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Fetch tasks when component mounts
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await fetch(bp.buildPath('api/todo/search?query=&userID=64'), {
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

            //Success
            if(response.ok){
                console.log(res);
                setTasks([...tasks, res]); // Add newly created task to tasks state
                //setTaskName(''); // Clear task name input

            } else {
                console.log(res);
            }


        } catch (e) {
            alert(e.toString());
        }
    }

    return(
        <div>
            <div className='bg-gray w-1/2 relative left-1/4'>
                <div>
                    <ToDoForm
                        setTaskName={setTaskName}
                        createTask={createTask}
                    />
                    <CheckboxGroup id="todoList" spacing={4} w="100%" size="lg" h="100%" minH="100vh"x>
                        {tasks.map((task, index) => (
                            <ToDoItem key={index} taskName={task.Task} doneStatus={task.Done} />
                        ))}
                    </CheckboxGroup>
                </div>
            </div>
        </div>
    );
};

export default ToDoPrototype;