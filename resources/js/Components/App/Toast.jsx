import { useEventBus } from "@/EventBus";
import { useEffect, useState } from "react";
import { HoverBorderGradient } from "@/Components/ui/hover-border-gradient";
import { v4 as uuidv4 } from "uuid";

export default function Toast({ message }) {
    const { on } = useEventBus();
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        on("toast.show", (message) => {
            const uuid = uuidv4();
            setToasts((oldToasts) => [...oldToasts, { uuid, message }]);
            setTimeout(() => {
                setToasts((oldToasts) =>
                    oldToasts.filter((toast) => toast.uuid !== uuid),
                );
            }, 5000);
        });
    }, [on]);

    return (
        <div>
            <div className="fixed bottom-0 right-0 top-auto flex min-w-[280px] flex-col gap-2 whitespace-nowrap p-4">
                {toasts.map((toast, index) => (
                    <HoverBorderGradient
                        key={toast.uuid}
                        containerClassName="rounded-xl bg-green-700 hover:bg-green-500 min-w-[280px]"
                        as="button"
                        colorMoving="#00cdb8"
                        className="flex min-w-[280px] items-center justify-start space-x-2 bg-gradient-to-tl from-green-600 to-green-500 py-4 font-medium text-gray-800 dark:bg-gray-800 dark:text-white"
                    >
                        <span>{toast.message}</span>
                    </HoverBorderGradient>
                ))}
            </div>
        </div>
    );
}
