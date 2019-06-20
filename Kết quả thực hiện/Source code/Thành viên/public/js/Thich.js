$('#like').click(function () {
    $.ajax({
        method: 'post',
        url: "/LuotThich/CapNhat",
        data: {
            idnguoidung: $('#idUser').val(),
            idbaidang: $('#idBaiDang').val()
        },
        success: async function (result) {
            $('#like').html(result.value + ' lượt thích <i class="lnr lnr-heart">').css('color',result.css);
        }
    });
});