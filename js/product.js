$(function(){
  var currentPage = 1;
  var size = 5;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/product/queryProductDetailList",
      data:{
        page:currentPage,
        pageSize:size
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        $("tbody").html(template("productTmp",info));
      }
    })
  }




})