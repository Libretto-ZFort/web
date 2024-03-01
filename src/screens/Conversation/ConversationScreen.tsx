import React from 'react';
import Header from "../../components/layout/Header.tsx";
import Chat from "./components/Chat.tsx";
import MessageForm from "./components/MessageForm.tsx";
import Footer from "../../components/layout/Footer.tsx";

interface Props {}

const ConversationScreen: React.FC<Props> = () => {
    return (
        <>
            <Header />
            <Chat />
            <MessageForm />
            <Footer />
        </>
    );
};

export default ConversationScreen;
