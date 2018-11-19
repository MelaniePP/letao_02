$(function(){
  // 左侧渲染
  $.ajax({
    type:"get",
    url:"/category/queryTopCategory",
    dataType:"json",
    success:function(info){
      // console.log(info);
      $(".firstCate").html(template("categoryTmp",info));
    }
  })

  // 给左边的a注册点击事件
  $(".firstCate").on("click","a",function(){
    var id = $(this).data("id");
    $(this).parent().addClass("current").siblings().removeClass("current");
    // 右侧渲染
    $.ajax({
      type:"get",
      url:"/category/querySecondCategory",
      data:{id:id},
      dataType:"json",
      success:function(info){
        // console.log(info);
        $(".secondCate").html(template("secondTmp",info))
      }
    })
  })



})