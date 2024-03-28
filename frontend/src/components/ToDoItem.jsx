import React from 'react';
import { Checkbox, CheckboxGroup } from "@chakra-ui/react";

function ToDoItem({taskName, doneStatus}){
    return (   
        <div>
            <Checkbox isChecked={doneStatus}>
                {taskName}
            </Checkbox>
        </div>
    );
};

export default ToDoItem;