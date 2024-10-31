export default function UserAvatar({ user, online = null, profile = null, className = null }) {
    let onlineClass =
        online === true ? "offline" : online === false ? "online" : "";
    const sizeClass = profile ? "w-40" : "w-8";

    return (
        <>
            {user.avatar_url && (
                <div className={`avatar ${onlineClass}`}>
                    <div className={`${sizeClass} rounded-full`}>
                        <img src={user.avatar_url} />
                    </div>
                </div>
            )}
            {!user.avatar_url && (
                <div className={`avatar placeholder ${onlineClass}`}>
                    <div
                        className={`${sizeClass} rounded-full ${className ? className : "bg-neutral text-neutral-content dark:bg-slate-500 dark:text-slate-100"}`}
                    >
                        <span className="text-xl">
                            {user.name.substring(0, 1)}
                        </span>
                    </div>
                </div>
            )}
        </>
    );
}
