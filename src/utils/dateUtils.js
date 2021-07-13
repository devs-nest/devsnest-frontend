export const startOfWeek = (date) => {
  // Mon - Sun
  let diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

export const isEqualStartWeekDate = (d1, d2) => {
  const date1 = startOfWeek(d1);
  const date2 = startOfWeek(d2);

  return (
    date1.getDate() === date2.getDate() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getFullYear() === date2.getFullYear()
  );
};
