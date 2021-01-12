checkUserStatus();

var objectId;

var editor = ace.edit("editor");

function buttonEnable(value) {
    if (value === false) {
        $('#btnRun').attr('disabled', '');
        $('#btnRun').html('<span class="spinner-border" role="status" aria-hidden="true"></span><span class="sr-only">处理中…</span>')
    } else if (value === true) {
        $('#btnRun').removeAttr('disabled');
        $('#btnRun').html('编译并运行')
    }
}

function refreshMessage(text) {
    $('#toastIcon').removeClass();
    $('#stdout').removeClass('error-output text-danger');
    $('#compilerMessage').removeClass('alert-light alert-warning alert-danger alert-success');
    // compile success
    if (text === true) {
        $('#compilerMessage').addClass('alert-success').text('（编译成功）');
        $('#notify').children('.toast-body').text('成功编译并运行完毕。');
        $('#toastIcon').addClass('text-success');
        $('#notify').toast('show');
        return;
    }
    // not compiled yet
    if (text === false) {
        $('#compilerMessage').addClass('alert-light').text('（无）');
        return;
    }
    // compile error (warning)
    if (text.indexOf('error') != -1) {
        $('#compilerMessage').addClass('alert-danger').text(text);
        $('#notify').children('.toast-body').text('编译出现错误。');
        $('#toastIcon').addClass('text-danger');
        $('#notify').toast('show');
    } else {
        $('#compilerMessage').addClass('alert-warning').text(text);
        $('#notify').children('.toast-body').text('编译完成，但存在警告。');
        $('#toastIcon').addClass('text-warning');
        $('#notify').toast('show');
    }
}
function compile() {
    buttonEnable(false);
    const code = editor.getValue();
    const stdin = $('#stdin').val();
    const request = {
        code: code,
        stdin: stdin,
        options: `${$('#pedantic').val()},${$('#cppStandard').val()}`,
        compiler: 'gcc-10.1.0'
    }
    $.ajax({
        url: 'https://wandbox.org/api/compile.json',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(request),
        dataType: "json",
        success: result => {
            buttonEnable(true);
            $('#stdout').val(result.program_message);
            refreshMessage(true);
            if ('compiler_message' in result) {
                refreshMessage(result.compiler_message);
            }
            if ('program_error' in result) {
                $('#stdout').addClass('error-output text-danger');
            }
            if (!objectId) {
                submitData(id, code, function (objId) {
                    objectId = objId;
                });
            }else{
                updateData(objectId,code);
            }
        },
        error: xhr => {
            buttonEnable(true);
            alert('发送编译请求时出现错误，请重试。');
            refreshMessage(false);
        }
    });
    return false;
}

editor.setTheme("ace/theme/clouds");
editor.session.setMode("ace/mode/c_cpp");
editor.commands.addCommand({
    name: "myCommand",
    bindKey: { win: "Ctrl-Enter", mac: "Command-Enter" },
    exec: () => compile()
});
editor.focus();
$('[data-toggle="popover"]').popover();
const id = getQueryVariable("id");
if (id) {
    $.getJSON('/json/' + id + '.json', function (data) {
        $('#topic').text(data.topic);
        $('#desc').html(data.desc).find('code').parent().addClass('bg-light');
    })

    getData(id, function (res) {
        if (res.results && res.results.length > 0) {
            objectId = res.results[0].objectId;
            editor.setValue(res.results[0].topic_answer);
            editor.clearSelection();
        }
    });
}

function getQueryVariable(variable) {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == variable) { return pair[1]; }
    }
    return (false);
}