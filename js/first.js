$(function(){

  var currentPage = 1;
  var size = 5;
  render();
  function render(){

    $.ajax({
      type:"get",
      url:"/category/queryTopCategoryPaging",
      data:{
        page:currentPage,
        pageSize:size
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        $("tbody").html(template("tmp",info));
        // 分页
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          currentPage:info.page,
          totalPages:Math.ceil(info.total/info.size),
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  };

  $(".addBtn").on("click",function(){
    $("#addModal").modal("show");
  });

  // 表单校验
  $("#form").bootstrapValidator({
     //设置小图标
     feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
    fields:{
      categoryName:{
        validators:{
          notEmpty:{
            message:"请输入一级分类名"
          }
        }
      }
    }
  });
  // 注册表单校验成功事件
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      type:"post",
      url:"/category/addTopCategory",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        // console.log(info)
        if(info.success){
          // console.log("添加成功");
          // 隐藏模态框
          $("#addModal").modal("hide");
          render();

        }
        if(info.error){
          console.log("操作失败");
        }

      }
    })
  })



})