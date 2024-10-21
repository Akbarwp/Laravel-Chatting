import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "@/helper";

export default function MessageAttachments({ attachments, attachmentClick }) {
    return (
        <>
            {attachments.length > 0 && (
                <div className="mt-2 flex flex-wrap justify-end gap-1">
                    {attachments.map((attachment, index) => (
                        <div
                            key={attachment.id}
                            onClick={(e) => attachmentClick(attachments, index)}
                            className={
                                `group relative flex cursor-pointer flex-col items-center justify-center text-gray-500 ` +
                                (isAudio(attachment)
                                    ? "w-32 rounded bg-transparent px-2" // w-80
                                    : "aspect-square w-32 rounded bg-transparent px-1")
                            }
                        >
                            {!isAudio(attachment) && (
                                <a
                                    onClick={(e) => e.stopPropagation()}
                                    download
                                    href={attachment.url}
                                    className="absolute right-0 top-0 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-gray-700 text-gray-100 opacity-100 transition-all hover:bg-gray-800 group-hover:opacity-100"
                                >
                                    <i className="ri-arrow-down-line text-base"></i>
                                </a>
                            )}

                            {isImage(attachment) && (
                                <img
                                    src={attachment.url}
                                    alt=""
                                    className="aspect-square object-contain"
                                />
                            )}

                            {isVideo(attachment) && (
                                <div className="relative flex items-center justify-center">
                                    <i className="ri-play-fill absolute z-20 text-6xl text-white opacity-70"></i>
                                    <div className="absolute left-0 top-0 z-10 h-full w-full bg-black/50"></div>
                                    <video src={attachment.url}></video>
                                </div>
                            )}

                            {isAudio(attachment) && (
                                // <div className="relative flex items-center justify-center">
                                //     <div className="absolute bottom-0 left-0 right-0 top-0"></div>
                                //     <iframe
                                //         src={attachment.url}
                                //         className="h-full w-full"
                                //     ></iframe>
                                // </div>
                                <div className="relative flex items-center justify-center">
                                    <a
                                        onClick={(e) => e.stopPropagation()}
                                        download
                                        href={attachment.url}
                                        className="absolute right-0 top-0 z-10 flex h-8 w-8 cursor-pointer items-center justify-center rounded bg-gray-700 text-gray-100 opacity-100 transition-all hover:bg-gray-800 group-hover:opacity-100"
                                    >
                                        <i className="ri-arrow-down-line text-base"></i>
                                    </a>
                                    <div className="flex h-full w-full flex-col items-center justify-center rounded bg-gray-200 dark:bg-gray-300">
                                        <i className="ri-music-2-fill mb-3 text-4xl text-gray-800"></i>
                                        <small className="text-center text-gray-800">
                                            {attachment.name}
                                        </small>
                                    </div>
                                </div>
                            )}

                            {isPDF(attachment) && (
                                // <a
                                //     onClick={(e) => e.stopPropagation()}
                                //     download
                                //     href={attachment.url}
                                //     className="flex h-full w-full flex-col items-center justify-center rounded bg-gray-200 dark:bg-gray-300"
                                // >
                                //     <i className="ri-file-pdf-2-fill mb-3 text-4xl text-red-600"></i>
                                //     <small className="text-gray-800 text-center">
                                //         {attachment.name}
                                //     </small>
                                // </a>
                                <div className="flex h-full w-full flex-col items-center justify-center rounded bg-gray-200 dark:bg-gray-300">
                                    <i className="ri-file-pdf-2-fill mb-3 text-4xl text-red-600"></i>
                                    <small className="text-center text-gray-800">
                                        {attachment.name}
                                    </small>
                                </div>
                            )}

                            {!isPreviewable(attachment) && (
                                <a
                                    onClick={(e) => e.stopPropagation()}
                                    download
                                    href={attachment.url}
                                    className="flex h-full w-full flex-col items-center justify-center rounded bg-gray-200 dark:bg-gray-300"
                                >
                                    <i className="ri-attachment-2 mb-3 text-4xl text-gray-800"></i>
                                    <small className="text-center text-gray-800">
                                        {attachment.name}
                                    </small>
                                </a>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </>
    );
}
