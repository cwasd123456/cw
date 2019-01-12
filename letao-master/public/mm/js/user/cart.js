mui('.mui-scroll-wrapper').scroll({
    indicators:false
})
$(function(){
    let verder = function(){
        getCar(function(data){
            $('.mui-scroll').html(template('list',data))
        })
    }
    verder()
    $('.mui-scroll').on('change','input',function(){
        getSum()
    })
})
var getCar = function(callback){
    tt.ajaxFilter({
        type: 'get',
        url: '/cart/queryCartPaging',
        data: {
            page:1,
            pageSize:100
        },
        dataType: 'json',
        success: function(data){
            setTimeout(function(){
                callback && callback(data);
            },500);
        }
    })
}
var getSum = function(){
    let sum = 0
    $('input:checked').each(function () {
        let num = $(this).data('num')
        let price = $(this).data('price')
        sum += price * num
    })
    sum = Math.floor(sum*100)/100
    $('.tt_cartBom .mui-pull-left span').html(sum)
}