import React, {useState, useEffect} from 'react';
import { Card, CardHeader, CardBody, CardFooter,
         Stack, ButtonGroup, Button, Input, InputGroup, InputLeftElement} from '@chakra-ui/react';
import bp from './Path.js'; 
import { IoIosCloseCircle } from "react-icons/io";

const CalendarEventCard = ({event, deleteEvent, updateEvent, setUpdateEventName, setUpdateEventStart, setUpdateEventEnd}) =>  {

    const [editMode, setEditMode] = useState(false);

    //Toggle editMode that will re-render elements based on the status
    const editEvent = () => {
        setEditMode(!editMode);
    }

    //Calls endpoint in ToDo parent to update task
    const editSubmit = (e) => {
        e.preventDefault();
        setEditMode(false);
        updateEvent(event._id);
    }

  return (
    <div className='col-span-1 min-w-[90%] md:min-w-[50%]'>
        <Card maxW='sm' margin={2}>
            <CardHeader className='font-poppins font-bold font-lg rounded-t-xl text-white' bg='#855A07'>
                <p className={`${editMode ? 'hidden' : ''}`}>{event.Event}</p>
                <Input className={`${editMode ? '' : 'hidden'}`} onChange={(e) => setUpdateEventName(e.target.value)}>
                </Input>
            </CardHeader>

            <CardBody bg='#F0DCB4'>
                <Stack mt='1' spacing='5'>
                    <div className='flex items-center ml-4'>
                        <span className='font-bold mr-4 w-[15%]'>Start: </span>
                        <p className={`${editMode ? 'hidden' : ''}`}>{event.StartDate} {event.StartTime}</p>
                        <Input className={`${editMode ? '' : 'hidden'}`} borderColor='black' type='datetime-local'
                             onChange={(e) => setUpdateEventStart(e.target.value)}
                        >
                        </Input>
                    </div>
                    <div className='flex items-center ml-4'>
                        <span className='font-bold mr-4 w-[15%]'>End: </span>
                        <p className={`${editMode ? 'hidden' : ''}`}>{event.EndDate} {event.EndTime}</p>
                        <Input className={`${editMode ? '' : 'hidden'}`} borderColor='black' type='datetime-local'
                             onChange={(e) => setUpdateEventEnd(e.target.value)}
                        >
                        </Input>
                    </div>
                </Stack>
            </CardBody>

            <CardFooter bg='#F0DCB4' className='rounded-b-xl'>
                <ButtonGroup spacing='3' textAlign='right'>
                <Button variant='ghost' colorScheme='blue' onClick={editEvent}>
                    <span className={`${editMode ? 'hidden' : ''}`}>Edit</span>
                    <IoIosCloseCircle className={`${editMode ? '' : 'hidden'}`}/>
                </Button>
                {editMode && <Button variant='solid' colorScheme='blue' onClick={(e) => editSubmit(e)}>
                        Apply
                    </Button>}
                <Button variant='solid' colorScheme='red' onClick={() => deleteEvent(event._id)}>
                    Delete
                </Button>
                </ButtonGroup>
            </CardFooter>
        </Card>
    </div>
  );
};

export default CalendarEventCard;
