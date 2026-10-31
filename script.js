(() => {
    'use strict'

    console.log('Плеер запущен')

    let password_user = ""
    let login_user = ""

    const setLogin = (login) => {
        login_user = login
    }
    const setPassword = (password) => {
        password_user = password
    }

    document.body.innerHTML = `
        <div style="margin-left: 30vw; width: 500px; height: 200px; display: flex; flex-direction: column; 
        align-items: center; justify-content: center; background-color: white;">
            <div>
                <span style="font-size: 18px; color: blue;">Input your account data for synchronized progress</span>
            </div>

            <input placeholder="Input login of your Cinaureol account" required type="text" id="name" name="name" onKeyDown={async(e) => {
        if(e.key == 'Enter'){
            await setLogin(e)
            console.log("Login e: ", e)
        }
            }}/>

            <input placeholder="Input password of your Cinaureol account" required type="password" id="name2" name="name2" onKeyDown={async(e) => {
        if(e.key == 'Enter'){
            await setPassword(e)
            console.log("Password e: ", e)
        }
            }}/>

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
