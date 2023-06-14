import {
  Box,
  Button,
  Center,
  Flex,
  Spacer,
  Stack,
  Wrap,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../App.css";
import LeagueModal from "./LeagueModal";

const Standings = (props) => {
  const [standings, setStandings] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchData = () => {
    try {
      fetch(process.env.REACT_APP_BASEURL + "allPlayerPoints.php?year=2022")
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setStandings(data.data);
          setLoaded(true);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  console.log(standings);
  return (
    <Box className="container" w="18em">
      <Center>
        <Box className="heading">2022/2023 Prediction Standings</Box>
      </Center>
      <Stack spacing={"0"}>
        {standings.map((standing, index) => (
          <LeagueModal name={standing.username} id={standing.id} year="2022">
            <Wrap>
              <Center>
                <Box w={"2em"} textAlign={"right"}>
                  {index + 1}
                </Box>
              </Center>
              <Flex
                backgroundColor={"rgb(228 228 228 / 25%);"}
                w={"70%"}
                margin={"4px"}
                padding={"4px"}
                borderRadius={"10px"}
                paddingLeft={"0.5em"}
                paddingRight={"1em"}
                _hover={{cursor:"pointer"}}
              >
                <Center flex="1">
                  <Box w="100%" paddingLeft={"10px"} textAlign={"left"}>
                    {standing.username}
                  </Box>
                </Center>
                <Spacer />
                <Center>{standing.points}</Center>
              </Flex>
            </Wrap>
          </LeagueModal>
        ))}
      </Stack>
    </Box>
  );
};

export default Standings;
