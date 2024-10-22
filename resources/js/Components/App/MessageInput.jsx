import NewMessageInput from "@/Components/App/NewMessageInput";
import { isAudio, isImage } from "@/helper";
import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import CustomAudioPlayer from "@/Components/App/CustomAudioPlayer";
import AttachmentPreview from "@/Components/App/AttachmentPreview";
import AudioRecorder from "@/Components/App/AudioRecorder";

export default function MessageInput({ conversation = null }) {
    const [NewMessage, setNewMessage] = useState("");
    const [inputErrorMessage, setInputErrorMessage] = useState("");
    const [messageSending, setMessageSending] = useState(false);
    const [chosenFiles, setChosenFiles] = useState([]);
    const [uploudProgress, setUploudProgress] = useState(0);

    const onSendClick = () => {
        if (messageSending) {
            return;
        }

        if (NewMessage.trim() === "" && chosenFiles.length === 0) {
            setInputErrorMessage("Please enter a message or attach a file");
            setTimeout(() => {
                setInputErrorMessage("");
            }, 3000);
            return;
        }

        const formData = new FormData();
        chosenFiles.forEach((file) => {
            formData.append("attachments[]", file.file);
        });
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
                    setUploudProgress(progress);
                },
            })
            .then((res) => {
                setNewMessage("");
                setMessageSending(false);
                setUploudProgress(0);
                setChosenFiles([]);
            })
            .catch((error) => {
                setMessageSending(false);
                setChosenFiles([]);
                const message = error?.response?.data?.message;
                setInputErrorMessage(message || "An error occurred");
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

    const onFileChange = (e) => {
        const files = e.target.files;
        const updatedFiles = [...files].map((file) => {
            return {
                file: file,
                url: URL.createObjectURL(file),
            };
        });

        e.target.files = null;

        setChosenFiles((prevFiles) => {
            return [...prevFiles, ...updatedFiles];
        });
    };

    const recordedAudioReady = (file, url) => {
        setChosenFiles((prevFiles) => [...prevFiles, { file, url }]);
    };

    return (
        <div className="flex flex-wrap items-start border-t border-gray-700 bg-gradient-to-tl from-gray-100 to-gray-50 py-3 dark:from-gray-900 dark:to-gray-800">
            <div className="order-2 flex-1 p-2 sm:order-1 sm:flex-none">
                <button className="relative p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <i className="ri-attachment-2 text-2xl"></i>
                    <input
                        type="file"
                        className="absolute bottom-0 left-0 right-0 top-0 z-20 cursor-pointer opacity-0"
                        multiple
                        onChange={onFileChange}
                    />
                </button>
                <button className="relative p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                    <i className="ri-image-add-fill text-2xl"></i>
                    <input
                        type="file"
                        className="absolute bottom-0 left-0 right-0 top-0 z-20 cursor-pointer opacity-0"
                        multiple
                        accept="image/*"
                        onChange={onFileChange}
                    />
                </button>
                <AudioRecorder fileReady={recordedAudioReady} />
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
                {!!uploudProgress && (
                    <progress
                        className="progress progress-info w-full"
                        value={uploudProgress}
                        max={100}
                    ></progress>
                )}
                {inputErrorMessage && (
                    <p className="text-xs text-error">{inputErrorMessage}</p>
                )}
                <div className="mt-2 flex flex-wrap gap-1">
                    {chosenFiles.map((file) => (
                        <div
                            key={file.file.name}
                            className={
                                `relative flex cursor-pointer justify-between ` +
                                (!isImage(file.file) ? "w-[240px]" : "")
                            }
                        >
                            {isImage(file.file) && (
                                <img
                                    src={file.url}
                                    alt={file.file.name}
                                    className="h-16 w-16 object-cover"
                                />
                            )}
                            {isAudio(file.file) && (
                                <CustomAudioPlayer
                                    file={file}
                                    showVolume={false}
                                />
                            )}
                            {!isAudio(file.file) && !isImage(file.file) && (
                                <AttachmentPreview file={file} />
                            )}
                            <button
                                onClick={(e) =>
                                    setChosenFiles(
                                        chosenFiles.filter(
                                            (f) =>
                                                f.file.name !== file.file.name,
                                        ),
                                    )
                                }
                                className="absolute -right-2 -top-2 z-10 h-6 w-6 rounded-full bg-gray-100 dark:bg-gray-800"
                            >
                                <i className="ri-close-fill rounded-full bg-gray-800 p-[1px] text-gray-100 transition hover:bg-gray-600 dark:bg-gray-300 dark:font-extrabold dark:text-gray-800 dark:hover:bg-gray-400"></i>
                            </button>
                        </div>
                    ))}
                </div>
            </div>
            <div className="order-3 flex p-2 sm:order-3">
                <Popover className="relative">
                    <PopoverButton className="p-1 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300">
                        <i className="ri-emotion-fill text-2xl"></i>
                    </PopoverButton>
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
