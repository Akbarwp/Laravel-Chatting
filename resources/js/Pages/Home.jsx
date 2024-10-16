import ConversationHeader from "@/Components/App/ConversationHeader";
import MessageInput from "@/Components/App/MessageInput";
import MessageItem from "@/Components/App/MessageItem";
import { Boxes } from "@/Components/ui/background-boxes";
import { cn } from "@/Libs";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import { Head } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";

function Home({ messages = null, selectedConversation = null }) {
    const [localMessages, setLocalMessages] = useState([]);
    const messageCtrRef = useRef(null);

    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : []);
    }, [messages]);

    useEffect(() => {
        setTimeout(() => {
            messageCtrRef.current.scrollTop =
                messageCtrRef.current.scrollHeight;
        }, 10);
    }, [selectedConversation]);

    return (
        <>
            {!messages && (
                <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden dark:bg-gray-900">
                    <div className="pointer-events-none absolute inset-0 z-20 h-full w-full bg-gray-100 [mask-image:radial-gradient(transparent,white)] dark:bg-gray-900" />
                    <div className="hidden md:block">
                        <Boxes />
                    </div>
                    <h1
                        className={cn(
                            "relative z-20 flex flex-col items-center text-xl text-gray-800 dark:text-gray-200 md:text-4xl",
                        )}
                    >
                        <i className="ri-question-answer-fill text-9xl text-gray-800 dark:text-gray-200"></i>
                        <span className="text-center">
                            Tap a conversation to keep the flow going!
                        </span>
                    </h1>
                    <p className="relative z-20 mt-2 text-center font-semibold text-gray-600 dark:text-gray-400">
                        Connecting Conversations, Inspiring Connections.
                    </p>
                </div>
            )}
            {messages && (
                <>
                    <ConversationHeader
                        selectedConversation={selectedConversation}
                    />
                    <div
                        className="flex-1 overflow-y-auto bg-gradient-to-tl from-gray-100 to-gray-50 p-5 dark:from-gray-900 dark:to-gray-800"
                        ref={messageCtrRef}
                    >
                        {localMessages.length === 0 && (
                            <div className="flex h-full items-center justify-center">
                                <div className="text-lg text-gray-800 dark:text-gray-200">
                                    No messages found
                                </div>
                            </div>
                        )}
                        {localMessages.length > 0 && (
                            <div className="flex flex-1 flex-col">
                                {localMessages.map((message) => (
                                    <MessageItem
                                        key={message.id}
                                        message={message}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    <MessageInput conversation={selectedConversation} />
                </>
            )}
        </>
    );
}

Home.layout = (page) => {
    return (
        <AuthenticatedLayout user={page.props.auth.user}>
            <Head title="Home" />
            <ChatLayout children={page} />
        </AuthenticatedLayout>
    );
};

export default Home;
