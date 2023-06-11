import { Box, Button, Center, Stack, Wrap } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import "../App.css";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import { RxCross1 } from "react-icons/rx";

const LoginBox = (props) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [auth, setAuth] = useState(Cookies.get("token") == null ? false : true);
  const [error, setError] = useState("");
  const [token, setToken] = useState("");
  const [boxState, setBoxState] = useState("home");
  const [width, setWidth] = useState("8em");
  const [height, setHeight] = useState(auth == true ? "4em" : "6em");
  useEffect(() => {
    if (auth) {
      setBoxState("loggedIn");
    }
    switch (boxState) {
      case "home":
        setWidth("12em");
        setHeight("6em");
        break;
      case "login":
        setWidth("20em");
        setHeight("15em");
        break;
      case "register":
        setWidth("20em");
        setHeight("20em");
        break;
      case "loggedIn":
        setWidth("12em");
        setHeight("4em");
        break;
    }
  }, [boxState]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        process.env.REACT_APP_BASEURL + "login.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );

      if (response.ok) {
  
        const data = await response.json();
        if (data.success == 1) {
          Cookies.set("token", data.token);
          console.log(token)
          setToken(data.token);
          setAuth(true);
          setBoxState("loggedIn");
          setError("")
          window.location.reload(false);
        } else if (data.success == 0) {
          setError(data.message);
        }
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== passwordConfirm) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await fetch(
        process.env.REACT_APP_BASEURL + "register.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        }
      );
        
      if (response.ok) {
        const data = await response.json();
        if (data.success == 1) {
          setError("Registered successfully")
          setTimeout(function(){
            setBoxState("home");
            setError("")
        }, 2000);
        } else if (data.success == 0) {
          setError(data.message);
        }
      } else {
        console.log("Error:", response.status);
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    setAuth(false);
    window.location.reload(false);
    setBoxState("home");
  };

  const renderBox = () => {
    if (boxState == "loggedIn") {
      return (
        <Stack>
          <p>{jwt_decode(Cookies.get("token")).data.username}</p>
          <button onClick={() => handleLogout()}>Logout</button>
        </Stack>
      );
    } else if (boxState == "register") {
      return (
        <>
          <Box
            w="1.5em"
            h="1.5em"
            onClick={() => setBoxState("home")}
            float={"right"}
            cursor={"pointer"}
          >
            <RxCross1 />
          </Box>
          <form onSubmit={handleRegister}>
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <label for="password">Confirm Password</label>
            <input
              type="password"
              id="passwordConfirm"
              name="passwordConfirm"
              onChange={(e) => {
                setPasswordConfirm(e.target.value);
              }}
            />
            <Box h={"3em"}>
              <p>{error}</p>
            </Box>
            <button>Login</button>
          </form>
        </>
      );
    } else if (boxState == "login") {
      return (
        <>
          <Box
            w="1.5em"
            h="1.5em"
            onClick={() => setBoxState("home")}
            float={"right"}
            cursor={"pointer"}
          >
            <RxCross1 />
          </Box>
          <form onSubmit={handleLogin}>
            <label for="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            />
            <label for="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <Box h={"3em"}>
              <p>{error}</p>
            </Box>
            <button>Login</button>
          </form>
        </>
      );
    } else if (boxState == "home") {
      return (
        <Center>
          <Stack>
            <button onClick={() => setBoxState("login")}>Login</button>
            <button onClick={() => setBoxState("register")}>Register</button>
          </Stack>
        </Center>
      );
    }
  };

  return (
    <Box
      className="container"
      w={width}
      h={height}
    >
      {renderBox()}
    </Box>
  );
};

export default LoginBox;
