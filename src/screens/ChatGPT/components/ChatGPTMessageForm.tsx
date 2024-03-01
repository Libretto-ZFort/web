import React, {useState} from 'react';
import {Input, Stack, IconButton, useToast, Box, Container, Text, VStack} from '@chakra-ui/react';
import {BiSend} from 'react-icons/bi';
import {postMessage} from 'src/services/api/chat-gpt-api';

export default function ChatGPTMessageForm() {
    const [height, setHeight] = useState(window.innerHeight - 310);
    const [message, setMessage] = useState('');
    const [gptMessages, setGptMessages] = useState([]);
    const toast = useToast();
    const [isSending, setIsSending] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!message) return;

        setIsSending(true);
        const newMessage = {message};

        try {
            const response = await postMessage(message);
            setMessage('');
            setGptMessages([...gptMessages, {...newMessage, answer: response.answer ?? ''}]);
        } catch (error) {
            console.error('Error sending message:', error);
            setGptMessages([...gptMessages, {...newMessage, error: error.message}]);
            toast({
                title: 'Error sending',
                description: error.message,
                status: 'error',
                duration: 9000,
                isClosable: true,
            });
        } finally {
            setIsSending(false);
        }
    };

    return (
        <Box py="0" pt="0" pb="20px">
            <Container maxW="600px">
                <Box
                    bg="#38A169"
                    p="5"
                    overflow="auto"
                    borderRadius="10px 10px 0 0"
                    color="#fff"
                >
                    Chat GPT
                </Box>
                <Box
                    bg="white"
                    p="5"
                    overflow="auto"
                    borderRadius="0 0"
                    height={height}
                >
                    <VStack spacing={4} align="stretch">
                        {gptMessages.map((item, index) => (
                            <Box key={index} bg="gray.100" p="4" borderRadius="lg">
                                <Text fontWeight="bold">Sent: {item.message}</Text>
                                <Text color="green.500">Reply: {item.answer || item.error}</Text>
                            </Box>
                        ))}
                    </VStack>
                </Box>
                <Box
                    bg="#38A169"
                    p="0"
                    mb="20px"
                    borderRadius="0 0 10px 10px"
                >
                    &nbsp;
                </Box>
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
                            disabled={!message || isSending}
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
