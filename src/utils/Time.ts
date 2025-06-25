export function getDeltaTime(time: Date) {
    return new Date().getTime() - time.getTime();
}

export function getDateTime() {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()} ${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}.${now.getMilliseconds()}`;
    return formattedDate;
}