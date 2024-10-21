export const dateDifferenceInDays = (date) => {
    const now = new Date();
    const inputDate = new Date(date);

    const formatDay = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    };
    const formatClock = {
        hour: "2-digit",
        minute: "2-digit",
    };

    if (isToday(inputDate)) {
        return "Today, " + inputDate.toLocaleTimeString("id-ID", formatClock);
    } else if (isYesterday(inputDate)) {
        return (
            "Yesterday, " + inputDate.toLocaleTimeString("id-ID", formatClock)
        );
    } else if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleDateString("id-ID", formatDay);
    } else {
        return inputDate.toLocaleDateString("id-ID", formatDay);
    }
};

export const dateDifferenceInDaysConversation = (date) => {
    const now = new Date();
    const inputDate = new Date(date);

    const formatDay = {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
    };
    const formatClock = {
        hour: "2-digit",
        minute: "2-digit",
    };

    if (isToday(inputDate)) {
        return inputDate.toLocaleTimeString("id-ID", formatClock);
    } else if (isYesterday(inputDate)) {
        return "Yesterday";
    } else if (inputDate.getFullYear() === now.getFullYear()) {
        return inputDate.toLocaleDateString("id-ID", formatDay);
    } else {
        return inputDate.toLocaleDateString("id-ID", formatDay);
    }
};

const isToday = (date) => {
    const today = new Date();
    return (
        date.getDate() === today.getDate() &&
        date.getMonth() === today.getMonth() &&
        date.getFullYear() === today.getFullYear()
    );
};

const isYesterday = (date) => {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    return (
        date.getDate() === yesterday.getDate() &&
        date.getMonth() === yesterday.getMonth() &&
        date.getFullYear() === yesterday.getFullYear()
    );
};

export const isImage = (attachment) => {
    let mime = attachment.mime || attachment.type;
    mime = mime.split("/");
    return mime[0].toLowerCase() === "image";
};

export const isVideo = (attachment) => {
    let mime = attachment.mime || attachment.type;
    mime = mime.split("/");
    return mime[0].toLowerCase() === "video";
};

export const isAudio = (attachment) => {
    let mime = attachment.mime || attachment.type;
    mime = mime.split("/");
    return mime[0].toLowerCase() === "audio";
};

export const isPDF = (attachment) => {
    let mime = attachment.mime || attachment.type;
    return mime === "application/pdf";
};

export const isPreviewable = (attachment) => {
    return (
        isImage(attachment) ||
        isVideo(attachment) ||
        isAudio(attachment) ||
        isPDF(attachment)
    );
};

export const formatBytes = (bytes, decimals = 2) => {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    let i = 0;
    let size = bytes;
    while (size >= k) {
        size /= k;
        i++;
    }

    return parseFloat(size.toFixed(dm)) + " " + sizes[i];
};

export const formatMediaPlayerTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60)
        .toString()
        .padStart(2, "0");
    return `${minutes}:${seconds}`;
};
