const level = require('strong-pass');

XacNhanMatKhau = function()
{
    const pass = $('#matkhau').val();
    const rePass = $('#matkhaunhaplai').val();
    if(pass!==rePass)
    {
        $('#CheckRePass').html('<font color="red"><small>Mật khẩu nhập lại không giống</small></font>');
    }else
    {
        $('#CheckRePass').html('');
    }
};

$('#matkhau').keyup(function () {
    let strongPass = level($('#matkhau').val(), { minLength: 8 });
    if(strongPass<=1) {
        $('#levelPass').html('<font color="red"><small>Mật khẩu rất yếu</small></font>');
    }else if(strongPass<=2)
    {
        $('#levelPass').html('<font color="orange"><small>Mật khẩu yếu</small></font>');
    }else if(strongPass<=3)
    {
        $('#levelPass').html('<font color="yellow"><small>Mật khẩu trung bình</small></font>');
    }else if(strongPass<=4)
    {
        $('#levelPass').html('<font color="green"><small>Mật khẩu mạnh</small></font>');
    }else
    {
        $('#levelPass').html('<font color="#006400"><small>Mật khẩu rất mạnh</small></font>');
    }
    XacNhanMatKhau();
});
$('#matkhaunhaplai').keyup(()=>{
    XacNhanMatKhau();
});

