(() => {
    'use strict'

    const startPlugin = () => {
        Lampa.Listener.follow('app', (e) => {
            
            // Ждем полной готовности Lampa. Раньше этого момента Player не существует!
            if (e.type == 'ready') {
                console.log('ПЛАГИН ЗАПУЩЕН И ГОТОВ')

                // Проверяем наличие глобального плеера
                if (window.Lampa.Player && window.Lampa.Player.listener) {
                    console.log('Слушатель плеера успешно подключен!')
                    
                    window.Lampa.Player.listener.follow('view', (event) => {
                        console.log('ГЛОБАЛЬНЫЙ ПЛЕЕР СОБЫТИЕ (тип):', event.type)
                        console.log('ДАННЫЕ СОБЫТИЯ:', event)
                    })
                } else {
                    console.log('Ошибка: window.Lampa.Player не найден.');
                }
            }
        })
    }
    
    if (window.Lampa) {
        startPlugin()
    } else {
        window.addEventListener('load', startPlugin)
    }
})()
