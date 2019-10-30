const TimeUtils = {
  convertDateToTimestamp(date) {
    // if date is a blank string, replace with null
    if (date === '') {
      date = null;
    }
    // otherwise, add time (with local timezone) to the date
    else {
      date = new Date(date);
      date.setHours(24);
      date = date.toISOString();
    }
    return date;
  },
};

export default TimeUtils;
