import React, {useState} from 'react';
import { Stack, InputGroup, InputRightElement, Input, Button } from "@chakra-ui/react";

function ToDoForm({setTaskName, createTask})
{
    return(
        <div>
            <Stack direction='row' spacing={5}>
                <Input bg='gray.200' width='340px' height='50px'
                    type='text'
                    placeholder='Task Name'
                    id="newPassword"
                    onChange={(e) => setTaskName(e.target.value)}
                />
                <Button className="mt-2" h='2rem' size='xl' onClick={createTask}>
                    Add Task
                </Button>
            </Stack>
        </div>
    );
};

export default ToDoForm;