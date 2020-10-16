export default function format(time) {
  try {
    let splittedTime = time.split(" ");
    let timeOnly = splittedTime.pop();
    timeOnly = splittedTime.pop();

    let hours = timeOnly.split(":")[0];
    let minutes = timeOnly.split(":")[1];
    let amOrPm = "AM";

    if (parseInt(hours) < 12) {
      amOrPm = "AM";
    } else {
      hours = parseInt(hours) - 12;
      hours = hours.toString();
      amOrPm = "PM";
    }

    if (hours.length == 1) {
      hours = "0" + hours.toString();
    }
    if (minutes.length == 1) {
      minutes = "0" + minutes;
    }
    let newSplittedTime = time.split(" ");
    newSplittedTime[4] = `${hours}:${minutes} ${amOrPm}`;
    return newSplittedTime.join(" ");
  } catch (err) {
    console.log(err);
  }
}
