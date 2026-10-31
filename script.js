(() => {
    'use strict'

    console.log('Плеер запущен')

    let password_user = ""
    let login_user = ""

    const container = document.createElement('div')

    async function sendDataToServer() {
        try {
            const response = await fetch(
                'http://192.168.0.14:8000/auth/user/',
                {
                    method: 'POST',
                    mode: 'cors',
                    targetAddressSpace: 'local',
                    headers: {
                        'Content-Type' : 'application/json'
                    },
                    body: JSON.stringify({
                        login: login_user,
                        password: password_user
                    })
                })

            if (!response.ok){
                throw new Error(`HTTP error ${response.status}`)
            }

            const result = await response.json()

            console.log("Ответ сервера: ", result)

            return result
        }
        catch (error) {
            console.error("Ошибка отправки: ", error)
        }
    }

    const stopEvent = (event) => {
        event.stopPropagation()
    }

    [
    'keydown',
    'keyup',
    'keypress',
    'click',
    'mousedown',
    'mouseup',
    'pointerdown',
    'pointerup',
    'touchstart',
    'touchend'
].forEach((eventName) => {
    container.addEventListener(eventName, stopEvent)
})

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

            <button id="butt">Отправить</button>
    `
    document.body.appendChild(container)

    const loginInput = container.querySelector('#name')
    const passwordInput = container.querySelector('#name2')
    const loginButton = container.querySelector('#butt')

    loginInput.addEventListener('keydown', (event) => {
        login_user = event.target.value
        console.log("login_user: ", login_user)
    })
    passwordInput.addEventListener('keydown', (event) => {
        password_user = event.target.value
        console.log("password_user: ", password_user)
    })
    loginButton.addEventListener('click', sendDataToServer)

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
