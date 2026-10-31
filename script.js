(() => {
    'use strict'

    console.log('Плеер запущен')

    document.body.innerHTML = `
        <div style="width: 300px; height: 200px">
            <span style="font-size: 20px; color: green;">Hello!</span>
        </div>
    `

    const trackVideoElement = (video) => {
        if (video.dataset.tracked) return
        video.dataset.tracked = 'true'

        console.log('Нашли тег видео на странице: ', video)

        video.addEventListener('play', () => console.log('🚩 НАЧАЛОСЬ ВОСПРОИЗВЕДЕНИЕ'))
        video.addEventListener('pause', () => console.log('⏸️ ПАУЗА'))
        video.addEventListener('timeupdate', () => {
            console.log(`⏱️ ВРЕМЯ: ${Math.floor(video.currentTime)} сек. / из ${Math.floor(video.duration || 0)} сек.`)
        })
    }

    setInterval(() => {
        const mainVideo = document.querySelector('video')
        if (mainVideo) trackVideoElement(mainVideo)

        document.querySelectorAll('iframe').forEach(iframe => {
            try {
                const iframeVideo = iframe.contentWindow.document.querySelector('video')
                if (iframeVideo) trackVideoElement(iframeVideo)
            } catch (event) {
                console.log('EVENT в CATCH: ', event)
            }
        })
    }, 500)

})()
