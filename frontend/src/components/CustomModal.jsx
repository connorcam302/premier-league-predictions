import { Box, Center, Flex, Stack, Wrap, transition } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    background: "rgba(10, 10, 10, 0)",
    borderRadius: "25px",
    border: "0px solid rgba(10, 10, 10, 0)",
    padding: "0px",
  },
  overlay: { background: "rgba(10, 10, 10, 0.3)" },
};

const CustomModal = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div>
      <div onClick={openModal}>{props.children}</div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
        closeTimeoutMS={100}
        styles={{ padding: "0px" }}
      >
        <Box
          className="container"
          backgroundColor={"rgb(150 150 150 / 45%)"}
          margin={0}
        >
          <Stack>
            <Center>
              <div>{props.message}</div>
            </Center>
            <Center>
              <button onClick={closeModal}>Close</button>
            </Center>
          </Stack>
        </Box>
      </Modal>
    </div>
  );
};

export default CustomModal;
