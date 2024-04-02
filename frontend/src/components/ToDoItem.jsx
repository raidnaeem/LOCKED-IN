import React, {useState} from 'react';
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

function ToDoItem({taskName, doneStatus, taskonToggleStatus}){

    const [isChecked, setIsChecked] = useState(doneStatus);

    const handleCheckboxChange = () => {
        const newStatus = !isChecked;
        setIsChecked(newStatus); // Update local state
        //onToggleStatus(newStatus); // Call the function to update the status in parent component
    };

    return (   
        <div>
            <Checkbox isChecked={doneStatus} onChange={handleCheckboxChange} size='lg'>
                {taskName}
            </Checkbox>
        </div>
    );
};

export default ToDoItem;