/**
 * Collection of time functions
 */

export default abstract class TimeFunctions {
  public static timeToUnixTimestamp = (v: Date) => {
    return (v.getHours() * 60 + v.getMinutes()) * 60;
  };
  public static dayToUnixTimestamp = (v: Date) => {
    return Math.floor(v.getTime() / 1000);
  };
  public static extractDayFromDate = (v: Date) => {
    return Math.floor(
      new Date(v.getFullYear(), v.getMonth(), v.getDate(), 0, 0, 0, 0).getTime() / 1000
    );
  };
  public static unixTimestampToDay = (v: number) => {
    return new Date(v * 1000);
  };
  public static fromDateToString = (v: Date) => {
    const date = v;
    const year = date.getFullYear();
    const month = `0${date.getMonth() + 1}`;
    const day = `0${date.getDate()}`;
    const hour = `0${date.getHours()}`;
    const minute = `0${date.getMinutes()}`;
    const second = `0${date.getSeconds()}`;
    return `${year}-${month.substr(-2)}-${day.substr(-2)} ${hour.substr(-2)}:${minute.substr(
      -2
    )}:${second.substr(-2)}`;
  };
}
