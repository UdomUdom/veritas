export const thisYear = () => {
  return (new Date().getFullYear() + 543).toString();
};

export const padString = (str: string, n: number) => {
  return str.padStart(n, "0");
};

export const seqNumber = (seq: number, slice: number) => {
  return `${thisYear().slice(slice)}${padString(seq.toString(), 5)}`;
};
