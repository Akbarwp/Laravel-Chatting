import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { Link } from "@inertiajs/react";
import UserAvatar from "@/Components/App/UserAvatar";

export default function GroupUserPopover({ users = [] }) {
    return (
        <Popover className="relative">
            <PopoverButton
                className={
                    "block text-sm/6 font-semibold text-white focus:outline-none data-[active]:text-gray-300 data-[hover]:text-gray-300 data-[focus]:outline-1 data-[focus]:outline-gray-300"
                }
            >
                <i className="ri-user-line text-base"></i>
            </PopoverButton>
            <PopoverPanel
                anchor="bottom end"
                transition
                className="divide-y divide-white/5 rounded-xl bg-gray-800 text-sm/6 text-gray-100 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:bg-gray-600"
            >
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                    <div className="py-2">
                        {users.map((user) => (
                            <Link
                                href={route("chat.user", user.id)}
                                key={user.id}
                                className="flex items-center gap-2 px-3 py-2 transition hover:bg-gray-500"
                            >
                                <UserAvatar
                                    user={user}
                                    className="bg-gray-500 text-neutral-content dark:bg-gray-800 dark:text-slate-100"
                                />
                                <div className="text-xs">{user.name}</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    );
}
