import { useEventBus } from "@/EventBus";
import { useForm, usePage } from "@inertiajs/react";
import { useEffect, useState } from "react";
import Modal from "@/Components/Modal";
import UserPicker from "@/Components/App/UserPicker";

export default function GroupModal({ show = false, onClose = () => {} }) {
    const page = usePage();
    const conversations = page.props.conversations;
    const { on, emit } = useEventBus();
    const [group, setGroup] = useState({});

    const { data, setData, processing, reset, post, put, errors } = useForm({
        id: "",
        name: "",
        description: "",
        user_id: [],
    });

    const users = conversations.filter((c) => !c.is_group);

    const createOrUpdateGroup = (e) => {
        e.preventDefault();

        if (group.id) {
            put(route("group.update", group.id), {
                onSuccess: () => {
                    emit("toast.show", `Group "${data.name}" was updated`);
                    closeModal();
                },
            });
            return;
        }

        post(route("group.store"), {
            onSuccess: () => {
                emit("toast.show", `Group "${data.name}" was created`);
                closeModal();
            },
        });
    };

    const closeModal = () => {
        reset();
        setGroup({});
        onClose();
    };

    useEffect(() => {
        return on("GroupModal.show", (group) => {
            setData({
                name: group.name,
                description: group.description,
                user_id: group.users
                    .filter((u) => group.owner_id !== u.id)
                    .map((u) => u.id),
            });
            setGroup(group);
        });
    }, [on]);

    return (
        <Modal show={show} onClose={closeModal}>
            <form
                onSubmit={createOrUpdateGroup}
                className="overflow-y-auto p-6"
                encType="multipart/form-data"
            >
                <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                    {group.id
                        ? `Edit Group "${group.name}"`
                        : `Create new Group`}
                </h2>

                <div className="mt-8">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-gray-800 dark:text-gray-100">
                                Name
                            </span>
                        </div>
                        <input
                            id="name"
                            type="text"
                            className="input input-bordered w-full"
                            value={data.name}
                            disabled={!!group.id}
                            onChange={(e) => setData("name", e.target.value)}
                            required
                            isfocused="true"
                        />
                        <div className="label">
                            <span className="label-text-alt">
                                {errors.name}
                            </span>
                        </div>
                    </label>
                </div>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-gray-800 dark:text-gray-100">
                                Description
                            </span>
                        </div>
                        <textarea
                            id="description"
                            className="textarea textarea-bordered h-24"
                            rows="3"
                            value={data.description || ""}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                        ></textarea>
                        <div className="label">
                            <span className="label-text-alt">
                                {errors.description}
                            </span>
                        </div>
                    </label>
                </div>
                <div>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-gray-800 dark:text-gray-100">
                                Select Users
                            </span>
                        </div>
                        <UserPicker
                            value={
                                users.filter(
                                    (u) =>
                                        group.owner_id !== u.id &&
                                        data.user_id.includes(u.id),
                                ) || []
                            }
                            options={users}
                            onSelect={(users) =>
                                setData(
                                    "user_id",
                                    users.map((u) => u.id),
                                )
                            }
                        />
                        <div className="label">
                            <span className="label-text-alt">
                                {errors.user_id}
                            </span>
                        </div>
                    </label>
                </div>

                <div className="mt-6 flex justify-end gap-x-1">
                    <button
                        className={`btn ms-3 ${group.id ? "btn-warning" : "btn-success"}`}
                        disabled={processing}
                        type="submit"
                    >
                        {group.id ? "Update" : "Create"}
                    </button>
                    <button
                        className="btn btn-neutral dark:bg-gray-600 dark:transition hover:dark:bg-gray-600/50"
                        onClick={closeModal}
                        type="button"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </Modal>
    );
}
