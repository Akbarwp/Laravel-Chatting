export default function GroupAvatar() {
    return (
        <>
            <div className={`avatar placeholder`}>
                <div
                    className={`w-8 rounded-full bg-neutral text-neutral-content dark:bg-slate-500 dark:text-slate-100`}
                >
                    <span className="text-xl">
                        <i className="ri-group-line text-lg"></i>
                    </span>
                </div>
            </div>
        </>
    );
}
