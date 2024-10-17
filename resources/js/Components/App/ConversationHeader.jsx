import { Link } from "@inertiajs/react";
import UserAvatar from "@/Components/App/UserAvatar";
import GroupAvatar from "@/Components/App/GroupAvatar";

export default function ConversationHeader({ selectedConversation }) {
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
                </div>
            )}
        </>
    );
}
