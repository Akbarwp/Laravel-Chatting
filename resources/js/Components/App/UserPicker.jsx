import {
    Combobox,
    ComboboxButton,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import { useState } from "react";

export default function UserPicker({ value, options, onSelect }) {
    const [selected, setSelected] = useState(value);
    const [query, setQuery] = useState("");

    const filteredPeople =
        query === ""
            ? options
            : options.filter((user) => {
                  return user.name
                      .toLowerCase()
                      .replace(/\s+/g, "")
                      .includes(query.toLowerCase().replace(/\s+/g, ""));
              });

    const onSelected = (users) => {
        setSelected(users);
        onSelect(users);
    };

    return (
        <>
            <Combobox value={selected} onChange={onSelected} multiple>
                <div className="flex gap-x-1">
                    <ComboboxInput
                        displayValue={(users) =>
                            users.length ? `${users.length} users selected` : ""
                        }
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Please select users!"
                        className="input input-bordered w-full"
                    />
                    <ComboboxButton>
                        <i
                            className="ri-arrow-up-line text-xl text-gray-800 transition hover:text-gray-600 dark:text-gray-200"
                            aria-label="true"
                        ></i>
                    </ComboboxButton>
                </div>
                <ComboboxOptions
                    anchor="bottom"
                    transition
                    className="origin-top border transition duration-200 ease-out empty:invisible data-[closed]:scale-95 data-[closed]:opacity-0"
                >
                    {filteredPeople.length === 0 && query !== "" ? (
                        <div className="relative cursor-default select-none px-4 py-2 text-gray-800 dark:text-gray-200">
                            Not Found.
                        </div>
                    ) : (
                        filteredPeople.map((user) => (
                            <ComboboxOption
                                key={user.id}
                                value={user}
                                className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 data-[focus]:bg-green-600 ${active ? "bg-teal-600 text-white" : "bg-gray-800 text-gray-100 dark:bg-gray-600"}`
                                }
                            >
                                {({ selected, active }) => (
                                    <>
                                        <span
                                            className={`block truncate ${selected ? "font-medium" : "font-normal"}`}
                                        >
                                            {user.name}
                                        </span>
                                        {selected ? (
                                            <span
                                                className={`absolute inset-y-0 left-0 flex items-center pl-3 text-white`}
                                            >
                                                <i
                                                    className="ri-check-line h5 w-5"
                                                    aria-hidden="true"
                                                ></i>
                                            </span>
                                        ) : null}
                                    </>
                                )}
                            </ComboboxOption>
                        ))
                    )}
                </ComboboxOptions>
            </Combobox>
            {selected && (
                <div className="mt-3 flex flex-wrap gap-2">
                    {selected.map((user) => (
                        <div
                            key={user.id}
                            className="badge badge-success gap-2"
                        >
                            {user.name}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
