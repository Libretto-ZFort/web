import React from 'react';
import Header from "../../components/layout/Header.tsx";
import Footer from "../../components/layout/Footer.tsx";
import Chat from "./components/Chat.tsx";

interface Props {}

const ChatGPTScreen: React.FC<Props> = () => {
    return (
        <>
            <Header />
            <Chat />
            <Footer />
        </>
    );
};

export default ChatGPTScreen;
