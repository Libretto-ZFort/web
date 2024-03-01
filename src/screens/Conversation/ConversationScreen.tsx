import React from 'react';
import Header from "../../components/layout/Header";
import Chat from "./components/Chat";
import MessageForm from "./components/MessageForm";
import Footer from "../../components/layout/Footer";

interface Props {
}

const ConversationScreen: React.FC<Props> = () => {
    return (
        <>
            <Header/>
            <Chat/>
            <MessageForm/>
            <Footer/>
        </>
    );
};

export default ConversationScreen;
