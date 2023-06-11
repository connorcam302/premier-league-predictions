import {
  Box,
  Center,
  Flex,
  Spacer,
  Spinner,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { BiMinus, BiPlus } from "react-icons/bi";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { HiPlus } from "react-icons/hi";
import LeagueModal from "./LeagueModal";

const Teams = (props) => {
  const [teams, setTeams] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const fetchData = () => {
    try {
      fetch(process.env.REACT_APP_BASEURL + "getTeams.php?year=2022")
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

  const calcChange = (prev, current) => {
    if (prev == 21) {
      return (
        <Center color={"#F6E05E"} textAlign={"center"}>
          <HiPlus />
        </Center>
      );
    } else if (prev - current == 0) {
      return (
        <Center color={"#CBD5E0"}>
          <BiMinus />
        </Center>
      );
    } else if (prev - current > 0) {
      return (
        <Center color={"#68D391"} fontWeight={"bold"}>
          <IoIosArrowUp /> {prev - current}
        </Center>
      );
    } else if (prev - current < 0) {
      return (
        <Center color={"#E53E3E"} fontWeight={"bold"}>
          <IoIosArrowDown /> {(prev - current) * -1}
        </Center>
      );
    }
  };

  if (!loaded) {
    return (
      <Box w="10em" h="10em">
        Loading...
      </Box>
    );
  } else {
    return (
        <Box padding={"1em"}>
          <p className="heading">Final Standings 2022/2023</p>

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
                <Center>
                  <Box w="2.5em" textAlign={"left"} paddingLeft="5px">
                    {calcChange(team.placement_2021, team.placement_2022)}
                  </Box>
                </Center>

                <Box w="2em" textAlign={"left"} paddingLeft="5px">
                  <Center>
                    <img
                      src={`/logos/${team.name.replace(/\s/g, "")}.png`}
                      width="20px"
                    />
                  </Center>
                </Box>
                <Center flex="1">
                  <Box w="100%" paddingLeft={"2px"} textAlign={"left"}>
                    {team.name}
                  </Box>
                </Center>
              </Flex>
            </Wrap>
          ))}
        </Box>
    );
  }
};
export default Teams;
