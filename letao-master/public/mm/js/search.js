$(function(){
    let hisData = getHistory()
    $('.tt_searchRecord').html(template('historyTpl',{list:hisData}))

    //点击搜索按钮
    $('.form_group').on('tap','button',function(){
        let val = $('.form_group input').val()
        if(val == ''){
            mui.toast('请输入关键字');
            return
        }
        let hisData = getHistory()
        //判断是否存在于 存储中
        let has = false
        let index
        for(let i = 0; i < hisData.length; ++i){
            if(hisData[i] == val){
                index = i
                has = true
                break
            }
        }
        if(has){
            hisData.splice(index,1)
            hisData.push(val)
        }else{
            if(hisData.length < 10){
                hisData.push(val)
            }else{
                hisData.shift()
                hisData.push(val)
            }
        }
        //重新存储
        localStorage.setItem('tt_history',JSON.stringify(hisData))
        //跳转到搜索列表
        location.href = 'searchList.html?key='+val;
    })
    //清空历史
    $('.tt_searchRecord').on('tap','.fa',function(){
        localStorage.setItem('tt_history','')
        $('.tt_searchRecord').html(template('historyTpl',{list:[]}))
    })
    //删除
    $('.tt_searchRecord').on('tap','.mui-icon',function(){
        let data = JSON.parse(localStorage.getItem('tt_history'))
        let index = $(this).data('index')
        data.splice(index,1)
        localStorage.setItem('tt_history',JSON.stringify(data))
        $('.tt_searchRecord').html(template('historyTpl',{list:data}))
    })
})

var getHistory = function(){
    let data = localStorage.getItem('tt_history') || '[]'
    data = JSON.parse(data)
    return data
}