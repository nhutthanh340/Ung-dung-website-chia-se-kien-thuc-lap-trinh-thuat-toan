let time=0;
$('#tendangnhap').keydown(function () {
    clearTimeout(time);
    setTimeout(function () {
        $.ajax({
            method: 'post',
            url: '/checkUserName',
            data: {
                tendangnhap: $('#tendangnhap').val()
            },
            success: function (result) {
                if (result) {
                    $('#checkUserNameValid').html('<font color="green"><small >Bạn có thể sử dụng tên đăng nhập này</small></font>');
                } else {
                    $('#checkUserNameValid').html('<font color="red"><small >Tên đăng nhập đã tồn tại</small></font>');
                }
            }
        });
    },500);
});
