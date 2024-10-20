import NewMessageInput from "@/Components/App/NewMessageInput";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";

export default function MessageInput({ conversation = null }) {
    const [NewMessage, setNewMessage] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [messageSending, setMessageSending] = useState(false);

    const onSendClick = () => {
        if (messageSending) {
            return;
        }

        if (NewMessage.trim() == "") {
            setInputErrorMessage("Please enter a message");
            setTimeout(() => {
                setInputErrorMessage("");
            }, 3000);
            return;
        }

        const formData = new FormData();
        formData.append("message", NewMessage);
        if (conversation.is_user) {
            formData.append("receiver_id", conversation.id);
        } else if (conversation.is_group) {
            formData.append("group_id", conversation.id);
        }
        setMessageSending(true);

        axios
            .post(route("message.store"), formData, {
                onUploudProgress: (progressEvent) => {
                    const progress = Math.round(
                        (progressEvent.loaded / progressEvent.total) * 100,
                    );
                    // console.log(progress);
                },
            })
            .then((res) => {
                setNewMessage("");
                setMessageSending(false);
            })
            .catch((error) => {
                setMessageSending(false);
            });
    };

    const onLikeClick = () => {
        if (messageSending) {
            return;
        }

        const data = {
            message: "👍",
        };

        if (conversation.is_user) {
            data["receiver_id"] = conversation.id;
        } else if (conversation.is_group) {
            data["group_id"] = conversation.id;
        }

        axios.post(route("message.store"), data);
    };

    return (
        <div className="flex flex-wrap items-start border-t border-gray-700 bg-gradient-to-tl from-gray-100 to-gray-50 py-3 dark:from-gray-900 dark:to-gray-800">
            <div className="order-2 flex-1 p-2 sm:order-1 sm:flex-none">
                <button className="relative p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <i className="ri-attachment-2 text-2xl"></i>
                    <input
                        type="file"
                        name=""
                        className="absolute bottom-0 left-0 right-0 top-0 z-20 cursor-pointer opacity-0"
                        multiple
                    />
                </button>
                <button className="relative p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <i className="ri-image-add-fill text-2xl"></i>
                    <input
                        type="file"
                        name=""
                        className="absolute bottom-0 left-0 right-0 top-0 z-20 cursor-pointer opacity-0"
                        multiple
                        accept="image/*"
                    />
                </button>
            </div>
            <div className="relative order-1 min-w-[220px] flex-1 basis-full px-3 sm:order-2 sm:basis-0 sm:p-0">
                <div className="flex">
                    <NewMessageInput
                        value={NewMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onSend={onSendClick}
                    />
                    <button
                        className="btn btn-success rounded-l-none"
                        onClick={onSendClick}
                        disabled={messageSending}
                    >
                        {messageSending && (
                            <span className="loading loading-spinner loading-xs"></span>
                        )}
                        <i className="ri-send-plane-fill text-2xl text-white dark:text-gray-900"></i>
                        <span className="hidden text-white dark:text-gray-900 sm:inline">
                            Send
                        </span>
                    </button>
                </div>
                {inputErrorMessage && (
                    <p className="text-xs text-error">{inputErrorMessage}</p>
                )}
            </div>
            <div className="order-3 flex p-2 sm:order-3">
                <Popover className="relative">
                    <PopoverButton className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                        <i className="ri-emotion-fill text-2xl"></i>
                    </PopoverButton>
                    {/* <PopoverPanel className="absolute z-10 right-0 bottom-full"> */}
                    <PopoverPanel
                        anchor="bottom start"
                        transition
                        className="flex origin-top flex-col transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                    >
                        <EmojiPicker
                            onEmojiClick={(e) =>
                                setNewMessage(NewMessage + e.emoji)
                            }
                        />
                    </PopoverPanel>
                </Popover>
                <button
                    className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    onClick={onLikeClick}
                >
                    <i className="ri-thumb-up-fill text-2xl"></i>
                </button>
            </div>
        </div>
    );
}
