const regex = /^data:image\/(\w+);base64,(.+)$/;
const matches = "data:image/png;base64,iVBORw0KGgo".match(regex);
console.log(matches);
