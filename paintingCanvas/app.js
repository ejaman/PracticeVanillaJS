const canvas = document.getElementById("jsCanvas");
const context = canvas.getContext("2d");
const color = document.getElementsByClassName("controlColor");
const range = document.querySelector("#jsRange");
const fillBtn = document.querySelector("#jsMode");
const saveBtn = document.querySelector("#jsSave");
const sizeX = document.querySelector("#jsX");
const sizeY = document.querySelector("#jsY");

//default
canvas.width = 1000;
canvas.height = 600;
context.lineWidth = 10.1;
context.lineCap = "round";
context.fillStyle = "white";
context.fillRect(0, 0, sizeX.value, sizeY.value);

let painting = false;

function stopPaint() {
  painting = false;
}

function startPaint() {
  painting = true;
}

function OnColorChange(event) {
  const bgColor = event.target.style.backgroundColor;
  context.strokeStyle = bgColor;
}
function onHandleRange(event) {
  const range = event.target.value;
  console.log(range);
  context.lineWidth = range;
}
function onHandleFill() {
  context.fillStyle = context.strokeStyle;
  context.fillRect(0, 0, sizeX.value, sizeY.value);
}

function onHandleSave() {
  const img = canvas.toDataURL("image/png");
  const link = document.createElement("a");
  link.href = img;
  link.download = "paintJS 🎨";
  link.click();
}
function onHandleSize() {
  canvas.style.width = `${sizeX.value}px`;
  canvas.style.height = `${sizeY.value}px`;
  canvas.width = sizeX.value;
  canvas.height = sizeY.value;
  context.lineWidth = 10.1;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if (!painting) {
    context.beginPath(); // line
    context.moveTo(x, y);
  } else {
    context.lineTo(x, y);
    context.stroke();
  }
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPaint);
  canvas.addEventListener("mouseup", stopPaint);
  canvas.addEventListener("mouseleave", stopPaint);
  canvas.addEventListener("contextmenu", (e) => e.preventDefault());
}
Array.from(color).forEach((c) => c.addEventListener("click", OnColorChange));
range.addEventListener("input", onHandleRange);
fillBtn.addEventListener("click", onHandleFill);
saveBtn.addEventListener("click", onHandleSave);

sizeX.addEventListener("input", onHandleSize);
sizeY.addEventListener("input", onHandleSize);
