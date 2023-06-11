import { Box, Button, Center, Flex, Stack, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import LeagueModal from "./LeagueModal";

const NextSeasonPredictions = (props) => {
  const [users, setUsers] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchData = () => {
    try {
      fetch(process.env.REACT_APP_BASEURL + `get2023Users.php`)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          setUsers(data.data);
          setLoaded(true);
        });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Box className="container" w="18em">
      <Center>
        <Box className="heading">2023/2024 Submissions</Box>
      </Center>
      <Stack spacing={"0"}>
        {users.map((user, index) => (
          <LeagueModal name={user.username} id={user.userid} year="2023">
            <Center flex="1">
              <Flex
                backgroundColor={"rgb(228 228 228 / 25%);"}
                w={"18em"}
                margin={"4px"}
                padding={"4px"}
                borderRadius={"10px"}
              >
                <Box w="100%" paddingLeft={"10px"} textAlign={"left"}>
                  {user.username}
                </Box>
              </Flex>
            </Center>
          </LeagueModal>
        ))}
      </Stack>
    </Box>
  );
};

export default NextSeasonPredictions;
