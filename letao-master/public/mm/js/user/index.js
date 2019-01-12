
$(function(){
    let verder = function(){
        getUserData(function(data){
            $('.tt_warp').html(template('content',data))
        })
    }
    verder()
    $('.tt_warp').on('tap','.tt_out .mui-block',function(){
        $.ajax({
            type:'get',
            url:'/user/logout',
            data:'',
            dataType:'json',
            success:function(data){
                if(data.success){
                    location.href = '/mm/user/login.html';
                }
            }
        });
    })
})
var getUserData = function(callback){
    tt.ajaxFilter({
        type:'get',
        url:'/user/queryUserMessage',
        data:'',
        dataType:'json',
        success:function(data){
            callback && callback(data);
        }
    })
}