module.exports = function(length) {
  if(!length) length = 7;
  if(typeof length !== "number") return;

  let result = "";
  let id = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for(let i = 0; i < length; i++) {
    result += id.charAt(Math.floor(Math.random() * id.length));
  }
  return result;
}