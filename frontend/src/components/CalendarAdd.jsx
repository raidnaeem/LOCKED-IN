import React, {useState, useEffect} from 'react';
import { Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton } from '@chakra-ui/react';


const CalendarAdd = ({isOpen, onClose}) =>  {

  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
              <ModalContent>
                <ModalHeader>Modal Title</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  test
                </ModalBody>

                <ModalFooter>
                  <Button colorScheme='blue' mr={3} onClick={onClose}>
                    Close
                  </Button>
                  <Button colorScheme='yellow'>Secondary Action</Button>
                </ModalFooter>
              </ModalContent>
          </Modal>
    </div>
  );
};

export default CalendarAdd;
