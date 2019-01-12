
$(function(){
    window.logining = false


    $('.mui-button-row').on('tap','.mui-btn-primary',function(){
        if(window.logining){
            return
        }
        let data = {
            username: $('.mui-input-clear').val(),
            password: $('.mui-input-password').val()
        }

        getUser(data,function(data){
            if(data.success){
                if(location.search && location.search.indexOf('?returnUrl=') > -1){
                    var returnUrl = location.search.replace('?returnUrl=','');
                }else{
                    var returnUrl = '/mm/user/index.html'
                }
                location.href = returnUrl
            }else{
                mui.toast(data.message)
            }
            window.logining = false
        })
    })

})
var getUser  = function(params,callback){
    $.ajax({
        type: 'post',
        url: '/user/login',
        data: params,
        dataType: 'json',
        beforeSend: function(){
            window.logining = true
        },
        success: function(data){
            callback && callback(data)
        },
        error: function(){
            mui.toast("请求失败了！！！")
            window.logining = false
        }
    })
}