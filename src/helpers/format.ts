import moment from "moment";

const MINS_IN_HOUR = 60;

const MINS_IN_DAY = 1440;

const formatDate = (date: Date): string => moment(date).format("DD/MM/YYYY");

const minsToStringDays = (mins: number): string => {
    const days = Math.floor(mins / MINS_IN_DAY);
    return `${days} jour${days > 1 ? "s" : ""}`;
}

const minsToStringHours = (mins: number): string => {
    const hours = Math.floor(mins / MINS_IN_HOUR);
    const remain = mins % MINS_IN_HOUR;
    return `${hours} h ${remain} minute${remain > 1 ? "s" : ""}`;
}

const minsToStringHoursDays = (mins: number): string => {
    const hours = minsToStringHours(mins);
    const days = minsToStringDays(mins);
    return days !== "" ? `${hours} • ${days}` : hours;
}

const buildUrl = (url: string, query: string, param: string | undefined, separator: string = "&"): string => url.concat(param ? `${separator}${query}=${param}` : "");

export { 
    buildUrl,
    formatDate,
    minsToStringDays,
    minsToStringHours,
    minsToStringHoursDays
};