export const ShortDate = (date: string) => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const d = new Date(date);
  const m = months[d.getMonth()];

  return `${d.getDate()} ${m}`;
};
