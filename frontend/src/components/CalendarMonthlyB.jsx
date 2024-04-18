import React, {useState, useEffect} from 'react';
import { HStack, Select, Button, useDisclosure} from '@chakra-ui/react'
import bp from './Path.js'; 
import DayGrid from './DayGrid';
import CalendarAdd from './CalendarAdd';
import CalendarSearch from './CalendarSearch';
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import './Calendar.css';
const addButton = require('../assets/AddButton.png');
const searchButton = require('../assets/SearchEvent.png');

const CalendarMonthlyB = () =>  {

  let _ud = localStorage.getItem('user_data');
  var ud = JSON.parse(_ud);

  const [currentDay, setCurrentDay] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(currentDay.getMonth());
  const [currentYear, setCurrentYear] = useState(currentDay.getFullYear());
  const [events, setEvents] = useState([]); // Array of events
  //Add
  const [eventName, setEventName] = useState('');
  const [eventStart, setEventStart] = useState('');
  const [eventEnd, setEventEnd] = useState('');
  //Update
  const [updateEventName, setUpdateEventName] = useState('');
  const [updateEventStart, setUpdateEventStart] = useState('');
  const [updateEventEnd, setUpdateEventEnd] = useState('');


  const { isOpen, onOpen, onClose } = useDisclosure();  
  const { isOpen: searchIsOpen, onOpen: searchOnOpen, onClose: searchOnClose} = useDisclosure()

  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'];
  const years = [];
  for(let i = 0; i <= 30; i++)
  {
    years.push((currentYear - 15) + i);
  }

  useEffect(() => {
    // Fetch events when component mounts
    fetchEvents();
  }, []);

  const changeMonth = async month => {
    month = parseInt(month);
    if(month < 0)
    {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    }
    else if(month > 11){
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else{
      setCurrentMonth(month);
    }
  }
  
  //Fetch Events; uses UserID
  const fetchEvents = async event => {
    try {
        const response = await fetch(bp.buildPath(`api/calendar/events/${ud.UserID}`), {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            const data = await response.json();
            setEvents(data); // Update tasks state with fetched tasks
        } else {
            console.log('Failed to fetch events');
        }
    } catch (error) {
        console.error('Error fetching events:', error);
    }
  };

  //Create Event
  const createEvent = async event =>
  {
      event.preventDefault();
      let eventStartSplit = eventStart.split('T');
      let eventStartDate = eventStartSplit[0].split('-');
      let eventEndSplit = eventEnd.split('T');
      let eventEndDate = eventEndSplit[0].split('-');

      var obj_newEvent = 
      {
          Event: eventName,
          StartTime: eventStartSplit[1],
          StartDate: eventStartDate[1] + '/' + eventStartDate[2] + '/' + eventStartDate[0],
          EndTime: eventEndSplit[1],
          EndDate: eventEndDate[1] + '/' + eventEndDate[2] + '/' + eventEndDate[0],
          "UserID": ud.UserID
      };
      var js_newEvent = JSON.stringify(obj_newEvent);

      try {
          const response = await fetch(bp.buildPath('api/calendar/create'), {
              method: 'POST',
              body: js_newEvent,
              headers:{'Content-Type': 'application/json'}
          });

          const res = await response.json();
          obj_newEvent._id = res.EventID; //return newly created event's _id

          //Success
          if(response.ok){
              console.log(res);
              setEvents([...events, obj_newEvent]); // Add newly created event to tasks state
              setEventName(''); // Clear event name input

          } else {
              console.log(res);
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

      var obj_updateTask = 
      {
          Event: updateEventName,
          StartTime: eventStartSplit[1],
          StartDate: eventStartDate[1] + '/' + eventStartDate[2] + '/' + eventStartDate[0],
          EndTime: eventEndSplit[1],
          EndDate: eventEndDate[1] + '/' + eventEndDate[2] + '/' + eventEndDate[0],
      };
      var js_updateTask = JSON.stringify(obj_updateTask);

      try {
          const response = await fetch(bp.buildPath(`api/event/update/${currEventID}`), {
              method: 'PUT',
              body: js_updateTask,
              headers:{'Content-Type': 'application/json'}
          });

          const res = await response.json();

          //Success
          if(response.ok){
              console.log(res.message);
              //Update text on frontend

              // Find the index of the task with the given taskID
              const taskIndex = events.findIndex(task => task._id === currEventID);

              // Create a reference copy of tasks array
              const updatedTasks = [...events];

              // Change the update field of the specific task
              updatedTasks[taskIndex].Event = updateEventName;

              // Update the state with the modified tasks array
              setEvents(updatedTasks);

              setUpdateEventName(''); // Clear task name input
          } else {
              console.log(res.error);
          }
      } catch (e) {
          alert(e.toString());
      }
  }

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
              setEvents(prevTasks => prevTasks.filter(task => task._id !== currEventID));
          } else {
              console.log(res.error);
          }
      } catch (e) {
          alert(e.toString());
      }
  }

  return (
    <div className="bg-[#AAA06C]">
      {/*Calendar Header*/}
      <div className="header w-[90%] md:w-[80%]">
          <Button onClick={() => changeMonth(currentMonth - 1)} opacity='70%'>
            <FaArrowLeft/>
          </Button>
          <div className="month p-2 w-1/3 md:w-1/4">
            <Select value={currentMonth} onChange={(e) => changeMonth(e.target.value)} size={{base: "lg", md: 'xl'}} borderWidth='0px'>
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </Select>
          </div>
          <div className="year p-2 w-1/3 md:w-1/4">
            <Select value={currentYear} onChange={(e) => setCurrentYear(e.target.value)} size={{base: "lg", md: 'xl'}} borderWidth='0px'>
              {years.map((year) => (
                <option key={year} value={year}>{year}</option>
              ))}
            </Select>
          </div>
          <Button onClick={() => changeMonth(currentMonth + 1)} opacity='70%'>
            <FaArrowRight/>
          </Button>
      </div>

      {/*Calendar Body*/}
      <div className="calendar-body p-5">
          <div id="weekday-header" className="flex align-center justify-center">
          {
            weekdays.map((weekday) => {
              return (
              <div 
                className="weekday" key={weekday}>{weekday}
              </div>
              );
            })
          }
          </div>
          <DayGrid currentDay={currentDay} currentMonth={currentMonth} currentYear={currentYear} events={events}/>
        </div>

      {/*Calendar Footer/Actions*/}
      <div className="footer">
          <HStack spacing={10}>
            <Button onClick={onOpen}>
              Add Event
            </Button>
            <Button onClick={searchOnOpen}>
              Search Event
            </Button>
          </HStack>
      </div>
      <CalendarAdd isOpen={isOpen} onClose={onClose} setEventName={setEventName} setEventStart={setEventStart} setEventEnd={setEventEnd} createEvent={createEvent}/>
      <CalendarSearch searchIsOpen={searchIsOpen} searchOnClose={searchOnClose}/>
    </div>
  );
};

export default CalendarMonthlyB;
