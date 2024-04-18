import React, {useState, useEffect} from 'react';
import { Card, CardHeader, CardBody, CardFooter,
         Stack, ButtonGroup, Button, Input, InputGroup, InputLeftElement} from '@chakra-ui/react';
import bp from './Path.js'; 

const CalendarEventCard = ({event, deleteEvent}) =>  {

  return (
    <div className='col-span-1 min-w-[90%] md:min-w-[50%]'>
        <Card maxW='sm' margin={2}>
            <CardHeader className='font-poppins font-bold font-lg rounded-t-xl text-white' bg='#855A07'>
                {event.Event}
            </CardHeader>

            <CardBody bg='#F0DCB4'>
                <Stack mt='1' spacing='5'>
                    <div className='flex items-center ml-4'>
                        <span className='font-bold mr-4 w-[15%]'>Start: </span>
                        <p>{event.StartDate} {event.StartTime}</p>
                    </div>
                    <div className='flex items-center ml-4'>
                        <span className='font-bold mr-4 w-[15%]'>End: </span>
                        <p>{event.EndDate} {event.EndTime}</p>
                    </div>
                </Stack>
            </CardBody>

            <CardFooter bg='#F0DCB4' className='rounded-b-xl'>
                <ButtonGroup spacing='3' textAlign='right'>
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
