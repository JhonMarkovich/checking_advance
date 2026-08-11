(() => {
    'use strict'

    const startPlugin = () => {
        // Слушаем главный канал Lampa
        Lampa.Listener.follow('app', (e) => {
            
            // Ловим момент, когда Lampa ИНИЦИАЛИЗИРУЕТ плеер для фильма
            if (e.type === 'player') {
                console.log('📦 Lampa создала объект плеера:', e)

                // Проверяем наличие встроенного слушателя в событии
                if (e.player && e.player.listener) {
                    
                    // Подписываемся на события именно ЭТОГО запущенного экземпляра
                    e.player.listener.follow('view', (event) => {
                        console.log('🎬 СОБЫТИЕ КАНАЛА LAMPA:', event.type)
                        console.log('Данные события:', event)
                    })
                    
                    console.log('✅ Успешно подписались на e.player.listener')
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


