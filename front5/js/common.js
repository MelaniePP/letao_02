mui('.mui-scroll-wrapper').scroll({
  deceleration: 0.0005,
  indicators: false //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
// 此方法专门用于解析获取地址栏参数
function getSearch(k){

  // 获取地址栏参数
  var str = location.search;//"?key=%E5%8C%A1%E5%A8%81&name=pp&age=18&money=more"

  // 解码
  str = decodeURI(str);//"?key=匡威&name=pp&age=18&money=more"


//  截取？后面的内容
  str = str.slice(1);//"key=匡威&name=pp&age=18&money=more"

  // 通过&截取成数组
  var arr = str.split("&");//["key=匡威", "name=pp", "age=18", "money=more"]
  var obj = {};
  // 遍历数组，并用=截取成数组,存入对象中
  arr.forEach(function(v,i){
    var key = v.split("=")[0];
    var value = v.split("=")[1];
    obj[key] = value;
  })
  return obj[k];
}
