(function () {
    'use strict'

    function startPlugin() {
        // Проверяем, готова ли Lampa к работе
        if (window.lampa_started) {
            console.log('Плагин Checking Advance успешно запущен!')
            console.log('Объект Lampa:', window.Lampa)
        } else {
            // Если еще не готова, ждем событие старта
            Lampa.Listener.follow('app', function (e) {
                if (e.type == 'ready') {
                    console.log('Плагин Checking Advance успешно запущен после старта приложения!')
                    console.log('Объект Lampa:', window.Lampa)
                }
            })
        }
    }

    // Запускаем плагин, когда скрипт загрузится в систему
    if (window.Lampa) {
        startPlugin()
    } else {
        window.addEventListener('load', startPlugin)
    }
})()
