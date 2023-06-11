import { Box, Button, Center, Stack, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../App.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import CustomModal from "./CustomModal";

const PredictionForm = (props) => {
  const [auth, setAuth] = useState(Cookies.get("token") == null ? false : true);
  const [userId, setUserId] = useState(
    auth ? jwt_decode(Cookies.get("token")).data.user_id : null
  );
  const [teams, setTeams] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchData = () => {
    try {
      fetch(
        process.env.REACT_APP_BASEURL +
          `getPlayerPredictions.php?year=2023&id=${userId}`
      )
        .then((response) => {
          return response.json();
        })
        .then((data) => {
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

  const [submitResponse, setSubmitResponse] = useState([]);

  const handleDrop = (droppedItem) => {
    if (!droppedItem.destination) return;
    var updatedList = [...teams];
    const [reorderedItem] = updatedList.splice(droppedItem.source.index, 1);
    updatedList.splice(droppedItem.destination.index, 0, reorderedItem);
    setTeams(updatedList);
  };

  const makeNums = () => {
    const numbers = [];
    for (let i = 1; i <= 20; i++) {
      numbers.push(<Center h="26px">{i}</Center>);
    }
    return numbers;
  };

  const handleSubmit = async () => {
    let data = [];
    for (let i = 0; i < teams.length; i++) {
      data.push({
        teamid: teams[i].teamid,
        position: i + 1,
      });
    }
    const response = await fetch(
      process.env.REACT_APP_BASEURL + "submitTeam.php",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ user: userId, prediction: data }),
      }
    );
    setSubmitResponse(response);
    // console.log(JSON.stringify({ user: userId, prediction: data }));
  };

  if (auth) {
    return (
      <Box margin="1em">
        <Center>
          <Stack
            backgroundColor={"rgb(228 228 228 / 15%);"}
            borderRadius={"25px"}
            padding={"1.5em"}
            w={"15em"}
            boxShadow={"0px 10px 15px 10px rgb(0 0 0 / 15%)"}
            align={"center"}
          >
            <Box className="heading" w={"12em"}>
              Your 2023/2024 Predictions
            </Box>
            <Wrap>
              <Stack spacing={"10px"}>{makeNums()}</Stack>
              <DragDropContext onDragEnd={handleDrop}>
                <Droppable
                  droppableId="list-container"
                  style={{ transform: "none" }}
                >
                  {(provided) => (
                    <div
                      className="list-container"
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                    >
                      <Stack>
                        {teams.map((item, index) => {
                          return (
                            <Draggable
                              key={item.teamid}
                              draggableId={item.teamid.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <div
                                  className="item-container"
                                  ref={provided.innerRef}
                                  {...provided.dragHandleProps}
                                  {...provided.draggableProps}
                                >
                                  <Wrap paddingRight={"8px"}>
                                    <Box
                                      w="2em"
                                      textAlign={"left"}
                                      paddingLeft="5px"
                                    >
                                      <Center>
                                        <img
                                          src={`/logos/${item.name.replace(
                                            /\s/g,
                                            ""
                                          )}.png`}
                                          width="20px"
                                        />
                                      </Center>
                                    </Box>
                                    <Center>{item.name}</Center>
                                  </Wrap>
                                </div>
                              )}
                            </Draggable>
                          );
                        })}
                      </Stack>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </Wrap>
            <Center w="12em" marginTop="1em">
              <CustomModal message={submitResponse.ok ? "Team Submitted" : "Error Could Not Submit"}>
                <button onClick={() => handleSubmit()}>Submit</button>
              </CustomModal>
            </Center>
          </Stack>
        </Center>
      </Box>
    );
  }
};

export default PredictionForm;
