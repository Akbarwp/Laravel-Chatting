import { useEventBus } from "@/EventBus";
import { useEffect, useState } from "react";
import { HoverBorderGradient } from "@/Components/ui/hover-border-gradient";
import { v4 as uuidv4 } from "uuid";
import UserAvatar from "@/Components/App/UserAvatar";
import { Link } from "@inertiajs/react";

export default function NewMessageNotification({}) {
    const { on } = useEventBus();
    const [toasts, setToasts] = useState([]);

    useEffect(() => {
        on("newMessageNotification", ({ message, user, group_id }) => {
            const uuid = uuidv4();
            setToasts((oldToasts) => [
                ...oldToasts,
                { uuid, message, user, group_id },
            ]);
            setTimeout(() => {
                setToasts((oldToasts) =>
                    oldToasts.filter((toast) => toast.uuid !== uuid),
                );
            }, 5000);
        });
    }, [on]);

    return (
        <div>
            <div className="fixed left-1/2 top-0 z-50 flex min-w-[280px] -translate-x-1/2 transform flex-col gap-2 whitespace-nowrap p-4">
                {toasts.map((toast, index) => (
                    <Link
                        key={toast.uuid}
                        href={
                            toast.group_id
                                ? route("chat.group", toast.group_id)
                                : route("chat.user", toast.user.id)
                        }
                        className="flex items-center gap-2"
                    >
                        <HoverBorderGradient
                            key={toast.uuid}
                            containerClassName="rounded-xl bg-green-700 hover:bg-green-500 min-w-[280px]"
                            as="button"
                            colorMoving="#00cdb8"
                            className="flex min-w-[280px] items-center justify-start space-x-2 bg-gradient-to-tl from-green-600 to-green-500 py-4 font-medium text-gray-800 dark:bg-gray-800 dark:text-white"
                        >
                            <UserAvatar user={toast.user} />
                            <span>{toast.message}</span>
                        </HoverBorderGradient>
                    </Link>
                ))}
            </div>
        </div>
    );
}
