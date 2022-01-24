import moment from "moment";
export const timestampConverter = (timestamp: string): string => {
  if (typeof timestamp !== "string" || timestamp.length < 15) {
    return "Not a valid timestamp";
  }
  const array = timestamp.split(/-|:|\.|T/g);
  const numArr = array.map((num) => parseInt(num));
  const result = moment([
    numArr[0],
    numArr[1] - 1,
    numArr[2],
    numArr[3],
    numArr[4],
  ]).fromNow();
  return result;
};
