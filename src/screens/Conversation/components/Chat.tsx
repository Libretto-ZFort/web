import { Badge, Box, Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext.tsx";
import Messages from "./Messages.jsx";
import { BsChevronDoubleDown } from "react-icons/bs";
import MessageForm from "./MessageForm.tsx";

export default function Chat() {
  const [height, setHeight] = useState(window.innerHeight - 310);
  const {
    scrollRef,
    onScroll,
    scrollToBottom,
    isOnBottom,
    unviewedMessageCount,
  } = useAppContext();
  useEffect(() => {
    window.addEventListener("resize", () => {
      setHeight(window.innerHeight - 205);
    });
  }, []);

  return (
    <Container maxW="600px" pb="20px">
      <Box
          bg="#38A169"
          p="5"
          overflow="auto"
          borderRadius="10px 10px 0 0"
          onScroll={onScroll}
          ref={scrollRef}
          color="#fff"
      >
        Conversation
      </Box>
      <Box
        bg="white"
        p="5"
        overflow="auto"
        borderRadius="0 0"
        height={height}
        onScroll={onScroll}
        ref={scrollRef}
      >
        <Messages />
        {!isOnBottom && (
          <div
            style={{
              position: "sticky",
              bottom: 8,
              float: "right",
              cursor: "pointer",
            }}
            onClick={scrollToBottom}
          >
            {unviewedMessageCount > 0 ? (
              <Badge
                ml="1"
                fontSize="0.8em"
                colorScheme="green"
                display="flex"
                borderRadius="7px"
                padding="3px 5px"
                alignItems="center"
              >
                {unviewedMessageCount}
                <BsChevronDoubleDown style={{ marginLeft: "3px" }} />
              </Badge>
            ) : (
              <BsChevronDoubleDown style={{ marginLeft: "3px" }} />
            )}
          </div>
        )}
      </Box>
      <Box
        bg="#38A169"
        p="0"
        borderRadius="0 0 10px 10px"
      >
        &nbsp;
      </Box>
    </Container>
  );
}
