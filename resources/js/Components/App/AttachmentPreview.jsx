import { formatBytes, isPDF, isPreviewable } from "@/helper";

export default function AttachmentPreview({ file }) {
    return (
        <div className="flex w-full items-center gap-2 rounded-md bg-gray-300 dark:bg-gray-600 px-3 py-2">
            <div>
                {isPDF(file.file) && (
                    <i className="ri-file-pdf-2-fill text-[40px] text-red-600 dark:text-red-500"></i>
                )}
                {!isPreviewable(file.file) && (
                    <div className="flex justify-center items-center w-10 h-10 bg-gray-400 dark:bg-gray-500 rounded">
                        <i className="ri-attachment-2 text-2xl text-gray-800 dark:text-gray-200"></i>
                    </div>
                )}
            </div>
            <div className="flex-1 text-gray-800 dark:text-gray-200 text-nowrap text-ellipsis overflow-hidden">
                <h3>{file.file.name}</h3>
                <p className="text-xs">{formatBytes(file.file.size)}</p>
            </div>
        </div>
    );
}
