import { Badge, Box, Container } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useAppContext } from "../../../context/AppContext.tsx";
import Messages from "./Messages.jsx";
import { BsChevronDoubleDown } from "react-icons/bs";
import MessageForm from "./MessageForm.tsx";

export default function Chat() {
  return (
    <Container maxW="600px" pb="20px">
      CHAT HERE
    </Container>
  );
}
