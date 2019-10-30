const ExpirationsService = {
  getExpirationString: (expiration_date) => {
    if (!expiration_date || expiration_date === 'null') {
      return 'nonperishable';
    }

    const today = new Date();
    expiration_date = new Date(expiration_date);
    // console.log(`
    // today: ${today.toISOString()}
    // expir: ${expiration_date.toISOString()}`);
    let numDays = (expiration_date.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    numDays = Math.ceil(numDays);
    if (numDays <= 0) {
      return 'expired';
    } else if (numDays <= 2) {
      return 'danger';
    } else if (numDays <= 4) {
      return 'warning';
    } else if (numDays > 4) {
      return 'fresh';
    }
  },
};

export default ExpirationsService;
