var data = [
    {
        pcUrl:"images/slide_01_2000x410.jpg",
        mUrl:"images/slide_01_640x340.jpg"
    },
    {
        pcUrl:"images/slide_01_2000x410.jpg",
        mUrl:"images/slide_01_640x340.jpg"
    },
    {
        pcUrl:"images/slide_02_2000x410.jpg",
        mUrl:"images/slide_02_640x340.jpg"
    },
    {
        pcUrl:"images/slide_03_2000x410.jpg",
        mUrl:"images/slide_03_640x340.jpg"
    },
    {
        pcUrl:"images/slide_04_2000x410.jpg",
        mUrl:"images/slide_04_640x340.jpg"
    }
]
$(function(){
    $(window).on('resize',function(){
        banner()
    }).trigger('resize')
})
var banner = function(){

    var isM = $(window).width() < 768 ? true : false

    var htmlDian = template('dian',{list:data})

    var htmlImage = template('imageT',{list:data,isM:isM})
    $('.carousel-indicators').html(htmlDian)
    $('.carousel-inner').html(htmlImage)

}