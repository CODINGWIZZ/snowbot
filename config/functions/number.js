module.exports = function(number) {
  if(!number || typeof number !== "number") return 0;
  return number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}