export const thisYear = () => {
  return (new Date().getFullYear() + 543).toString();
};

export const padString = (str: string, n: number) => {
  return str.padStart(n, "0");
};

export const seqStudent = (seq: number) => {
  return `${thisYear().slice(-2)}${padString(seq.toString(), 5)}`;
};

export const seqInstructor = (seq: number, department: number) => {
  return `${thisYear().slice(-2)}${padString(department.toString(), 2)}${padString(seq.toString(),5)}`;
};
