import React from 'react';
import Header from "../../components/layout/Header";
import Footer from "../../components/layout/Footer";
import ChatGPTMessageForm from "./components/ChatGPTMessageForm";

interface Props {
}

const ChatGPTScreen: React.FC<Props> = () => {
    return (
        <>
            <Header/>
            <ChatGPTMessageForm/>
            <Footer/>
        </>
    );
};

export default ChatGPTScreen;
