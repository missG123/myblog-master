export const getTime = (): String => {
    const time = new Date();
    const year = time.getFullYear();
    let month: String | Number = time.getMonth() + 1;
    let day: String | Number = time.getDate();
    month = month < 10 ? '0' + month : month;
    day = day < 10 ? '0' + day : day;
    let hours: String | Number = time.getHours();
    let min: String | Number = time.getMinutes();
    let sec: String | Number = time.getSeconds();
    hours = hours < 10 ? '0' + hours : hours;
    min = min < 10 ? '0' + min : min;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    const dateTime = year + '-' + month + '-' + day + " " + hours + ":" + min + ":" + sec;
    return dateTime;
}

export const debounce = (fn: Function, wait: number) => {
    let timeout: number | null = 0;
    return function () {
        timeout && clearTimeout(timeout);
        timeout = window.setTimeout(() => {
            fn(arguments)
        }, wait)
    }
}

