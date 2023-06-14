import logo from "./logo.svg";
import "./App.css";
import Teams from "./components/Teams";
import { Box, Center, Spacer, Wrap } from "@chakra-ui/react";
import LoginBox from "./components/LoginBox";
import PredictionForm from "./components/PredictionForm";
import Standings from "./components/Standings";
import NextSeasonPredictions from "./components/NextSeasonPredictions";

function App() {
  return (
    <div className="App">
      <div class="bg"></div>
      <Wrap justify="center" padding={"4em"} w="100wv">
        <Wrap>
          <Box padding="1em 1em 0em 1em" className="container">
            <Teams />
          </Box>
          <Box>
            <Standings />
            <NextSeasonPredictions />
          </Box>
          <PredictionForm />
          <LoginBox />
        </Wrap>
      </Wrap>
      <Box position={"fixed"} bottom={0} right={0} padding={"15px"}>
        <img src="/pl-logo.png" width="100px"/>
      </Box>
    </div>
  );
}

export default App;
