(() => {
    'use strict';

    const startPlugin = () => {
        console.log('1. Плагин успешно загружен в память. Ждем событие ready...');

        Lampa.Listener.follow('app', (e) => {
            // Строго изолируем всё выполнение внутри ready!
            if (e.type === 'ready') {
                console.log('2. СИСТЕМА ГОТОВА (e.type == ready)');

                // Безопасная проверка: существует ли вообще плеер в данной сборке Lampa
                if (typeof window.Lampa !== 'undefined' && window.Lampa.Player) {
                    console.log('3. Объект Lampa.Player найден! Пробуем подписаться...');
                    
                    try {
                        window.Lampa.Player.listener.follow('view', (event) => {
                            console.log('🔥 СОБЫТИЕ ПЛЕЕРА:', event.type, event);
                        });
                        console.log('4. Подписка на "view" успешно оформлена!');
                    } catch (err) {
                        console.log('❌ Сбой при вызове follow:', err.message);
                    }

                } else {
                    console.log('❌ Ошибка: window.Lampa.Player отсутствует в window в момент ready!');
                }
            }
        });
    };

    if (window.Lampa) {
        startPlugin();
    } else {
        window.addEventListener('load', startPlugin);
    }
})();
