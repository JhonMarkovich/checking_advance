(function () {
    'use strict'

    function startPlugin() {
            // Если еще не готова, ждем событие старта
            Lampa.Listener.follow('app', function (e) { // Lampa.Listener.follow используется как слушатель событий в объектах Lampa, 
                                                        // то есть тут мы слушаем что происходит во всём приложении
            if (e.type == 'ready') {
                console.log('ПЛАГИН ЗАПУЩЕН')
                console.log('Объект window.Lampa:', window.Lampa)
                console.log('Объект window: ', window)
                console.log('event: ', e)
            }})
        }
    }

    // Запускаем плагин, когда скрипт загрузится в систему
    if (window.Lampa) {
        startPlugin()
    } else {
        window.addEventListener('load', startPlugin) // тут мы дожидаемся события 'load', то есть тогда когда загрузится приложение
    }
})()
