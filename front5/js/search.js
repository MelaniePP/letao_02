$(function(){
  // 搜索记录动态渲染
  // 点击搜索按钮，获取Input框的文本，添加到历史数据中

  /*
  * 分析功能需求:
  * 1. 根据搜索历史, 进行渲染展示
  * 2. 清空所有历史
  * 3. 删除单个历史记录
  * 4. 添加历史记录
  * */

 /*
  * 功能1: 根据搜索历史, 进行渲染展示
  * (1) 从本地存储中, 读取历史记录
  * (2) 读取出来是json字符串, 转换成数组
  * (3) 通过模板引擎进行渲染
  * */
 render();
function getHistory(){
  //  如果本地没有数据，获取返回null,转化为“[]”
  var jsonStr = localStorage.getItem("search_list")||"[]";
  var arr = JSON.parse(jsonStr);
  return arr;
}
 function render(){
  var arr = getHistory();
   $(".lt_history").html(template("historytmp",{list:arr}))
 }

//  2. 清空所有历史
// 点击“清空”，清空本地数据
$(".lt_history").on("click",".emptyBtn",function(){
  localStorage.removeItem("search_list");
  render();
})

// 功能 3. 删除单个历史记录
// 为x绑定点击事件
$(".lt_history").on("click",".btn_delete",function(){
  // 获取索引
  var index = $(this).data("index");
  // console.log(index);
  var arr  = getHistory();
  arr.splice(index,1);
  // 转成json字符串存入本地
  localStorage.setItem("search_list",JSON.stringify(arr));
  // 重新渲染
  render()
})

// 功能4. 添加历史记录
// 点击搜索，获取输入框的文本
$(".search_btn").on("click",function(){
  var key = $(".search_inp").val().trim();
  // console.log(txt);
  // 判断是否输入内容
  if(key===''){
    mui.toast('请输入关键字');
    return
  }
  var arr = getHistory();
  // console.log(arr);
  // 判断记录中是否有该内容
  if(arr.indexOf(key) != -1){
    arr.splice(arr.indexOf(key),1);
  }
  // 追加到数组的最前面
  // 判断数组长度是否大于10
  if(arr.length>=10){
    // 从后面删除一项
    arr.pop();
  }
  arr.unshift(key);
  localStorage.setItem("search_list",JSON.stringify(arr))
  // console.log(arr);

  // 重置文本内容
  $(".search_inp").val("");
  render();

  // 跳转到搜索列表页
  location.href = "searchList.html?key="+key;
})


})