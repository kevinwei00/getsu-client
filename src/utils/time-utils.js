const TimeUtils = {
  /**
   * @param {string} date YYYY-MM-DD
   * @returns {string} YYYY-MM-DDTHH:mm:ss.sssZ, or null
   */
  dateToTimestamp(date) {
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
  /**
   * @param {string} timestamp YYYY-MM-DDTHH:mm:ss.sssZ
   * @returns {string} YYYY-MM-DD, or null
   */
  timestampToDate: (timestamp) => {
    return timestamp ? timestamp.split('T')[0] : null;
  },
};

export default TimeUtils;
