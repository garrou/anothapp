import moment from "moment";

const formatDate = (date: Date) => moment(date).format('YYYY-MM-DD');

export { formatDate };