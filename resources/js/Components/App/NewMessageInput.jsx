import { useEffect, useRef } from "react";

export default function NewMessageInput({ value, onChange, onSend }) {
    const input = useRef();
    const onInputKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            onSend();
        }
    };

    const onChangeEvent = (e) => {
        setTimeout(() => {
            adjustHeight();
        }, 10);
        onChange(e);
    };

    const adjustHeight = () => {
        setTimeout(() => {
            input.current.style.height = "auto";
            input.current.style.height = input.current.scrollHeight + 1 + "px";
        }, 100);
    };

    useEffect(() => {
        adjustHeight();
    }, [value]);

    return (
        <textarea
            ref={input}
            value={value}
            rows="1"
            onChange={(e) => onChangeEvent(e)}
            onKeyDown={onInputKeyDown}
            className="focus:border-1 textarea textarea-bordered max-h-40 w-full resize-none overflow-y-auto rounded-r-none focus:outline-none dark:border-gray-500 dark:border-opacity-80 dark:bg-gray-700 dark:text-gray-200"
        ></textarea>
    );
}
