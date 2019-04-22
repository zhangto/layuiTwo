layui.define(['element','carousel'],function (exports) {
    var element = layui.element;
    var carousel = layui.carousel;
    var $=layui.jquery;
    //侧边导航栏
    $("#cebian").focus(function () {
        $("#daohanlan")[0].style.display="block";
    });
    $("#cebian").blur(function () {
        $("#daohanlan")[0].style.display="none";
    });
    //轮播图
    carousel.render({
        elem: '#lunbo'
        , width: '100%' //设置容器宽度
        , arrow: 'always' //始终显示箭头
    });
    exports('index',{});
});