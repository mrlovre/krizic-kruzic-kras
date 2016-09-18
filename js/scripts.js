var socket;

var init = function () {
    socket = io();
    $('#game button').each(function () {
        var c = $(this).attr('id')[1];
        $(this).on('click', function () {
            socket.emit('play', { field: c, playar: playar });
        });
    });
    socket.on('play-confirmed', function (msg) {
        var b = $('#f' + msg.field);
        if (msg.playar === window.playar) {
            b.addClass('btn-success');
        } else {
            b.addClass('btn-danger');
        }
    });
}

var enterName = function () {
    var playar = $('#playar-input').val();
    if (!playar) {
        return false;
    }
    window.playar = playar;
    $('#playar').hide();
    $('#game').fadeTo('slow', 1);
}

var playarChange = function () {
    var playar = $('#playar-input').val();
    if (!playar) {
        $('#btn-gaw').addClass('disabled')
    } else {
        $('#btn-gaw').removeClass('disabled');
    }
}
