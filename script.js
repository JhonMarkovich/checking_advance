(() => {
    'use strict'

    console.log('--- СНАЙПЕР ПЛЕЕРА ЗАПУЩЕН ---')

    // Функция, которая вешает стандартные события на найденный тег video
    const trackVideoElement = (video) => {
        if (video.dataset.tracked) return // Чтобы не вешать слушатели повторно
        video.dataset.tracked = 'true'

        console.log('🎯 ХАНТЕР: Нашли HTML5 плеер на странице!', video)

        video.addEventListener('play', () => console.log('🔥 НАЧАЛОСЬ ВОСПРОИЗВЕДЕНИЕ (Браузер)'))
        video.addEventListener('pause', () => console.log('⏸️ ПАУЗА (Браузер)'))
        video.addEventListener('timeupdate', () => {
            console.log(`⏱️ ВРЕМЯ: ${Math.floor(video.currentTime)} сек. / из ${Math.floor(video.duration || 0)} сек.`)
        })
    }

    // Запускаем бесконечный жесткий мониторинг DOM-дерева каждые полсекунды
    setInterval(() => {
        // Ищем обычный тег video в основном документе
        const mainVideo = document.querySelector('video')
        if (mainVideo) trackVideoElement(mainVideo)

        // На случай, если балансер засунул плеер внутрь iframe
        document.querySelectorAll('iframe').forEach(iframe => {
            try {
                const iframeVideo = iframe.contentWindow.document.querySelector('video')
                if (iframeVideo) trackVideoElement(iframeVideo)
            } catch (e) {
                // Сюда падают ошибки CORS, если iframe загружен с абсолютно чужого домена
            }
        })
    }, 500)

})()
