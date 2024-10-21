import { dateDifferenceInDays } from "@/helper";
import { usePage } from "@inertiajs/react";
import ReactMarkdown from "react-markdown";
import UserAvatar from "@/Components/App/UserAvatar";
import MessageAttachments from "@/Components/App/MessageAttachments";

export default function MessageItem({ message, attachmentClick }) {
    const currentUser = usePage().props.auth.user;

    return (
        <>
            {message.group_id ? (
                <div
                    className={`chat ${message.sender_id === currentUser.id ? "chat-end" : "chat-start"}`}
                >
                    <div className="avatar chat-image">
                        <UserAvatar user={message.sender} />
                    </div>
                    <div className="chat-header">
                        {message.sender_id !== currentUser.id
                            ? message.sender.name
                            : ""}
                        <time className="ml-2 text-xs opacity-70 dark:text-white">
                            {dateDifferenceInDays(message.created_at)}
                        </time>
                    </div>
                    <div
                        className={`chat-bubble relative ${
                            message.sender_id === currentUser.id
                                ? "chat-bubble-success text-gray-50 dark:bg-[#075E54] dark:text-gray-200"
                                : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        }`}
                    >
                        <div className="chat-message">
                            <div className="chat-message-content">
                                <ReactMarkdown>{message.message}</ReactMarkdown>
                            </div>
                            <MessageAttachments
                                attachments={message.attachments}
                                attachmentClick={attachmentClick}
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div
                    className={`chat ${message.sender_id === currentUser.id ? "chat-end" : "chat-start"}`}
                >
                    <div className="chat-header">
                        {/* {message.sender_id !== currentUser.id
                        ? message.sender.name
                        : ""} */}
                        <time className="ml-2 text-xs opacity-70 dark:text-white">
                            {dateDifferenceInDays(message.created_at)}
                        </time>
                    </div>
                    <div
                        className={`chat-bubble relative ${
                            message.sender_id === currentUser.id
                                ? "chat-bubble-success text-gray-50 dark:bg-[#075E54] dark:text-gray-200"
                                : "bg-gray-300 text-gray-800 dark:bg-gray-700 dark:text-gray-200"
                        }`}
                    >
                        <div className="chat-message">
                            <div className="chat-message-content">
                                <ReactMarkdown>{message.message}</ReactMarkdown>
                            </div>
                            <MessageAttachments
                                attachments={message.attachments}
                                attachmentClick={attachmentClick}
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
