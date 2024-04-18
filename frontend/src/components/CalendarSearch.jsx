import React, {useState, useEffect} from 'react';
import { Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
         Stack, Input, InputGroup, InputLeftElement} from '@chakra-ui/react';
import bp from './Path.js'; 
import CalendarEventCard from './CalendarEventCard';
const searchIcon = require('../assets/search-icon.png')



const CalendarSearch = ({searchIsOpen, searchOnClose, events, setEvents}) =>  {

  const [localEvents, setLocalEvents] = useState([]); // Array of events for search menu
  const [queryEvent, setQueryEvent] = useState('');
  //Update
  const [updateEventName, setUpdateEventName] = useState('');
  const [updateEventStart, setUpdateEventStart] = useState('');
  const [updateEventEnd, setUpdateEventEnd] = useState('');

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

  //Update a event given a event's _id
  const updateEvent = async (currEventID) =>
  {
      let eventStartSplit = updateEventStart.split('T');
      let eventStartDate = eventStartSplit[0].split('-');
      let eventEndSplit = updateEventEnd.split('T');
      let eventEndDate = eventEndSplit[0].split('-');

      var obj_updateEvent = 
      {
          Event: updateEventName,
          StartTime: eventStartSplit[1],
          StartDate: eventStartDate[1] + '/' + eventStartDate[2] + '/' + eventStartDate[0],
          EndTime: eventEndSplit[1],
          EndDate: eventEndDate[1] + '/' + eventEndDate[2] + '/' + eventEndDate[0],
      };
      var js_updateEvent = JSON.stringify(obj_updateEvent);

      try {
          const response = await fetch(bp.buildPath(`api/event/update/${currEventID}`), {
              method: 'PUT',
              body: js_updateEvent,
              headers:{'Content-Type': 'application/json'}
          });

          const res = await response.json();

          //Success
          if(response.ok){
              console.log(res.message);
              //Update text on frontend

              // Find the index of the task with the given eventID
              const taskIndex = events.findIndex(event => event._id === currEventID);
              const localTaskIndex = localEvents.findIndex(event => event._id === currEventID);

              // Create a reference copy of event array
              const updatedTasks = [...events];
              const localUpdatedTasks = [...localEvents]

              // Change the update fields of the specific event
              updatedTasks[taskIndex].Event = updateEventName;
              updatedTasks[taskIndex].StartTime = obj_updateEvent.StartTime;
              updatedTasks[taskIndex].StartDate = obj_updateEvent.StartDate;
              updatedTasks[taskIndex].EndTime = obj_updateEvent.EndTime;
              updatedTasks[taskIndex].EndDate = obj_updateEvent.EndDate;

              localUpdatedTasks[localTaskIndex].Event = updateEventName;
              localUpdatedTasks[localTaskIndex].StartTime = obj_updateEvent.StartTime;
              localUpdatedTasks[localTaskIndex].StartDate = obj_updateEvent.StartDate;
              localUpdatedTasks[localTaskIndex].EndTime = obj_updateEvent.EndTime;
              localUpdatedTasks[localTaskIndex].EndDate = obj_updateEvent.EndDate;

              // Update the state with the modified tasks array
              setEvents(updatedTasks);
              setLocalEvents(localUpdatedTasks)

              setUpdateEventName(''); // Clear task name input
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
                            <CalendarEventCard key={event._id} event={event} deleteEvent={deleteEvent} updateEvent={updateEvent} 
                            setUpdateEventName={setUpdateEventName} setUpdateEventStart={setUpdateEventStart} setUpdateEventEnd={setUpdateEventEnd}/>
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
