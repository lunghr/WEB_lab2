const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const axisLength = 300;
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
function drawAxes() {

    // Ось X
    context.beginPath();
    context.moveTo(centerX - axisLength / 2, centerY);
    context.lineTo(centerX + axisLength / 2, centerY);
    context.strokeStyle = 'black';
    context.stroke();
    context.closePath();

    // Ось Y
    context.beginPath();
    context.moveTo(centerX, centerY - axisLength / 2);
    context.lineTo(centerX, centerY + axisLength / 2);
    context.strokeStyle = 'black';
    context.stroke();
    context.closePath();

    // Подписи к осям
    context.font = '16px Cambria';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.textBaseline = 'middle';

    // Подпись к оси X
    context.fillText('X', centerX + axisLength / 2 + 20, centerY + 10);

    // Подпись к оси Y
    context.fillText('Y', centerX - 10, centerY - axisLength / 2 - 20);


    // Треугольник на конце оси X
    context.beginPath();
    context.moveTo(centerX + axisLength / 2 - 10, centerY - 3);
    context.lineTo((centerX + axisLength / 2)+3, centerY);
    context.lineTo(centerX + axisLength / 2 - 10, centerY + 3);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();

    // Треугольник на конце оси Y
    context.beginPath();
    context.moveTo(centerX - 3, centerY - axisLength / 2 + 10);
    context.lineTo(centerX, (centerY - axisLength/ 2)-3);
    context.lineTo(centerX + 3, centerY - axisLength / 2 + 10);
    context.fillStyle = 'black';
    context.fill();
    context.closePath();


    // Подписи целых чисел на оси X
    for (let i = -5; i <= 5; i++) {
        if (i !== 0) {
            const tickX = centerX + (i * axisLength) / 10;
            context.fillText(i, tickX, centerY + 10);
        }
        else{
            const tickX = (centerX + (i * axisLength) / 10) + 6;
            context.fillText(i, tickX, centerY + 10);
        }
    }

    for (let i = -5; i <= 5; i++) {
        if (i !== 0) {
            const tickY = centerY - (i * axisLength) / 10;
            context.fillText(i, centerX+10, tickY);
        }
    }
}



let x = 2 ;
let y= 2 ;
let r = 3 ;

function drawGraph(r){
    context.clearRect(0, 0, 400, 400)
    drawAxes();

    r = r * 30;

    //треугольник
    context.beginPath();
    context.fillStyle ='rgba(255, 0, 0, 0.5)';
    context.moveTo(centerX, centerY - (r/2));
    context.lineTo(centerX + (r/2), centerY);
    context.lineTo(centerX, centerY);
    context.lineTo(centerX, centerY-(r/2))
    context.fill();
    context.closePath();

    //прямоугольник
    context.beginPath();
    context.fillStyle ='rgba(255, 0, 0, 0.5)';
    context.moveTo(centerX, centerY - (r/2));
    context.lineTo(centerX - r, centerY - (r/2));
    context.lineTo(centerX - r, centerY);
    context.lineTo(centerX, centerY);
    context.lineTo(centerX, centerY-(r/2));
    context.fill();
    context.closePath();


    //полукруг
    context.beginPath();
    context.fillStyle ='rgba(255, 0, 0, 0.5)';

    context.arc(centerX, centerY, r , Math.PI / 2, Math.PI);
    context.lineTo(centerX, centerY);
    context.fill();
    context.closePath();


}

function drawDots(xs, y, r) {
    const originalColor = context.fillStyle;

    // Точки

    xs.forEach(x=>{
        const X = centerX + x * 30;
        const Y = centerY - y * 30;
        context.beginPath();
        context.arc(X, Y, 2, 0, 2 * Math.PI);

        console.log("meow");
        if (validation(x, y, r)) {
            context.fillStyle = 'green';
        } else {
            context.fillStyle = 'red';
        }
        context.fill();
        context.closePath();
    })


    context.fillStyle = originalColor;
}

function validation(x, y, r) {
    if ((x <= 0 && y >= 0) && (x >= -r && y <= (r/2))){
        return true;
    }
    else if ((x <= 0 && y <= 0) && ((r*r) >= (x * x + y * y))) {
        return true;
    }
    else if (x >= 0 && x <= r/2 && y >= 0 && y<=r/2 && (x + y)<= r/2) {
        return true;
    }
    return false;
}

drawGraph(r);

