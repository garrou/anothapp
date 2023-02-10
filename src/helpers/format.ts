import moment from "moment";

const minsInHour = 60;

const minsInDay = 1440;

const formatDate = (date: Date) => moment(date).format('DD/MM/YYYY');

const minsToHours = (mins: number) => mins / minsInHour;

const minsToStringDays = (mins: number) => `${(mins / minsInDay).toFixed(2)} jours`;

const minsToStringHours = (mins: number) => `${(mins / minsInHour).toFixed(0)} h ${mins % minsInHour} minutes`;

export { 
    formatDate,
    minsToHours,
    minsToStringDays,
    minsToStringHours
};