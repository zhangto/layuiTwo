var socket = io("ws://localhost:3000/person");
layui.use('element', function(){
    var element = layui.element;

    //…
});
layui.use(["jquery","form"],function () {
    var $=layui.jquery;
    var form = layui.form;
    var prov = $('#prov');
    var city=$("#city");
    var country = $('#country');
    // var city=document.getElementById("city");
    /*用于保存当前所选的省市区*/
    var current = {
        prov: '',
        city: '',
        country: ''
    };
    /*自动加载省份列表*/
    $(function showProv() {
        var len = provice.length;
        for (var i = 0; i < len; i++) {
            var provOpt = document.createElement('option');
            provOpt.innerText = provice[i].name;
            provOpt.value = i;
            prov.append(provOpt);
            form.render('select');
        }
    });
    /*根据所选的省份来显示城市列表*/
    // $(function () {
    //
    // });
    form.on('select(prov)',function (obj) {

        var val = obj.value;
        if (val !== current.prov) {
            current.prov = val;
        }
        if (val !== null) {
            city.length = 1;
            var cityLen = provice[val]["city"].length;
            for (var j = 0; j < cityLen; j++) {
                var cityOpt = document.createElement('option');
                //cityOpt.innerHTML="<option value='${j}'>你好</option>"
                cityOpt.innerText = provice[val]["city"][j].name;
                cityOpt.value = j;
                city.append(cityOpt);
                form.render('select');
            }
        }
    });

    form.on('select(city)',function (obj) {
        var val = obj.value;
        current.city = val;
        if (val != null) {
            country.length = 1; //清空之前的内容只留第一个默认选项
            var countryLen = provice[current.prov]["city"][val].districtAndCounty.length;
            for (var n = 0; n < countryLen; n++) {
                var countryOpt = document.createElement('option');
                countryOpt.innerText = provice[current.prov]["city"][val].districtAndCounty[n];
                countryOpt.value = n;
                country.append(countryOpt);
                form.render('select');
            }
        }
    });
    form.on('submit(team)',function (data) {
        console.log(data.field);
        socket.emit("form",data.field);
        return false;
    });
});
layui.use('laydate', function(){
    var laydate = layui.laydate;

    //执行一个laydate实例
    laydate.render({
        elem: '#time' //指定元素
    });
});
