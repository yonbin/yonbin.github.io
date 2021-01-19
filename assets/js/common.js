var appId = 'de77da2103acf7ecce955e722973f672';
var apiKey = '462f9cd32b4b4667a30c133db861d467';
var checkSessionUrl = 'https://api2.bmob.cn/1/checkSession/';
var loginUrl = 'https://api2.bmob.cn/1/login';
var submitUrl = ' https://api2.bmob.cn/1/classes/data';
var typingUrl = ' https://api2.bmob.cn/1/classes/tyeing';
var typingCount = 20;


function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}
function getCurrentDate(date) {
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    var d = date.getDate();
    var h = date.getHours();
    var min = date.getMinutes();
    var s = date.getSeconds();
    var str = y + '年' + (m < 10 ? ('0' + m) : m) + '月' + (d < 10 ? ('0' + d) : d) + '日  ' + (h < 10 ? ('0' + h) : h) + ':' + (min < 10 ? ('0' + min) : min) + ':' + (s < 10 ? ('0' + s) : s);
    return str;
}