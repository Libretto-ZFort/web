import {useState} from "react";
import {
    Input,
    Stack,
    IconButton,
    useToast,
    Box,
    Container,
} from "@chakra-ui/react";
import {BiSend} from "react-icons/bi";
import {useAppContext} from "../../../context/AppContext";
import supabase from "../../../services/supabase/supabase-client";

export default function MessageForm() {
    const {username, country, session, updateMessages} = useAppContext();
    const [message, setMessage] = useState("");
    const toast = useToast();
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSending(true);
        if (!message) return;

        setMessage("");

        try {
            const {error, data} = await supabase.from("messages").insert([
                {
                    text: message,
                    username,
                    country,
                    is_authenticated: !!session,
                },
            ]);

            if (error) {
                console.error(error.message);
                toast({
                    title: "Error sending",
                    description: error.message,
                    status: "error",
                    duration: 9000,
                    isClosable: true,
                });
                return;
            }

            setTimeout(() => {
                updateMessages();
                console.log("Successfully sent!");
            }, 1000);
        } catch (error) {
            console.log("error sending message:", error);
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Box py="0" pt="0" pb="20px">
            <Container maxW="600px">
                <form onSubmit={handleSubmit} autoComplete="off">
                    <Stack direction="row">
                        <Input
                            name="message"
                            placeholder="Enter a message"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            bg="white"
                            border="none"
                            autoFocus
                            maxLength="500"
                        />
                        <IconButton
                            colorScheme="green"
                            aria-label="Send"
                            fontSize="20px"
                            icon={<BiSend/>}
                            type="submit"
                            disabled={!message}
                            isLoading={isSending}
                        />
                    </Stack>
                </form>
                <Box fontSize="10px" mt="1">
                    Important: do not send personal data
                </Box>
            </Container>
        </Box>
    );
}
