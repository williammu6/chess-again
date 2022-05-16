import { ChakraProvider, Flex } from "@chakra-ui/react";
import { useState } from "react";
import Matchmaking from "../components/Matchmaking";

export default function Home() {
  const [matchmaking, setMatchmaking] = useState<boolean>(false);
  const [username, setUsername] = useState("");

  const handlePlay = () => {
    if (username == "") return;
    setMatchmaking(true);
  }

  if (true) {
    return <Matchmaking username={username}/>
  }

  return (
    <ChakraProvider>
      <Flex>
        <input type="type" onChange={e => setUsername(e.target.value)} value={username} />
        <button onClick={() => handlePlay()} >play</button>
      </Flex>
    </ChakraProvider>
  )
}
