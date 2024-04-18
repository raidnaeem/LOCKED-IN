import React, {useState, useEffect} from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton,
         Input, FormControl, FormLabel, FormErrorMessage} from '@chakra-ui/react';


const CalendarAdd = ({isOpen, onClose, setEventName, setEventStart, setEventEnd, createEvent}) =>  {

  const [nameError, setNameError] = useState(false);
  const [startError, setStartError] = useState(false);
  const [endError, setEndError] = useState(false);

  const submitAdd = (event) => {
    event.preventDefault();
  
    const isNameError = document.getElementById('eventNameAdd').value === '';
    const isStartError = document.getElementById('startDateAdd').value === '';
    const isEndError = document.getElementById('endDateAdd').value === '';
  
    setNameError(isNameError);
    setStartError(isStartError);
    setEndError(isEndError);
  
    if (isNameError || isStartError || isEndError) {
      return;
    } else {
      createEvent(event);
      onClose();
    }
  }
  
  const closeClear = (event) => {
    event.preventDefault();
    setNameError(false);
    setStartError(false);
    setEndError(false);
    onClose();
  }

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} size='xl'>
            <ModalOverlay />
              <ModalContent>
                <ModalHeader>Enter event details</ModalHeader>
                <ModalCloseButton onClick={(e) => closeClear(e)}/>
                <div className='w-[100%] h-[1px] bg-slate-600 opacity-80'></div>

                <ModalBody>
                  <FormControl isInvalid={nameError}>
                    <FormLabel>Event Name</FormLabel>
                    <Input id='eventNameAdd' placeholder='Enter event name' size='md' onChange={(e) => setEventName(e.target.value)}/>
                    <FormErrorMessage mb={5}>Enter name for event.</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={startError}>
                    <FormLabel>Start Date</FormLabel>
                    <Input id='startDateAdd' size='md' type='datetime-local' onChange={(e) => setEventStart(e.target.value)}/>
                    <FormErrorMessage mb={5}>Please pick a starting date and time.</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={endError}>
                    <FormLabel>End Date</FormLabel>
                    <Input id='endDateAdd' size='md' type='datetime-local' onChange={(e) => setEventEnd(e.target.value)}/>
                    <FormErrorMessage mb={5}>Please pick an ending date and time.</FormErrorMessage>
                  </FormControl>
                  
                </ModalBody>

                <ModalFooter>
                  <Button mr={3} onClick={(e) => closeClear(e)}>
                    Close
                  </Button>
                  <Button colorScheme='yellow' onClick={(e) => submitAdd(e)}>Add Event</Button>
                </ModalFooter>
              </ModalContent>
          </Modal>
    </div>
  );
};

export default CalendarAdd;
