import ConversationHeader from "@/Components/App/ConversationHeader";
import MessageInput from "@/Components/App/MessageInput";
import MessageItem from "@/Components/App/MessageItem";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import ChatLayout from "@/Layouts/ChatLayout";
import { Head } from "@inertiajs/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEventBus } from "@/EventBus";
import { HeroHighlight, Highlight } from "@/Components/ui/hero-highlight";
import { motion } from "framer-motion";

function Home({ messages = null, selectedConversation = null }) {
    const [localMessages, setLocalMessages] = useState([]);
    const messageCtrRef = useRef(null);
    const { on } = useEventBus();
    const loadMoreIntersect = useRef(null);
    const [noMoreMessages, setNoMoreMessages] = useState(false);
    const [scrollFromBottom, setScrollFromBottom] = useState(0);

    const messageCreated = (message) => {
        if (
            selectedConversation &&
            selectedConversation.is_group &&
            selectedConversation.id == message.group_id
        ) {
            setLocalMessages((prevMessage) => [...prevMessage, message]);
        }

        if (
            selectedConversation &&
            selectedConversation.is_user &&
            (selectedConversation.id == message.sender_id ||
                selectedConversation.id == message.receiver_id)
        ) {
            setLocalMessages((prevMessage) => [...prevMessage, message]);
        }
    };

    const loadMoreMessages = useCallback(() => {
        if (noMoreMessages) {
            return;
        }

        const firstMessage = localMessages[0];
        axios
            .get(route("message.loadOlder", firstMessage.id))
            .then(({ data }) => {
                if (data.data.lenght === 0) {
                    setNoMoreMessages(true);
                    return;
                }

                const scrollHeight = messageCtrRef.current.scrollHeight;
                const scrollTop = messageCtrRef.current.scrollTop;
                const clientHeight = messageCtrRef.current.clientHeight;
                const tmpScrollBottom = scrollHeight - scrollTop - clientHeight;
                setScrollFromBottom(tmpScrollBottom);

                setLocalMessages((prevMessages) => {
                    return [...data.data.reverse(), ...prevMessages];
                });
            });
    }, [localMessages, noMoreMessages]);

    useEffect(() => {
        setLocalMessages(messages ? messages.data.reverse() : []);
    }, [messages]);

    useEffect(() => {
        setTimeout(() => {
            if (messageCtrRef.current) {
                messageCtrRef.current.scrollTop =
                    messageCtrRef.current.scrollHeight;
            }
        }, 10);

        const offCreated = on("message.created", messageCreated);
        setScrollFromBottom(0);

        return () => {
            offCreated();
        };
    }, [selectedConversation]);

    useEffect(() => {
        if (messageCtrRef.current && scrollFromBottom !== null) {
            messageCtrRef.current.scrollTop =
                messageCtrRef.current.scrollHeight -
                messageCtrRef.current.offsetHeight -
                scrollFromBottom;
        }

        if (noMoreMessages) {
            return;
        }

        const observer = new IntersectionObserver(
            (entries) =>
                entries.forEach(
                    (entry) => entry.isIntersecting && loadMoreMessages(),
                ),
            {
                rootMargin: "0px 0px 250px 0px",
            },
        );

        if (loadMoreIntersect.current) {
            setTimeout(() => {
                observer.observe(loadMoreIntersect.current);
            }, 100);
        }

        return () => {
            observer.disconnect();
        };
    }, [localMessages]);

    return (
        <>
            {!messages && (
                <div className="relative flex flex-col items-center justify-center overflow-hidden dark:bg-gray-900">
                    <HeroHighlight />
                    <HeroHighlight>
                        <motion.h1
                            initial={{
                                opacity: 0,
                                y: 20,
                            }}
                            animate={{
                                opacity: 1,
                                y: [20, -5, 0],
                            }}
                            transition={{
                                duration: 0.5,
                                ease: [0.4, 0.0, 0.2, 1],
                            }}
                            className="mx-aut max-w-4xl px-4 text-center text-2xl font-bold leading-relaxed text-gray-800 dark:text-gray-200 md:text-4xl lg:text-5xl lg:leading-snug"
                        >
                            <div className="flex flex-col">
                                <i className="ri-question-answer-fill text-9xl text-gray-800 dark:text-gray-200"></i>
                                <span>
                                    Tap a conversation to keep the flow going!
                                </span>
                                <Highlight className="white mt-3 text-xl text-black dark:text-white md:text-2xl lg:text-3xl">
                                    Connecting Conversations, Inspiring
                                    Connections.
                                </Highlight>
                            </div>
                        </motion.h1>
                    </HeroHighlight>
                    <HeroHighlight />
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
                                <div ref={loadMoreIntersect}></div>
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
