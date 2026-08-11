(() => {
    'use strict';

    const startPlugin = () => {
        // Слушаем изменения экранов приложения
        Lampa.Listener.follow('activity', (e) => {
            
            // Проверяем, что открылся экран плеера (даже если это iFrame балансера)
            if (e.type === 'start' && e.component === 'player') {
                console.log('🔥 УРА! ОБНАРУЖЕН ЗАПУСК ВИДЕО (Экран плеера открыт):', e);
                
                // Проверяем, передал ли плагин балансера объект плеера
                if (e.object && e.object.listener) {
                    console.log('Найден внутренний слушатель этого плеера, подписываемся...');
                    
                    e.object.listener.follow('view', (event) => {
                        console.log('👉 СОБЫТИЕ СУБ-ПЛЕЕРА:', event.type, event);
                    });
                } else {
                    console.log('⚠️ Внимание: Видео запущено в изолированном iFrame. Прямые события timeupdate/play недоступны через API Lampa.');
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

