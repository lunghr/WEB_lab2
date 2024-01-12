const data = localStorage.getItem("last");
const time = document.getElementById("time");
const executionTime = document.getElementById("execution-time");
const history = document.getElementById("history");
const hitting = document.getElementById("hitting");

window.onload = function (){

    let dots = data.split(" ");
    console.log(dots.length);
    dots.forEach(it => {
        let tmpResponse = it.split(";");
        if (!(tmpResponse[0] === "")) {
            console.log(tmpResponse);
            let x = tmpResponse[0].split(',');
            console.log(tmpResponse[4]);
            let exTime = tmpResponse[4].split(',');
            let hit = tmpResponse[3].split(',');

            for (let i = 0; i < x.length; i++) {
                const historyEl = document.createElement("div");
                const timeEl = document.createElement("div");
                const exTimeEl = document.createElement("div");
                const hittingEl = document.createElement("div");


                historyEl.textContent = "x:" + x[i] + " y:" + tmpResponse[1] + " r:" + tmpResponse[2];
                exTimeEl.textContent = exTime[i];
                timeEl.textContent = tmpResponse[5];
                hittingEl.textContent = hit[i];
                hitting.insertBefore(hittingEl, hitting.firstChild);
                history.insertBefore(historyEl, history.firstChild);
                time.insertBefore(timeEl, time.firstChild);
                executionTime.insertBefore(exTimeEl, executionTime.firstChild)
            }
        }
    })
}