window.tt = {}

tt.getUrlParams = function(){
    let url = location.search
    let params = {}
    if(url.indexOf('?') == 0){
        url = url.substr(1)
        let arr = url.split('&')
        for(let i = 0; i < arr.length; ++i){
            let item = arr[i].split('=')
            params[item[0]] = item[1]
        }
    }
    return params
}
tt.ajaxFilter = function(opt){
    $.ajax({
        url: opt.url || location.pathname,
        type: opt.type || 'get',
        data: opt.data || {},
        dataType: opt.dataType || 'json',
        beforeSend: function(){
            opt.beforeSend && opt.beforeSend()
        },
        success: function(data){
            if(data.error == 400){
                location.href = '/mm/user/login.html?returnUrl='+location.href
            }else{
                opt.success && opt.success(data)
            }
        },
        error: function(){
            opt.error && opt.error()
        }
    })
}