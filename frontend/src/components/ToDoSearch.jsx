import React, {useState} from 'react';
import { Stack, InputGroup, InputLeftElement, Input, Button } from "@chakra-ui/react";
const searchIcon = require('../assets/search-icon.png')


function ToDoSearch({searchTasks})
{

    return(
        <div className='p-2'>
            <Stack direction='row' spacing={5}>
                <InputGroup>
                    <InputLeftElement>
                        <img src={searchIcon} width='20px' alt='src-icon' className='absolute top-4'></img>
                    </InputLeftElement>
                    <Input bg='gray.200' height='50px'
                        type='text'
                        placeholder='Search for task'
                        id="searchTask"
                        onChange={(e) => searchTasks(e.target.value)}
                    />
                </InputGroup>
            </Stack>
        </div>
    );
};

export default ToDoSearch;