(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
var letters = "abcdefghijklmnopqrstuvwxyz";
var numbers = "01234567890";
var symbols = ")!@#$%^&*()";
var uLetters = letters.toUpperCase();

function getType(char){
    if(letters.indexOf(char) > -1){
        return "letter";
    }
    if(uLetters.indexOf(char) > -1){
        return "uLetter";
    }
    if(numbers.indexOf(char) > -1){
        return "number";
    }
    //if(symbols.indexOf(char) > -1){
        return "symbol";
    //}
}

function reverseStr(str){
    var result = "";
    for(var i = str.length - 1; i > -1; i--){
        result += str[i];
    }
    return result;
}

function calculateRepeatIncrement(password, index){
    var len = password.length;
    var increment = 0;
    for(var t = 0; t < len; t++){
        if(index !== t && password[index] === password[t]){
            increment += len/Math.abs(index - t);
        }
    }
    return increment;
}

function calculateSequence(password, str){
    var result = 0;
    var lPass = password.toLowerCase();
    var len = str.length - 3;

    for (var i=0; i < len; i++) {
        var forward = str.substring(i, i + 3);
        var reverse = reverseStr(forward);
        if (lPass.indexOf(forward) > -1 || lPass.indexOf(reverse) > -1) {
            result++;
        }
    }
    return result;
}

function strongPass(password, config){
    var score = 0;
    var len = password.length;
    var minLength = config && config.minLength || 8;

    var numULetter = 0,
        numLLetter = 0,
        numNumber = 0,
        numSymbol = 0,
        numMiddle = 0,
        lastULetter = -1,
        lastLLetter = -1,
        lastNumber = -1,
        lastSymbol = -1,
        numConsecLLetter = 0,
        numConsecULetter = 0,
        numConsecNumber = 0,
        numConsecSymbol = 0,
        numRepeat = 0,
        numRepeatChars = 0;


    for(var i = 0; i < len; i++){
        var type = getType(password[i]);

        if(type === 'letter'){
            if(lastLLetter > -1 && lastLLetter + 1 === i){
                numConsecLLetter++;
            }
            lastLLetter = i;
            numLLetter++;
        }
        if(type === 'uLetter'){
            if(lastULetter > -1 && lastULetter + 1 === i){
                numConsecULetter++;
            }
            lastULetter = i;
            numULetter++;
        }
        if(type === 'number'){
            if(lastNumber > -1 && lastNumber + 1 === i){
                numConsecNumber++;
            }
            lastNumber = i;
            numNumber++;
        }
        if(type === 'symbol'){
            if(lastSymbol > -1 && lastSymbol + 1 === i){
                numConsecSymbol++;
            }
            lastSymbol = i;
            numSymbol++;
        }
        if(i > 0 && i < len - 1 && ['number', 'symbol'].indexOf(type) > -1){
            numMiddle++;
        }

        var increment = calculateRepeatIncrement(password, i);
        if(increment){
            numRepeat += increment;
            numRepeatChars++;
            numRepeat = (len - numRepeatChars) ? Math.ceil(numRepeat/(len - numRepeatChars)) : Math.ceil(numRepeat);
        }
    }

    score += password.length * 4;

    if(numULetter > 0 && numULetter < len){
        score += (len - numULetter) * 2;
    }
    if(numLLetter > 0 && numLLetter < len){
        score += (len - numLLetter) * 2;
    }
    if(numNumber > 0 && numNumber < len){
        score += numNumber * 4;
    }

    score += numSymbol * 6;
    score += numMiddle * 2;

    if(numULetter + numLLetter > 0 && numNumber + numSymbol === 0){
        score -= len;
    }

    if(numNumber === len){
        score -= len;
    }

    score -= numRepeat;

    score -= numConsecULetter * 2;
    score -= numConsecLLetter * 2;
    score -= numConsecNumber * 2;

    score -= calculateSequence(password, letters) * 3;
    score -= calculateSequence(password, numbers) * 3;
    score -= calculateSequence(password, symbols) * 3;

    if(len > minLength){
        var requirements = numLLetter ? 1 : 0;
        requirements += numULetter ? 1 : 0;
        requirements += numNumber ? 1 : 0;
        requirements += numSymbol ? 1 : 0;

        if(requirements > 2){
            score += requirements * 2 + 2;
        }
    }

    if(score < 0){
        score = 0;
    } else if(score > 100){
        score = 100;
    }


    return score;
}

function toNumber(password, options){
    var number = strongPass(password, options);
    if(number === 100){
        number = 99;
    }
    return Math.floor((number + 20)/20);
}

function toMark(password, options){
    var number = toNumber(password, options);
    if(number === 1){
        return 'Very Weak';
    }
    if(number === 2){
        return 'Weak';
    }
    if(number === 3){
        return 'Good';
    }
    if(number === 4){
        return 'Strong';
    }
    if(number === 5){
        return 'Very Strong';
    }
}

toNumber.engine = strongPass;
toNumber.toMark = toMark;

module.exports = toNumber;
},{}],2:[function(require,module,exports){
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


},{"strong-pass":1}]},{},[2]);
