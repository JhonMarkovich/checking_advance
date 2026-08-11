(() => {
    'use strict';

    const startPlugin = () => {
        console.log('Plugin initialized.');

        // Подключаемся к глобальному плееру на уровне ядра
        if (window.Lampa.Player && window.Lampa.Player.listener) {
            
            // Ловим момент старта, который у вас гарантированно сработал
            window.Lampa.Player.listener.follow('start', (event) => {
                console.log('🚀 ЛАМПА ПЛЕЕР ЗАПУСТИЛСЯ (Ядро):', event);

                // Как только плеер запустился, Lampa создает или обновляет экземпляр e.video или window.Lampa.Player.video
                // Вешаем слушатели на внутренние события Lampa через callback-функции плеера
                
                // Перехват начала воспроизведения
                window.Lampa.Player.listener.follow('play', () => {
                    console.log('🔥 ЛАМПА: Видео поехало (play)');
                });

                // Перехват паузы
                window.Lampa.Player.listener.follow('pause', () => {
                    console.log('⏸️ ЛАМПА: Пауза (pause)');
                });

                // Перехват обновления времени через встроенный метод прогресса Lampa
                window.Lampa.Player.listener.follow('timeupdate', (timeData) => {
                    console.log('⏱️ ЛАМПА ВРЕМЯ:', timeData);
                });
                
                // Перехват кастомных событий интерфейса видео
                if (window.Lampa.Player.video && window.Lampa.Player.video.listener) {
                    window.Lampa.Player.video.listener.follow('view', (vEvent) => {
                        console.log('🎬 СОБЫТИЕ ИНТЕРФЕЙСА ПЛЕЕРА:', vEvent.type);
                    });
                }
            });

            // Ловим закрытие плеера, чтобы вовремя очищать данные
            window.Lampa.Player.listener.follow('destroy', () => {
                console.log('⏹️ ЛАМПА ПЛЕЕР ЗАКРЫТ');
            });
        }
    };

    if (window.Lampa) {
        startPlugin();
    } else {
        window.addEventListener('load', startPlugin);
    }
})();



