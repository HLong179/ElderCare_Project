
export default function timeConvert(m){
    let temp = m;
    let hours = temp / 60;
    let fHours = Math.floor(hours);
    let minute = (hours - fHours) * 60;
    alert(m);

    let rMinute = Math.round(minute);
    return {
        fHours,
        rMinute,
    }


}