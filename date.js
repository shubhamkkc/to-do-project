
 

 exports.fulldate=function (){
var option = {
  weekday: "long",
  day: "numeric",
  month: "long",
};

const date = new Date();
return currentDate = date.toLocaleDateString("en-us", option);

}
exports.onlyday=function  (){
  var option = {
    weekday: "long",
   
  };
  
  const date = new Date();
  return currentDate = date.toLocaleDateString("en-us", option);
  
  }

