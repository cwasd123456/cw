$(function(){
    getInit(function(data){
        $('.tt_left').find('ul').html(template('firstCategory',data))
        getContent({id:data.rows[0].id},function(data){
            $('.tt_right').find('ul').html(template('secondCategory',data))
        })
    })
    $('.tt_left').on('tap','ul li',function(){
        $('.tt_left').find('li').removeClass('now')
        $(this).addClass('now')
        getContent({id:$(this).data('id')},function(data){
            $('.tt_right').find('ul').html(template('secondCategory',data))
        })
    })

})



var getInit = function(callback){
    $.ajax({
        url: '/category/queryTopCategory',
        type: 'get',
        data: {},
        dataType: 'json',
        success: function(data){
            callback && callback(data)
        }
    })
}

var getContent = function(param,callback){
    $.ajax({
        type: 'get',
        url: '/category/querySecondCategory',
        data: param,
        dataType: 'json',
        success: function(data){
            callback && callback(data)
        }
    })
}