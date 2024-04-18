import React, {useState, useEffect} from 'react';
import { Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
         Stack, Input, InputGroup, InputLeftElement} from '@chakra-ui/react';
import bp from './Path.js'; 
import CalendarEventCard from './CalendarEventCard';
const searchIcon = require('../assets/search-icon.png')



const CalendarSearch = ({searchIsOpen, searchOnClose, setEvents}) =>  {

  const [localEvents, setLocalEvents] = useState([]); // Array of events for search menu
  const [queryEvent, setQueryEvent] = useState('');

  let _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);

  useEffect(() => {
    // This effect will run whenever queryEvent updates
    searchEvents(queryEvent);
  }, [queryEvent]);

  //Search Events; given query of searchEvent, uses current user's ID.
  const searchEvents = async searchEvent => {
    try {
        const response = await fetch(bp.buildPath(`api/calendar/search?query=${searchEvent}&userID=${ud.UserID}`), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const data = await response.json();
            setLocalEvents(data); // Update tasks state with fetched tasks
        } else {
            console.log('Failed to fetch events');
        }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
};

//Delete Event by it's _id
const deleteEvent = async (currEventID) =>
{
    try {
        const response = await fetch(bp.buildPath(`api/calendar/delete/${currEventID}`), {
            method: 'DELETE',
        });

        const res = await response.json();
        
        //Success
        if(response.ok) {
            console.log(res.message);

            // Remove the deleted event from the events array
            console.log('deleted');
            setLocalEvents(prevEvents => prevEvents.filter(event => event._id !== currEventID));
            setEvents(prevEvents => prevEvents.filter(event => event._id !== currEventID));
        } else {
            console.log(res.error);
        }
    } catch (e) {
        alert(e.toString());
    }
}

  return (
    <div>
      <Drawer
        isOpen={searchIsOpen}
        placement='right'
        onClose={searchOnClose}
        size='xl'
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Search Events</DrawerHeader>

          <DrawerBody>
            <Stack direction='row' spacing={5}>
                <InputGroup>
                    <InputLeftElement>
                        <img src={searchIcon} width='20px' alt='srch-icon' className='absolute top-4'></img>
                    </InputLeftElement>
                    <Input bg='gray.200' height='50px'
                        type='text'
                        placeholder='Search for event'
                        id="searchEvent"
                        value={queryEvent} // Set the value of the input field to the state variable
                        onChange={(e) => setQueryEvent(e.target.value)}
                    />
                </InputGroup>
            </Stack>
                <div className='flex flex-wrap grid-cols-2 ml-8 md:ml-5'>
                    {localEvents.map((event) => (
                            <CalendarEventCard key={event._id} event={event} deleteEvent={deleteEvent}/>
                    ))}
                </div>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={searchOnClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default CalendarSearch;
