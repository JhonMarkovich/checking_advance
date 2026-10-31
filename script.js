(() => {
    'use strict'

    console.log('Плеер запущен')

    let password_user = ""
    let login_user = ""

    const container = document.createElement('div')

    container.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 500px;
        padding: 25px;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 15px;
        background: white;
        z-index: 999999;
        border-radius: 10px;
    `

    container.innerHTML = `
            <span style="font-size: 18px; color: blue;">Input your account data for progress</span>

            <input placeholder="Input login of your Cinaureol account" required type="text" id="name"/>

            <input placeholder="Input password of your Cinaureol account" required type="password" id="name2"/>
    `
    document.body.appendChild(container)

    const loginInput = document.querySelector('#name')
    const passwordInput = document.querySelector('#name2')

    loginInput.addEventListener('keydown', (event) => {
        login_user = event.target.value
        console.log("login_user: ", login_user)
    }
    passwordInput.addEventListener('keydown', (event) => {
        password_user = event.target.value
        console.log("password_user: ", password_user)
    }

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
