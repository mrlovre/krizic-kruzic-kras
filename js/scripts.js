var socket;

// Inicijalizacija:
var init = function () {
    socket = io();

    // Inicijalizacija dirki:
    $('#game button').each(function () {
        var c = $(this).attr('id')[1];

        // Kad se klikne dirka:
        $(this).on('click', function () {
            socket.emit('play', { field: c, playar: playar });
        });
    });
    
    // Potvrda sa servera:
    socket.on('play-confirmed', function (msg) {
        var b = $('#f' + msg.field);
        // Igramo mi:
        if (msg.playar === window.playar) {
            b.addClass('btn-success');
        // Igra protivnik:
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

var resetGame = function() {
    socket.emit('reset-game');
}
