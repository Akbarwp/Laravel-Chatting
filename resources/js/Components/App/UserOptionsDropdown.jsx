import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import axios from "axios";

export default function UserOptionsDropdown({ conversation }) {
    const onBlockUser = () => {
        if (!conversation.is_user) {
            return;
        }

        axios
            .post(route("user.blockUnblock", conversation.id))
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const changeUserRole = () => {
        if (!conversation.is_user) {
            return;
        }

        axios
            .post(route("user.changeRole", conversation.id))
            .then((res) => {
                console.log(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        <>
            <Menu as="div" className="relative inline-block text-left">
                <MenuButton className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-gray-800/30">
                    <i className="ri-more-2-fill text-xl dark:text-gray-200"></i>
                </MenuButton>
                <MenuItems
                    anchor="bottom"
                    transition
                    className="absolute right-0 z-50 mt-2 w-48 origin-top rounded-md bg-gray-800 shadow-lg transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0 dark:bg-gray-600"
                >
                    <MenuItem>
                        {(active) => (
                            <button
                                onClick={onBlockUser}
                                className={`${active ? "bg-gray-800 dark:bg-gray-600" : ""} group flex w-full items-center p-2 text-sm text-gray-100 transition hover:bg-gray-600 dark:hover:bg-gray-500`}
                            >
                                {conversation.blocked_at && (
                                    <div>
                                        <i className="ri-lock-unlock-line mr-2 text-lg"></i>
                                        Unblock User
                                    </div>
                                )}
                                {!conversation.blocked_at && (
                                    <div>
                                        <i className="ri-lock-2-line mr-2 text-lg"></i>
                                        Block User
                                    </div>
                                )}
                            </button>
                        )}
                    </MenuItem>
                    <MenuItem>
                        {(active) => (
                            <button
                                onClick={changeUserRole}
                                className={`${active ? "bg-gray-800 dark:bg-gray-600" : ""} group flex w-full items-center p-2 text-sm text-gray-100 transition hover:bg-gray-600 dark:hover:bg-gray-500`}
                            >
                                {conversation.is_admin && (
                                    <div>
                                        <i className="ri-user-5-line mr-2 text-lg"></i>
                                        Make Regular User
                                    </div>
                                )}
                                {!conversation.is_admin && (
                                    <div>
                                        <i className="ri-user-star-line mr-2 text-lg"></i>
                                        Make Admin
                                    </div>
                                )}
                            </button>
                        )}
                    </MenuItem>
                </MenuItems>
            </Menu>
        </>
    );
}
