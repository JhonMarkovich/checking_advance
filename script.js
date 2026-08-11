(() => {
    'use strict';

    const startPlugin = () => {
        // Подключаемся к глобальному ядру событий Lampa через канал 'full'
        // Этот канал гарантированно перехватывает инициализацию всех медиа-компонентов
        Lampa.Listener.follow('full', (e) => {
            
            // Если балансер или торрент-клиент успешно передал поток в плеер
            if (e.type === 'complite' || e.type === 'start') {
                console.log('📦 КАНАЛ FULL: Медиа-поток инициирован:', e);
            }
        });

        // Прямое и гарантированное подключение к шине таймлайна Lampa
        // Она срабатывает ВСЕГДА, когда плеер Lampa (или плагин над ним) начинает отсчет секунд фильма
        if (window.Lampa.Timeline && window.Lampa.Timeline.listener) {
            window.Lampa.Timeline.listener.follow('update', (event) => {
                console.log('🎬 ЛАМПА ТАЙМЛАЙН (Фильм идет):', event);
                // Здесь будут доступны: event.data.time, event.data.duration, event.data.hash
            });
            console.log('✅ Глобальный таймлайн Lampa успешно взят на мушку!');
        }

        // Запасной перехватчик: инициализация самого плеера на уровне ядра
        if (window.Lampa.Player && window.Lampa.Player.listener) {
            window.Lampa.Player.listener.follow('start', (event) => {
                console.log('🚀 ЛАМПА ПЛЕЕР ЗАПУСТИЛСЯ (Ядро):', event);
            });
            
            window.Lampa.Player.listener.follow('destroy', () => {
                console.log('⏹️ ЛАМПА ПЛЕЕР ЗАКРЫТ');
            });
        }
    };

    // Корректный запуск плагина
    if (window.Lampa) {
        startPlugin();
    } else {
        window.addEventListener('load', startPlugin);
    }
})();



