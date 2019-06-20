const LuotThich = require('../models/LuotThich');

exports.CapNhat = async function (req, res,next) {
    const luotThich = await LuotThich.read(req.body.idnguoidung, req.body.idbaidang);
    if (req.isAuthenticated()) {
        if (luotThich) {
            await LuotThich.delete(req.body.idnguoidung, req.body.idbaidang);
            res.send({value:await LuotThich.readAll(),css:''});
        } else {
            await LuotThich.insert(req.body);
            res.send({value:await LuotThich.readAll(),css:'green'});
        }
    }
};