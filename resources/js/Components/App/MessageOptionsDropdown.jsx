import { useEventBus } from "@/EventBus";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import axios from "axios";
import Swal from "sweetalert2";

export default function MessageOptionsDropdown({ message }) {
    const { emit } = useEventBus();
    const onMessageDelete = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete this message!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete Message!",
            confirmButtonColor: "#7380ff",
            cancelButtonText: "Cancel",
            cancelButtonColor: "#ff5861",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(route("message.destroy", message.id))
                    .then((res) => {
                        emit("message.deleted", {
                            message,
                            prevMessage: res.data.message,
                        });
                        // Swal.fire({
                        //     title: "Deleted!",
                        //     text: "Your file has been deleted.",
                        //     icon: "success",
                        // });
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
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
                    className="absolute right-0 z-10 mt-2 w-48 origin-top rounded-md bg-gray-800 shadow-lg transition duration-200 ease-out data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    <MenuItem>
                        {(active) => (
                            <button
                                onClick={onMessageDelete}
                                className={`${active ? "bg-gray-800 dark:bg-gray-600" : ""} group flex w-full items-center p-2 text-sm text-gray-100 transition hover:bg-gray-600 dark:hover:bg-gray-500`}
                            >
                                <i className="ri-delete-bin-line mr-1"></i>
                                Delete
                            </button>
                        )}
                    </MenuItem>
                </MenuItems>
            </Menu>
        </>
    );
}
