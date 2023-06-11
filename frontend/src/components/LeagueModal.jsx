import { Box, Center, Flex, Wrap, transition } from "@chakra-ui/react";
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

const LeagueModal = (props) => {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [teams, setTeams] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchData = () => {
    try {
      fetch(
        process.env.REACT_APP_BASEURL +
          `getPlayerPredictions.php?year=${props.year}&id=${props.id}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          console.log(props.year, data.data)
          setTeams(data.data);
          setLoaded(true);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  if (!loaded)
    return (
      <div>
        <div onClick={openModal}>{props.children}</div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          closeTimeoutMS={100}
        >
          <div class="container">
            <div class="heading">
              {props.name} {props.year}/{parseInt(props.year) + 1} Prediction
            </div>
            <div class="loading">Loading...</div>
          </div>
        </Modal>
      </div>
    );
  else
    return (
      <div>
        <div onClick={openModal}>{props.children}</div>
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
          closeTimeoutMS={100}
          styles={{padding: "0px"}}
        >
          <Box className="container" backgroundColor={"rgb(150 150 150 / 45%)"} margin={0}>
            <div class="heading">
              {props.name} {props.year}/{parseInt(props.year) + 1} Prediction
            </div>
            {teams.map((team, index) => (
              <Wrap>
                <Center>
                  <Box w={"2em"} textAlign={"right"}>
                    {index + 1}
                  </Box>
                </Center>
                <Flex
                  backgroundColor={"rgb(228 228 228 / 25%);"}
                  w={"18em"}
                  margin={"4px"}
                  padding={"4px"}
                  borderRadius={"10px"}
                >
                  <Center flex="1">
                    <Box w="100%" paddingLeft={"10px"} textAlign={"left"}>
                      {team.name}
                    </Box>
                  </Center>
                </Flex>
              </Wrap>
            ))}
          </Box>
        </Modal>
      </div>
    );
};

export default LeagueModal;
