export const getFullDate = date => {
  if(!date) return null;
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);
  const year = date.getFullYear();

  return year + "-" + month + "-" + day;
};