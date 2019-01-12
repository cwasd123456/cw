mui('.mui-scroll-wrapper').scroll({
    indicators:false
})
// mui('.mui-slider').slider({
//     interval:4000
// });

$(function(){
    window.addCart = false
    let proParams = tt.getUrlParams()
    // console.log(proParams)
    // return
    let verder = function(){
        let proId = proParams.productId || ''
        getProductById({id:proId},function(data){
            $('.mui-scroll').html(template('productTpl',data))
            mui('.mui-slider').slider({
                interval:4000
            });
            mui('.mui-numbox').numbox()
        })
    }
    verder()
    $('.mui-scroll').on('tap','.tt_size span',function(){
        $('.tt_size span.now').removeClass('now')
        $(this).addClass('now')
    })
    $('.tt_bottom').on('tap','.mui-btn-danger',function(){

        if(window.addCart){
            return
        }
        let verify = {
            productId : proParams.productId,
            size : $('.tt_size span.now').html(),
            num : $('.mui-numbox-input').val()
        }
        if(!verify.productId){
            mui.toast('商品异常')
            return
        }
        if(!verify.size){
            mui.toast('请选择尺码')
            return
        }
        tt.ajaxFilter({
            type:'post',
            url:'/cart/addCart',
            data:verify,
            dataType:'json',
            beforeSend: function(){
                window.addCart = true
            },
            success: function(data){
                mui.confirm('加入购物车成功，去购物车看看？', '温馨提示', ['去看看','继续浏览'], function(e) {
                    if (e.index == 0) {
                        /*按了第一个按钮*/
                        location.href = 'user/cart.html';
                    } else {
                        /*按了其他按钮 暂时处理*/
                    }
                });
            },
            error: function(){
                mui.toast('网络繁忙！');
                window.addCart = false;
            }
        })
    })
})
var getProductById = function(params,callback){
    $.ajax({
        type: 'get',
        url: '/product/queryProductDetail',
        data: params,
        dataType: 'json',
        success: function(data){
            setTimeout(function(){
                callback && callback(data)
            },1000)
        }
    })
}