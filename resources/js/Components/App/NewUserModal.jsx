import { useEventBus } from "@/EventBus";
import { useForm } from "@inertiajs/react";
import Modal from "@/Components/Modal";

export default function NewUserModal({ show = false, onClose = () => {} }) {
    const { emit } = useEventBus();

    const { data, setData, processing, reset, post, errors } = useForm({
        name: "",
        email: "",
        is_admin: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route("user.store"), {
            onSuccess: () => {
                emit("toast.show", `User "${data.name}" was created`);
                closeModal();
            },
        });
    };

    const closeModal = () => {
        reset();
        onClose();
    };

    return (
        <Modal show={show} onClose={closeModal}>
            <form
                onSubmit={submit}
                className="overflow-y-auto p-6"
                encType="multipart/form-data"
            >
                <h2 className="text-xl font-medium text-gray-800 dark:text-gray-100">
                    Create new User
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
                <div className="">
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text text-gray-800 dark:text-gray-100">
                                Email
                            </span>
                        </div>
                        <input
                            id="email"
                            type="email"
                            className="input input-bordered w-full"
                            value={data.email}
                            onChange={(e) => setData("email", e.target.value)}
                            required
                        />
                        <div className="label">
                            <span className="label-text-alt">
                                {errors.email}
                            </span>
                        </div>
                    </label>
                </div>
                <div className="">
                    <label className="label w-fit cursor-pointer justify-start gap-x-3">
                        <span className="label-text">Admin User</span>
                        <input
                            id="is_admin"
                            name="is_admin"
                            type="checkbox"
                            className="checkbox-success checkbox"
                            checked={data.is_admin}
                            onChange={(e) =>
                                setData("is_admin", e.target.checked)
                            }
                        />
                    </label>
                    <div className="label">
                        <span className="label-text-alt">
                            {errors.is_admin}
                        </span>
                    </div>
                </div>

                <div className="mt-6 flex justify-end gap-x-1">
                    <button
                        className="btn btn-success ms-3"
                        disabled={processing}
                        type="submit"
                    >
                        Create
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
