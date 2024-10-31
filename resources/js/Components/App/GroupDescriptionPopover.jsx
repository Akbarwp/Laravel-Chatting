import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

export default function GroupDescriptionPopover({ description }) {
    return (
        <Popover className="relative">
            <PopoverButton
                className={
                    "block text-sm/6 font-semibold text-white transition focus:outline-none data-[active]:text-gray-300 data-[hover]:text-gray-300 data-[focus]:outline-1 data-[focus]:outline-gray-300"
                }
            >
                <i className="ri-information-line text-base"></i>
            </PopoverButton>
            <PopoverPanel
                anchor="bottom end"
                transition
                className="divide-y divide-white/5 rounded-xl bg-gray-800 text-sm/6 text-gray-100 transition duration-200 ease-in-out [--anchor-gap:var(--spacing-5)] data-[closed]:-translate-y-1 data-[closed]:opacity-0 dark:bg-gray-600"
            >
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black/5">
                    <div className="p-4">
                        <h2 className="mb-3 text-lg">Description</h2>
                        {description && (
                            <div className="text-xs">{description}</div>
                        )}
                        {!description && (
                            <div className="py-4 text-center text-xs text-gray-300 dark:text-gray-200 max-w-lg">
                                Description not found
                            </div>
                        )}
                    </div>
                </div>
            </PopoverPanel>
        </Popover>
    );
}
