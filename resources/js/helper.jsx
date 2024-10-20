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
        return "Yesterday, " + inputDate.toLocaleTimeString("id-ID", formatClock);
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
