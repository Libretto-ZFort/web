import { Button, Grid, GridItem, ButtonGroup } from "@chakra-ui/react";
import { FaMusic } from "react-icons/fa";
import supabase from "../../services/supabase/supabase-client";
import { useAppContext } from "../../context/AppContext";
import NameForm from "./NameForm";
import { Link, useNavigate } from 'react-router-dom';
import routes from "../../navigation/routes";

export default function Header() {
  const { username, setUsername, randomUsername, session } = useAppContext();
  const navigate = useNavigate();

  return (
    <Grid
      templateColumns="max-content 1fr min-content"
      justifyItems="center"
      alignItems="center"
      bg="#343a40"
      position="sticky"
      top="0"
      zIndex="10"
      borderBottom="20px solid #edf2f7"
      color="#fff"
      padding="10px 30px"
    >
        <Link to={routes.HOME}>
          <GridItem display="flex">
          <FaMusic /> &nbsp; &nbsp; Libretto
          </GridItem>
        </Link>
      {session ? (
        <>
          <GridItem justifySelf="end" alignSelf="center" mr="4">
            Welcome <strong>{username}</strong>
          </GridItem>
          <Button
            marginRight="4"
            size="sm"
            variant="link"
            onClick={() => {
              const { error } = supabase.auth.signOut();
              if (error) return console.error("error signOut", error);
              const username = randomUsername();
              setUsername(username);
              localStorage.setItem("username", username);
            }}
          >
            Log out
          </Button>
        </>
      ) : (
        <>
          <GridItem justifySelf="end" alignSelf="end">
            <NameForm username={username} setUsername={setUsername} />
          </GridItem>
        </>
      )}
        <ButtonGroup gap='4'>
            <Button colorScheme='green' onClick={() => navigate(routes.HOME)}>Conversation</Button>
            <Button colorScheme='green' onClick={() => navigate(routes.CHAT)}>Chat GPT</Button>
        </ButtonGroup>
    </Grid>
  );
}
