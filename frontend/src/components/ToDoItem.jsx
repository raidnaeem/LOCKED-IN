import React, {useState} from 'react';
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

function ToDoItem({taskName, doneStatus}){
    const [isChecked, setIsChecked] = useState(doneStatus);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle the checked state
    };

    return (   
        <div>
            <Checkbox isChecked={doneStatus} onChange={handleCheckboxChange}>
                {taskName}
            </Checkbox>
        </div>
    );
};

export default ToDoItem;