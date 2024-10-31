import { Link, usePage } from "@inertiajs/react";
import UserAvatar from "@/Components/App/UserAvatar";
import GroupAvatar from "@/Components/App/GroupAvatar";
import GroupDescriptionPopover from "@/Components/App/GroupDescriptionPopover";
import GroupUserPopover from "@/Components/App/GroupUserPopover";
import Swal from "sweetalert2";
import { useEventBus } from "@/EventBus";

export default function ConversationHeader({ selectedConversation }) {
    const user = usePage().props.auth.user;
    const { emit } = useEventBus();

    const onDeleteGroup = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Delete this group!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Delete Group!",
            confirmButtonColor: "#7380ff",
            cancelButtonText: "Cancel",
            cancelButtonColor: "#ff5861",
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .delete(route("group.destroy", selectedConversation.id))
                    .then((res) => {
                        emit("toast.show", res.data.message);
                    })
                    .catch((err) => {
                        console.error(err);
                    });
            }
        });
    };

    return (
        <>
            {selectedConversation && (
                <div className="flex items-center justify-between rounded-l-md bg-[#075e54] p-3 dark:bg-gray-700">
                    <div className="flex items-center gap-3">
                        <Link
                            href={route("home")}
                            className="inline-block sm:hidden"
                        >
                            <i className="ri-arrow-left-line text-xl text-white"></i>
                        </Link>
                        {selectedConversation.is_user && (
                            <UserAvatar user={selectedConversation} />
                        )}
                        {selectedConversation.is_group && <GroupAvatar />}
                        <div>
                            <h3 className="font-semibold text-white">
                                {selectedConversation.name}
                            </h3>
                            {selectedConversation.is_group && (
                                <p className="text-xs text-gray-200 dark:text-gray-400">
                                    {selectedConversation.users.length} members
                                </p>
                            )}
                        </div>
                    </div>
                    {selectedConversation.is_group && (
                        <div className="flex gap-3">
                            <GroupDescriptionPopover
                                description={selectedConversation.description}
                            />
                            <GroupUserPopover
                                users={selectedConversation.users}
                            />
                            {selectedConversation.owner_id == user.id && (
                                <>
                                    <div
                                        className="tooltip tooltip-left"
                                        data-tip="Edit Group"
                                    >
                                        <button
                                            onClick={(e) => {
                                                emit(
                                                    "GroupModal.show",
                                                    selectedConversation,
                                                );
                                            }}
                                        >
                                            <i className="ri-pencil-fill text-base text-white hover:text-gray-300 transition"></i>
                                        </button>
                                    </div>
                                    <div
                                        className="tooltip tooltip-left"
                                        data-tip="Delete Group"
                                    >
                                        <button
                                            onClick={onDeleteGroup}
                                        >
                                            <i className="ri-delete-bin-line text-base text-white hover:text-gray-300 transition"></i>
                                        </button>
                                    </div>
                                </>
                            )}
                        </div>
                    )}
                </div>
            )}
        </>
    );
}
