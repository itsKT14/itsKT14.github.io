const checkDate = (createAt) => {
    const time = new Date(createAt);
    const now = new Date();
    const diff = (now.getTime() - time.getTime()) / 1000;

    if (diff < 60) {
        return 'just now';
    } else if (diff < 3600) {
        return Math.round(diff / 60) + ' minute(s) ago';
    } else if (diff < 86400) {
        return Math.round(diff / 3600) + ' hour(s) ago';
    } else if (diff < 604800) {
        return Math.round(diff / 86400) + ' day(s) ago';
    } else if (diff < 2592000) {
        return Math.round(diff / 604800) + ' week(s) ago';
    } else if (diff < 31536000) {
        return Math.round(diff / 2592000) + ' month(s) ago';
    } else if (diff < 315360000) {
        return Math.round(diff / 31536000) + ' year(s) ago';
    }

    return time.toDateString();
}

module.exports = checkDate;