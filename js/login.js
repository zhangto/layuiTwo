var socket = io("ws://localhost:3001/member");
layui.use('form',function () {
    var $=layui.jquery;
    var yan;
    $(function () {
        var code;
        function createCode() {
            code='';
            var codeLength=5;
            var codeV=$("#code");
            var ran=new Array(0,1,2,3,4,5,6,7,8,9);
            for (var i=0;i<codeLength;i++){
                var index=Math.floor(Math.random()*10);
                code+=ran[index];
            }
            $("#code").val(code);
            yan=code;
        }
        $("#code").click(function () {
            createCode();
        });
        $("#verification").focus(function () {
            createCode();
        });
    });
    var form = layui.form;

    form.on("submit(go)",function(data){
        console.log(data.field);
        socket.emit('message', data.field);
        socket.on("success",function (res) {
            alert(res);
        });
        return false;
    });
    form.verify({
        username: function(value, item){ //value：表单的值、item：表单的DOM对象
            if (value===''||value===null||value===undefined){
                return '用户名不能为空'
            }
            if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(value)){
                return '用户名不能有特殊字符';
            }
            if(/^\d+\d+\d$/.test(value)){
                return '用户名不能全为数字';
            }
        }

        //我们既支持上述函数式的方式，也支持下述数组的形式
        //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
        ,pass: function(value,item) {
            if(/^\d+\d+\d$/.test(value)){
                return '密码不能全为数字';
            }
            if (value === '' || value === null || value === undefined) {
                return '密码框不能为空'
            }
        }
        ,verification:function (value,item) {
            if (value===''||value===null||value===undefined){
                return '验证码不能为空'
            }
            if(value!==yan){
                return '验证码不正确'
            }
        }
    });
    function success() {
        socket.on("success", function (res) {
            alert(res);
        })
    }
});