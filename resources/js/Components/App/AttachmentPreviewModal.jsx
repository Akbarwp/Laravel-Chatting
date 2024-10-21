import { isAudio, isImage, isPDF, isPreviewable, isVideo } from "@/helper";
import {
    Dialog,
    DialogPanel,
    Transition,
    TransitionChild,
} from "@headlessui/react";
import { Fragment, useEffect, useMemo, useState } from "react";

export default function AttachmentPreviewModal({
    attachments,
    index,
    show = false,
    onClose = () => {},
}) {
    const [currentIndex, setCurrentIndex] = useState(0);

    const previewableAttachments = useMemo(() => {
        return attachments.filter((attachment) => isPreviewable(attachment));
    }, [attachments]);

    const attachment = useMemo(() => {
        return previewableAttachments[currentIndex];
    }, [attachments, currentIndex]);

    const close = () => {
        onClose();
    };

    const prev = () => {
        if (currentIndex === 0) {
            return;
        }
        setCurrentIndex(currentIndex - 1);
    };

    const next = () => {
        if (currentIndex === previewableAttachments.length - 1) {
            return;
        }
        setCurrentIndex(currentIndex + 1);
    };

    useEffect(() => {
        setCurrentIndex(index);
    }, [index]);

    // const handleKeyPress = (event) => {
    //     if (event.key === 'ArrowRight') {
    //         next();
    //     } else if (event.key === 'ArrowLeft') {
    //         prev();
    //     }
    // };
    // useEffect(() => {
    //     window.addEventListener('keydown', handleKeyPress);
    //     return () => {
    //         window.removeEventListener('keydown', handleKeyPress);
    //     };
    // }, [currentIndex]);

    return (
        <Transition show={show} as={Fragment} leave="duration-200">
            <Dialog
                as="div"
                id="modal"
                className="relative z-50"
                onClose={close}
            >
                <TransitionChild
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-black/25" />
                </TransitionChild>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="h-screen w-screen">
                        <TransitionChild
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <DialogPanel className="tranaltion-all flex h-full w-full transform flex-col overflow-hidden bg-black/70 text-left align-middle shadow-xl dark:bg-black/50">
                                <button
                                    onClick={close}
                                    className="absolute right-3 top-3 z-40 btn btn-circle btn-sm"
                                >
                                    <i className="ri-close-line text-xl"></i>
                                </button>
                                <div className="group relative h-full">
                                    {currentIndex > 0 && (
                                        <div
                                            className="absolute left-4 top-1/2 z-30 flex h-16 w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-gray-100 opacity-100"
                                            onClick={prev}
                                        >
                                            <i className="ri-arrow-left-line text-5xl"></i>
                                        </div>
                                    )}
                                    {currentIndex <
                                        previewableAttachments.length - 1 && (
                                        <div
                                            className="absolute right-4 top-1/2 z-30 flex h-16 w-16 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full bg-black/50 text-gray-100 opacity-100"
                                            onClick={next}
                                        >
                                            <i className="ri-arrow-right-line text-5xl"></i>
                                        </div>
                                    )}

                                    {attachment && (
                                        <div className="itecems-center flex h-full w-full justify-center p-3">
                                            {isImage(attachment) && (
                                                <img
                                                    src={attachment.url}
                                                    alt=""
                                                    className="max-h-full max-w-full"
                                                />
                                            )}
                                            {isVideo(attachment) && (
                                                <div className="flex items-center">
                                                    <video
                                                        src={attachment.url}
                                                        controls
                                                        autoPlay
                                                    ></video>
                                                </div>
                                            )}
                                            {isAudio(attachment) && (
                                                <div className="relative flex items-center justify-center">
                                                    <audio
                                                        src={attachment.url}
                                                        controls
                                                        autoPlay
                                                    ></audio>
                                                </div>
                                            )}
                                            {isPDF(attachment) && (
                                                <iframe
                                                    src={attachment.url}
                                                    className="h-full w-full"
                                                ></iframe>
                                            )}
                                            {!isPreviewable(attachment) && (
                                                <div className="flex flex-col items-center justify-center p-32 text-gray-100">
                                                    <i className="ri-attachment-2 mb-3 text-4xl"></i>
                                                    <small>
                                                        {attachment.name}
                                                    </small>
                                                </div>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </DialogPanel>
                        </TransitionChild>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
}
