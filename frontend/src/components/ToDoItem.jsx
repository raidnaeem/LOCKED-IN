import React, { useState } from 'react';
import { Checkbox, CheckboxGroup, IconButton } from "@chakra-ui/react";
import { DeleteIcon } from '@chakra-ui/icons';

function ToDoItem({ taskName, doneStatus, onDelete }) {
    const [isChecked, setIsChecked] = useState(doneStatus);

    const handleCheckboxChange = () => {
        setIsChecked(!isChecked); // Toggle the checked state
    };

    return (
        <div>
            <Checkbox isChecked={isChecked} onChange={handleCheckboxChange}>
                {taskName}
            </Checkbox>
            <IconButton
                aria-label="Delete Task"
                icon={<DeleteIcon />}
                onClick={onDelete}
            />
        </div>
    );
}

export default ToDoItem;