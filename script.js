(() => {
    'use strict' // эта подпись необходима для того чтобы скрипт работал на всех устройствах

    const startPlugin = () => {
            // Если еще не готова, ждем событие старта
            Lampa.Listener.follow('app', (e) => { // Lampa.Listener.follow используется как слушатель событий в объектах Lampa, 
                                                        // то есть тут мым слушаем 
                if (e.type == 'ready') {
                    console.log('ПЛАГИН ЗАПУЩЕН')
                    console.log('Объект window.Lampa:', window.Lampa)
                    console.log('Объект window: ', window)
                    console.log('event_app: ', e)
                }

                Lampa.Listener.follow('player', (event) => { // Listener для player объекта
                    console.log('event_player: ', event)
                })

            })   
        }
    
    // Запускаем плагин, когда скрипт загрузится в систему
    if (window.Lampa) {
        startPlugin()
    } else {
        window.addEventListener('load', startPlugin) // тут мы дожидаемся события 'load', то есть тогда когда загрузится приложение
    }
})()
