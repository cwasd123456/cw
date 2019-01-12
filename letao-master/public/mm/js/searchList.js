$(function(){
    let key = tt.getUrlParams()['key'] || ''
    $('.form_group input').val(key)
    let currentPage = 1
    let pageSize = 10
    let verder = function(callback){
        let key = $.trim($('.form_group input').val())
        if(key == ''){
            mui.toast('请输入关键字')
            return
        }
        let type = $('[data-type].now').data('type')
        let value = $('[data-type].now').find('span').hasClass('fa-angle-down')? 2 : 1
        let order = {}
        if(type){
            order[type] = value
        }
        getPro($.extend({
            proName:key,
            page:currentPage,
            pageSize:pageSize
        },order),function(data){
            if(currentPage == 1){
                $('.tt_productList').html(template('productList',data))
            }else{
                $('.tt_productList').append(template('productList',data))
            }

        })
        callback && callback()
    }
    verder()

    $('.form_group').on('tap','button',function(){
        $('[data-type].now').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
        $('.tt_productList').html('<div class="loading"><span class="mui-icon mui-icon-spinner"></span></div>')
        currentPage = 1
        verder()
    })
    $('[data-type]').on('tap',function(){
        currentPage = 1
        let flag = $(this).hasClass('now')
        if(flag){
            if($(this).find('span').hasClass('fa-angle-down')){
                $(this).find('span').removeClass('fa-angle-down').addClass('fa-angle-up')
            }else{
                $(this).find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
            }
        }else{
            $('[data-type].now').removeClass('now').find('span').removeClass('fa-angle-up').addClass('fa-angle-down')
            $(this).addClass('now')
        }
        verder()
    })

    mui.init({
        pullRefresh : {
            container:".mui-scroll-wrapper",//下拉刷新容器标识，querySelector能定位的css选择器均可，比如：id、.class等
            down : {
                callback: function(){
                    let that = this
                    currentPage = 1
                    setTimeout(function(){
                        that.endPulldownToRefresh()
                    },1000)
                    verder()
                }
            },
            up: {
                callback: function(){
                    let that = this
                    ++currentPage
                    setTimeout(function(){
                        that.endPullupToRefresh()
                    },1000)
                    // ++currentPage
                    verder(function(){
                        //that.endPullupToRefresh();
                    })
                }
            }
        }
    })

})

var getPro = function(params,callback){
    $.ajax({
        type: 'get',
        url: '/product/queryProduct',
        data: params,
        dataType: 'json',
        success: function(data){
            setTimeout(function(){
                if(data.data.length == 0) mui.toast('没有相关商品')
                callback && callback(data)
            },1000)

        }
    })
}