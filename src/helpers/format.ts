import moment from "moment";

const MINS_IN_HOUR = 60;

const MINS_IN_DAY = 1440;

const formatDate = (date: Date) => moment(date).format('DD/MM/YYYY');

const minsToHours = (mins: number) => mins / MINS_IN_HOUR;

const minsToStringDays = (mins: number) => `${(mins / MINS_IN_DAY).toFixed(2)} jours`;

const minsToStringHours = (mins: number) => `${(mins / MINS_IN_HOUR).toFixed(0)} h ${mins % MINS_IN_HOUR} minutes`;

export { 
    formatDate,
    minsToHours,
    minsToStringDays,
    minsToStringHours
};