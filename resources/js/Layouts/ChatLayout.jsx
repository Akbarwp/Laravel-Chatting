import ConversationItem from "@/Components/App/ConversationItem";
import TextInput from "@/Components/TextInput";
import { usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";

export default function ChatLayout({ children }) {
    const page = usePage();
    const conversations = page.props.conversations;
    const selectedConversation = page.props.selectedConversation;

    const [onlineUsers, setOnlineUsers] = useState({});
    const [localConversations, setLocalConversations] = useState([]);
    const [sortedConversations, setSortedConversations] = useState([]);

    const isUserOnline = (userId) => onlineUsers[userId];

    useEffect(() => {
        setSortedConversations(
            localConversations.sort((a, b) => {
                if (a.blocked_at && b.blocked_at) {
                    return a.blocked_at > b.blocked_at ? 1 : -1;
                } else if (a.blocked_at) {
                    return 1;
                } else if (b.blocked_at) {
                    return -1;
                }

                if (a.last_message_date && b.last_message_date) {
                    return b.last_message_date.localeCompare(
                        a.last_message_date,
                    );
                } else if (a.last_message) {
                    return -1;
                } else if (b.last_message) {
                    return 1;
                } else {
                    return 0;
                }
            }),
        );
    }, [localConversations]);

    useEffect(() => {
        setLocalConversations(conversations);
    }, [conversations]);

    useEffect(() => {
        Echo.join("online")
            .here((users) => {
                const onlineUsersObj = Object.fromEntries(
                    users.map((user) => [user.id, user]),
                );
                setOnlineUsers((prevOnlineUsers) => {
                    return { ...prevOnlineUsers, ...onlineUsersObj };
                });
            })
            .joining((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    updatedUsers[user.id] = user;
                    return updatedUsers;
                });
            })
            .leaving((user) => {
                setOnlineUsers((prevOnlineUsers) => {
                    const updatedUsers = { ...prevOnlineUsers };
                    delete updatedUsers[user.id];
                    return updatedUsers;
                });
            })
            .error((error) => {
                console.log("error", error);
            });
        return () => {
            Echo.leave("online");
        };
    }, []);

    const onSearch = (e) => {
        const search = e.target.value.toLowerCase();
        setLocalConversations(
            conversations.filter((conversation) => {
                return conversation.name.toLowerCase().includes(search);
            }),
        );
    };

    return (
        <>
            <div className="flex w-full flex-1 overflow-hidden">
                <div
                    className={`flex w-full flex-col overflow-hidden transition-all sm:w-[220px] md:w-[300px] ${selectedConversation ? "-ml[-100%] sm:ml-0" : ""}`}
                >
                    <div className="flex items-center justify-between px-3 py-2 text-xl font-medium">
                        <span className="dark:text-white">My Conversation</span>
                        <div
                            className="tooltip tooltip-left"
                            data-tip="Create new group"
                        >
                            <button className="btn btn-ghost btn-sm">
                                <i className="ri-user-add-line text-lg text-gray-800 dark:text-gray-200"></i>
                            </button>
                        </div>
                    </div>
                    <div className="p-3">
                        <TextInput
                            onKeyUp={onSearch}
                            placeholder="Filter users and groups"
                            className="w-full"
                        />
                    </div>
                    <div className="flex-1 overflow-auto">
                        {sortedConversations &&
                            sortedConversations.map((conversation) => (
                                <ConversationItem
                                    key={`${conversation.is_group ? "group_" : "user_"}${conversation.id}`}
                                    conversation={conversation}
                                    online={!isUserOnline(conversation.id)}
                                    selectedConversation={selectedConversation}
                                />
                            ))}
                    </div>
                </div>

                <div className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </div>
            </div>
        </>
    );
}
