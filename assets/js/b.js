var header = {
    "x-bmob-application-id": appId,
    "x-bmob-rest-api-key": apiKey,
    "content-type": "application/json",
    "cache-control": "no-cache",
}
function login(username, password) {
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": loginUrl + '?username=' + username + '&password=' + md5(password),
        "method": "GET",
        "headers": header,
        success: function (res) {
            $.cookie('sessionToken', res.sessionToken);
            $.cookie('objectId', res.objectId);
            $.cookie('username', username);
            location.href = 'index.html';
        },
        error: function (res) {
            layer.msg('用户名或密码错误！', { icon: 7 });
        }
    }

    $.ajax(settings);
}

function checkUserStatus() {
    var sessionToken = $.cookie('sessionToken');
    var objectId = $.cookie('objectId');
    if (!sessionToken || !objectId || sessionToken == '' || objectId == '') {
        location.href = 'login.html';
    }
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": checkSessionUrl + objectId,
        "method": "GET",
        "headers": $.extend(header, { "X-Bmob-Session-Token": sessionToken }),
        success: function (res) {
            if (res.msg == 'fail') {
                layer.msg('登录超时，请重新登录!', { icon: 7, time: 3000 });
                location.href = 'login.html';
            }
        },
        error: function (res) {
            location.href = "login.html";
        }
    }

    $.ajax(settings);
}

function getData(topicId, callBack) {
    var username = $.cookie('username');
    var queryParam = {
        username: username,
        topic_id: topicId
    }
    var url = encodeURI("https://api2.bmob.cn/1/classes/data?where=" + JSON.stringify(queryParam));
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": header,
        success: function (res) {
            if (callBack) {
                callBack(res);
            }
        },
        error: function (res) {

        }
    }

    $.ajax(settings);
}

function submitData(topicId, topicAnswer, callback) {
    var username = $.cookie('username');
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": submitUrl,
        data: JSON.stringify({ username: username, topic_id: topicId, topic_answer: topicAnswer }),
        "method": "POST",
        "headers": header,
        success: function (res) {

            if (callback) {
                callback(res.objectId);
                console.log(res.objectId);
            }
        },
        error: function (res) {

        }
    }

    $.ajax(settings);
}
function updateData(objectId, topicAnswer) {
    var username = $.cookie('username');
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": submitUrl + '/' + objectId,
        data: JSON.stringify({ topic_answer: topicAnswer }),
        "method": "PUT",
        "headers": header,
        success: function (res) {
        },
        error: function (res) {

        }
    }

    $.ajax(settings);
}

function getTyping(callBack) {
    var username = $.cookie("username");
    var url = 'https://api2.bmob.cn/1/classes/tyeing?where=' + escape('{"username":"' + username + '"}');
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": url,
        "method": "GET",
        "headers": header,
        success: function (res) {
            if (callBack) {
                callBack(res);
            }
        },
        error: function (res) {

        }
    }

    $.ajax(settings);
}

function updateTyping(objectId, count) {
    var username = $.cookie('username');
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": typingUrl + '/' + objectId,
        data: JSON.stringify({ count: count }),
        "method": "PUT",
        "headers": header,
        success: function (res) {
        },
        error: function (res) {

        }
    }

    $.ajax(settings);
}

function addTyping(id, count, callBack) {
    var username = $.cookie('username');
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": typingUrl,
        data: JSON.stringify({ username: username, id: id, count: count }),
        "method": "POST",
        "headers": header,
        success: function (res) {
            if (callback) {
                callback(res.objectId);
            }
        },
        error: function (res) {

        }
    }

    $.ajax(settings);
}