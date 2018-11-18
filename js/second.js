$(function(){

  var currentPage = 1;
  var size = 5;
  render();
  function render(){
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:currentPage,
        pageSize:size
      },
      dataType:"json",
      success:function(info){
        // console.log(info);
        $("tbody").html(template("secondtmp",info));
        // 分页
      

        $('#paginator').bootstrapPaginator({
          bootstrapMajorVersion: 3, // 版本号
          totalPages: Math.ceil( info.total / info.size ),
          currentPage: info.page,
          onPageClicked: function( a, b, c, page ) {
            // 更新当前页
            currentPage = page;
            // 重新渲染
            render();
          }
        })


      }
    })
  };

  $(".addBtn").on("click",function(){
  $("#addModal").modal("show");
  // 渲染下拉菜单
  $.ajax({
    type:"get",
    url:"/category/queryTopCategoryPaging",
    data:{
      page:1,
      pageSize:100
    },
    dataType:"json",
    success:function(info){
      // console.log(info);
      $(".dropdown-menu").html(template("downtmp",info));
      
    }
  })
});

// 给下拉菜单的a注册点击事件,事件委托
$(".dropdown-menu").on("click","a",function(){
  var txt = $(this).text();
  var id = $(this).data("id");
  $(".text").text(txt);
  $('[name="categoryId"]').val(id);
  $('[name="categoryId"]').trigger("input");
})


// 文件初始化
$("#fileupload").fileupload({
  dataType:"json",
  done:function(e,data){
    // console.log(data);
    var res = data.result;
    var url = res.picAddr;
    $("#imgBox img").attr("src",url);
    $('[name="brandLogo"]').val(url);
    $('[name="brandLogo"]').trigger("input");
  }
});

// 表单校验
$("#form").bootstrapValidator({
  excluded:[],
  //2. 指定校验时的图标显示，默认是bootstrap风格
  feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  fields:{
    categoryId:{
      validators:{
        notEmpty:{
          message:"请选择一级分类"
        }
      }
    },
    brandName:{
      validators:{
        notEmpty:{
          message:"请选择一级分类"
        }
      }
    },
    brandLogo:{
      validators:{
        notEmpty:{
          message:"请上传图片"
        }
      }
    },
  }
})

// 表单校验成功后事件
$("#form").on("success.form.bv",function(e){
  e.preventDefault();
  $.ajax({
    type:"post",
    url:"/category/addSecondCategory",
    data:$("#form").serialize(),
    dataType:"json",
    success:function(info){
      // console.log(info);
      if(info.success){
        $("#addModal").modal("hide");
        currentPage = 1;
        render();
        // 重置表单
        $("#form").data("bootstrapValidator").resetForm(true);
        // 一级分类和图片需要手动重置
        $('[name="categoryId"]').val("请输入一级分类");
        $("#imgBox img").attr("src","./images/default.png")
      }
    }
  })
})






})