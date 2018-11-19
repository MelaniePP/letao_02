$(function(){
  var currentPage = 1;
  var size = 3;
  var picArr = [];
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

        // 添加分页标签
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion:3,
          totalPages:Math.ceil(info.total/info.size),
          currentPage:info.page,
          onPageClicked:function(a,b,c,page){
            currentPage = page;
            render();
          }
        })
      }
    })
  }

  $(".addPro").on("click",function(){
    $("#addModal").modal("show");
    // 动态渲染下拉菜单
    $.ajax({
      type:"get",
      url:"/category/querySecondCategoryPaging",
      data:{
        page:1,
        pageSize:100
      },
      dataType:"json",
      success:function(info){
        console.log(info);
        $(".dropdown-menu").html(template("downtmp",info));
      }
    })
  });

  // 给下拉菜单通过事件委托注册事件
  $(".dropdown-menu").on("click","a",function(){
    var txt = $(this).text();
    $(".text").text(txt);
    var id = $(this).data("id");
    $('[name="brandId"]').val(id);
  })

  // 文件初始化
  $("#fileupload").fileupload({
    dataType:"json",
    done:function(e,data){
      console.log(data);
      var res = data.result;
      var picUrl = res.picAddr;
      // 往数组最前面追加
      picArr.unshift(res);
      console.log(picArr);
      // 结构上
      $(".imgBox").prepend('<img src="'+picUrl+'" alt="" style="height: 100px">')

      // 如果超过三个，就从后面删除一个
      if(picArr.length>3){
        picArr.pop();
        $(".imgBox img:last-of-type").remove();
      }

      // 如果选择了三张图片更改校验状态
      if(picArr.length==3){
        $('#form').data("bootstrapValidator").updateStatus("picStatus","VALID")
      }
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
      brandId:{
        validators:{
          notEmpty:{
            message:"请选择二级分类"
          }
        }
      },
      proName:{
        validators:{
          notEmpty:{
            message:"请输入商品名称"
          }
        }
      },
      proDesc:{
        validators:{
          notEmpty:{
            message:"请输入商品描述"
          }
        }
      },
      size:{
        validators:{
          notEmpty:{
            message:"请输入尺码"
          },
          regexp:{
            regexp:/^\d{2}-\d{2}$/,
            message:"必须是 xx-xx 的格式, xx两位数字"
          }
        }
      },
      num:{
        validators:{
          notEmpty:{
            message:"请输入商品库存数量"
          },
          regexp:{
            regexp:/^[1-9]\d*$/,
            message:"请输入非零开头的数字"
          }
        }
      },
      oldPrice:{
        validators:{
          notEmpty:{
            message:"请输入商品原价"
          }
        }
      },
      price:{
        validators:{
          notEmpty:{
            message:"请输入商品现价"
          }
        }
      },
      picStatus:{
        validators:{
          notEmpty:{
            message:"请上传3张图片"
          }
        }
      },
    }
  });
/////
  // 表单 /校验成功后事件
  $("#form").on("success.form.bv",function(e){
     e.preventDefault();
     var dataStr = $("#form").serialize();
     console.log(picArr);
    dataStr += '&picName1='+picArr[0].picName+'&picAddr1'+picArr[0].picAddr;
    dataStr += '&picName2='+picArr[1].picName+'&picAddr2'+picArr[1].picAddr;
    dataStr += '&picName3='+picArr[2].picName+'&picAddr3'+picArr[2].picAddr;
    

    $.ajax({
      type:"post",
      url:"/product/addProduct",
      data:dataStr,
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          currentPage = 1;
          render();
          $("#addModal").modal("hide");
        }
      }
    })
  })





})