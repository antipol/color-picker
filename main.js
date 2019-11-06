//Play sound based on Image

const canvas = document.getElementById("canvas-container");

//set height and width of canvas
const width = 100;
const height = 300;

canvas.width = width;
canvas.height = height;

//Get context in order to be able to manipulate the canvas
const context = canvas.getContext("2d");

//insert image/photo on canvas on load
const makeBase = () => {
  const baseImage = new Image();
  baseImage.src = "./pug.jpg";
  baseImage.onload = () => {
    context.drawImage(baseImage, 0, 0);
  };
};

makeBase();

//creating h1 element to text functions
const test = document.getElementById("test");

//get rgba color code of that pixel on click
const getColor = e => {
  //set object with cursor position on click
  const positions = {
    x: e.offsetX,
    y: e.offsetY
  };

  //get rgba image data of that specfic pixel
  const pixelData = context.getImageData(positions.x, positions.y, 1, 1).data;

  //change backgroundcolor of h1 element to specified color
  test.style.backgroundColor = `rgb(${pixelData[0]}, ${pixelData[1]}, ${
    pixelData[2]
  })`;
};

canvas.addEventListener("click", getColor);

//GET COLOR CODES IN PERCENTAGE

//This array will contain all the arrays with each their own rgb color code in percentage
const soundCollection = [];

const testEvent = e => {
  //for a start only first line of pixels will be generated
  for (let i = 0; i < width; i++) {
    //get rgba array for each pixel in the width
    //args: x-axis (here i), y-axis, width, height
    const pixelColor = context.getImageData(i, 1, 1, 1).data;

    //remove alpha (transparency) value
    const rgbValues = pixelColor.slice(0, 3);

    //set soundVals array with percentage of each color component ([r, g, b])
    let soundVals = rgbValues.map(
      (val, i) =>
        Math.round((val / rgbValues.reduce((acc, cur) => acc + cur)) * 100) //get percentages relative to each other (100% in total)
    );

    //push each sound percentage array to the soundCollection
    soundCollection.push(soundVals);
  }

  return soundCollection;
};

test.addEventListener("click", testEvent);
