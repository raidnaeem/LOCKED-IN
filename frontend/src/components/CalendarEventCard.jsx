import React, {useState, useEffect} from 'react';
import { Button, Drawer, DrawerBody, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton,
         Stack, Input, InputGroup, InputLeftElement} from '@chakra-ui/react';
import bp from './Path.js'; 

const CalendarEventCard = ({event}) =>  {

  return (
    <div>
        {event.Event}
    </div>
  );
};

export default CalendarEventCard;
