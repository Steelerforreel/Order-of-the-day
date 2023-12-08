module.exports = {
  format_date: (date) => {
    // Format date as MM/DD/YYYY
    return date.toLocaleDateString();
  },
  // format_time: (time) => {
  //   return time.toLocaleTimeString();
  // },
  // format_amount: (amount) => {
  //   // format large numbers with commas
  //   return parseInt(amount).toLocaleString();
  // }
};
