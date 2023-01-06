function minimum(...elems) {
    let m = elems[0];
    for (let elem of elems) {
        if (m < elem) {
            m = elem;
        }
    }
    return m;
}
function calcAverage(...elems) {
    let m = 0;
    for (let elem of elems) {
        //if (m < elem) {
        m += elem;
        //}
    }
    return m / elems.length;
}

const chars = 'Ñ@#W$9876543210?!abc;:+=-,._ ';
let charsLength = chars.length;

function prepareP5(p) {

    let img;
    let arr;

    p.preload = function () {
        img = p.loadImage("me.png");
        arr = [];
        // console.table(arr);
    }

    p.setup = function () {
        let min = 0;
        let max = 0;
        p.background(0);
        /*p.image(img, 0, 0);*/
        //img.resize(203, 272);
        p.image(img, 0, 0);
        console.log(img.height, img.width);
        img.loadPixels();
        //console.log(img.height, img.width);
        for (let i = 0; i < img.height; i++) {
            arr.push([]);
            for (let j = 0; j < img.width; j++) {
                let index = (i * img.width + j) * 4;
                //let average = Math.floor((img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2] + img.pixels[index + 3]) / 4);

                let average = calcAverage(img.pixels[index], img.pixels[index + 1], img.pixels[index + 2]);
                average = p.map(average, 0, 255, 0, chars.length);//Math.ceil((charsLength - 1) * average / 255);
                arr[i].push(average);
                if (min > average) {
                    min = average;
                }

                if (max < average) {
                    max = average;
                }
                //console.log(average);
                img.pixels[index] = average;
                img.pixels[index + 1] = average;
                img.pixels[index + 2] = average;
                img.pixels[index + 3] = 0;
            }
        }
        drawSquares.call(p, 512, 512, 2, arr);
        //img.updatePixels();
        /* console.log(arr);
         //p.pixelDensity(1);
         //p.loadPixels();
         p.fill(255);
         for (let i = 0; i < arr.length; i++) {
             for (let j = 0; j < arr[0].length; j++) {
                 let index = (i * arr[0].length + j) * 4;
                 /*let col = p.color(arr[i][j], arr[i][j], arr[i][j], arr[i][j]);
                 p.pixels[index] = p.red(col);
                 p.pixels[index + 1] = p.green(col);
                 p.pixels[index + 2] = p.blue(col);
                 p.pixels[index + 3] = 255;
                 p.text('o', i, j);
             }
         }
         //p.updatePixels();
         //p.image(img, 512, 0);*/
    }

    p.draw = function () {
        //p.background(0);

        /*img.loadPixels();
        for (let i = 0; i < img.height; i++) {
            for (let j = 0; j < img.width; j++) {
                let index = (i * img.width + j) * 4;
                let average = Math.floor((img.pixels[index] + img.pixels[index + 1] + img.pixels[index + 2] + img.pixels[index + 3]) / 4);
                average = Math.ceil(p.round(26 * average / 255) * (255 / 26));
                arr.push(average);
                //console.log(average);
                img.pixels[index] = average;
                img.pixels[index + 1] = average;
                img.pixels[index + 2] = average;
                img.pixels[index + 3] = average;
            }
        }
        img.updatePixels();*/

        p.noLoop();
    }
}

function drawSquares(rows, cols, width, arr) {
    this.createCanvas(rows * 10, cols * 10);
    this.background(0);
    //this.noStroke();
    //this.stroke(100);
    //this.textSize(5);
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr[0].length; j++) {
            this.fill(255);
            this.textSize(5);
            //this.rect(j * width, i * width, width, width);
            this.text(chars.charAt(6 - arr[i][j]), j * 10, i * 10);
        }
    }
}

new p5(prepareP5, "original");