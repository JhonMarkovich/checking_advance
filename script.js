(() => {
    'use strict';

    console.log('--- СНАЙПЕР ПЛЕЕРА ЗАПУЩЕН ---');

    // Функция, которая вешает стандартные события на найденный тег video
    const trackVideoElement = (video) => {
        if (video.dataset.tracked) return; // Чтобы не вешать слушатели повторно
        video.dataset.tracked = 'true';

        console.log('🎯 ХАНТЕР: Нашли HTML5 плеер на странице!', video);

        video.addEventListener('play', () => console.log('🔥 НАЧАЛОСЬ ВОСПРОИЗВЕДЕНИЕ (Браузер)'));
        video.addEventListener('pause', () => console.log('⏸️ ПАУЗА (Браузер)'));
        video.addEventListener('timeupdate', () => {
            console.log(`⏱️ ВРЕМЯ: ${Math.floor(video.currentTime)} сек. / из ${Math.floor(video.duration || 0)} сек.`);
        });
    };

    // Запускаем бесконечный жесткий мониторинг DOM-дерева каждые полсекунды
    setInterval(() => {
        // Ищем обычный тег video в основном документе
        const mainVideo = document.querySelector('video');
        if (mainVideo) trackVideoElement(mainVideo);

        // На случай, если балансер засунул плеер внутрь iframe
        document.querySelectorAll('iframe').forEach(iframe => {
            try {
                const iframeVideo = iframe.contentWindow.document.querySelector('video');
                if (iframeVideo) trackVideoElement(iframeVideo);
            } catch (e) {
                // Сюда падают ошибки CORS, если iframe загружен с абсолютно чужого домена
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
        });
    }, 500);
        })
    }
    
    if (window.Lampa) {
        startPlugin()
    } else {
        window.addEventListener('load', startPlugin)
    }
})()

})();


