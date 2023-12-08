import moment from "moment";

const MINS_IN_HOUR = 60;

const MINS_IN_DAY = 1440;

const formatDate = (date: Date): string => moment(date).format('DD/MM/YYYY');

const minsToHours = (mins: number): number => mins / MINS_IN_HOUR;

const minsToStringDays = (mins: number): string => `${Math.floor(mins / MINS_IN_DAY)} jours`;

const minsToStringHours = (mins: number): string => `${Math.floor(mins / MINS_IN_HOUR)} h ${mins % MINS_IN_HOUR} minutes`;

export { 
    formatDate,
    minsToHours,
    minsToStringDays,
    minsToStringHours
};