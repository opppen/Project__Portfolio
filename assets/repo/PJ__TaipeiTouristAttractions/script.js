; (function () {
    let apiDataOfZip = []   // API取得的所有區域名資訊
    let apiDataOfView = []  // API取得的所有區域景點資料
    let currentSelectionAreaName = '信義區' // 當前所選中的區域名
    let currentSelectionAreaViewData = [] // 當前選擇區域景點資料
    let currentSelectionAreaViewLimitOfPage = 9 // 每頁限制的景點顯示數量
    let currentPageNum = 1 // 當前的停留的頁面 console.log(typeof(currentPageNum))



    // const useLocalStorage  =  function (areaName, latestPage) {
    //     const userHistoryRecord = {
    //         areaName: areaName,
    //         latestPage: latestPage * 1
    //     }

    //     const getLocalStorage = JSON.parse(localStorage.getItem('userHistoryRecord'))
    //     const setLocalStorage = localStorage.setItem('userHistoryRecord', JSON.stringify(userHistoryRecord))

    //     if (areaName) {
    //         return setLocalStorage
    //     } else {
    //         return getLocalStorage
    //     }
    // }
    const getLocalStorage = function () {
        return JSON.parse(localStorage.getItem('userHistoryRecord'))
    }
    const setLocalStorage = function (areaName, latestPage) {
        const userHistoryRecord = {
            areaName: areaName,
            latestPage: Number(latestPage)
        }

        // 瀏覽器歷史紀錄
        history.pushState(JSON.stringify(userHistoryRecord), '', '')
        // LocalStorage紀錄
        localStorage.setItem('userHistoryRecord', JSON.stringify(userHistoryRecord))
    }

    const compareCurrentSelection = function () {
        let userHistoryRecord = getLocalStorage()

        if (userHistoryRecord) {
            console.log('GOOOD')
            currentSelectionAreaName = userHistoryRecord.areaName
            currentPageNum = userHistoryRecord.latestPage
        }
    }
    const goToDesignatedPosition = function (elementClassName) {
        document.querySelector(elementClassName).scrollIntoView() // 滑到指定的座標位置
    }

    const splitTextIntoSpans = function (selector) {
        const element = document.querySelector(selector)
        if (element) {
            let text = element.innerText
            let splitText = text.split('').map((char) => {
                return `<span>${char}</span>`
            }).join('')
            element.innerHTML = splitText
        }
    }

    const animateStartLoader = function () {
        let counterElement = document.querySelector('.counter p')
        let currentValue = 0

        const animateBgImg = function () {

            gsap.to('.img__holder img', {
                left: 0,
                stagger: 0.1,
                ease: 'power4.out',
                duration: 1.5,
                delay: 4,
            })

            gsap.to('.img__holder img', {
                left: '110%',
                stagger: -0.1,
                ease: 'power4.out',
                duration: 1.5,
                delay: 7,
            })

        }

        const animateText = function () {

            setTimeout(() => {

                gsap.to('.counter p span', {
                    top: '-400px',
                    stagger: 0.1,
                    ease: 'power3.inOut',
                    duration: 1,
                })

                gsap.to('.slogan p span', {
                    top: '0',
                    stagger: 0.1,
                    ease: 'power3.inOut',
                    duration: 1,
                })

                gsap.to('.slogan p span', {
                    top: '-400px',
                    stagger: 0.1,
                    ease: 'power3.inOut',
                    duration: 1,
                    delay: 3,
                })

                gsap.to('.loading__overlay', {
                    opacity: 0,
                    display: 'none',
                    ease: 'power3.inOut',
                    duration: 4,
                    delay: 4,
                })

                gsap.to('.hero__bg img', {
                    scale: 1.2,
                    ease: 'power3.inOut',
                    duration: 3,
                    delay: 3.5,
                })

                gsap.to('body', {
                    overflow: 'unset',
                    // scrollTop: 0, --> 這樣寫好像不對?
                    delay: 5,
                })

                gsap.to('.hero__info .title span', {
                    top: 0,
                    stagger: 0.13,
                    ease: 'power3.out',
                    duration: 1.8,
                    delay: 6,
                })

                gsap.to('.hero__info .wrap', {
                    top: '0',
                    ease: 'power3.out',
                    duration: 3,
                    delay: 7.5,
                })

                gsap.to('nav', {
                    top: 0,
                    ease: 'power3.inOut',
                    duration: 3,
                    delay: 4,
                })

                gsap.to('.select__box', {
                    // bottom: '10%',
                    opacity: 1,
                    ease: 'power3.inOut',
                    duration: 2,
                    delay: 10,
                })

            }, 300)
        }

        const updateCounter = function () {
            if (currentValue === 100) {
                animateText()
                return
            }

            currentValue += Math.floor(Math.random() * 10) + 1
            currentValue = currentValue > 100 ? 100 : currentValue
            counterElement.innerHTML = currentValue.toString().split('').map((char) => {
                return `<span>${char}</span>`
            }).join('') + '<span>%</span>'

            let delay = Math.floor(Math.random() * 200) + 100

            setTimeout(updateCounter, delay)

            gsap.to('body', {
                overflow: 'hidden',
            })


            // window.document.body.scrollTop = 0
            // window.document.documentElement.scrollTop = 0
        }


        updateCounter()
        animateBgImg()
        setTimeout(() => window.scrollTo(0, 0), 150) // 自動回到最頂端
    }
    const removeElementClass = function (querySelectorElement, containClassName, removeClassName) {
        const getElements = document.querySelectorAll(querySelectorElement)

        document.querySelector('div').addEventListener('click', function (e) {    
            if (e.target.classList.value === containClassName) return

            if (getElements.length > 1) {
                getElements.forEach((item) => {
                    item.classList.remove(removeClassName)
                })
            } else {
                console.log('onlyone')
                const getElement = document.querySelector(querySelectorElement)
                getElement.classList.remove(removeClassName)
            }
        })


    }


    const updateCurrentTime = function () {
        const getTimeSetIntervalFUNC = useComponentNav() //getTime
        setInterval(getTimeSetIntervalFUNC, 1000)
    }
    const useComponentNav = function () {

        const getDate = function () {
            const nav__date__year = document.querySelector('.nav__date__year')
            const nav__date__month = document.querySelector('.nav__date__month')
            const nav__date__day = document.querySelector('.nav__date__day')

            const now = new Date()
            const nowYear = now.getFullYear()
            const nowMonth = now.getMonth() + 1
            const nowDay = now.getDate()

            nav__date__year.innerText = nowYear
            nav__date__month.innerText = nowMonth
            nav__date__day.innerText = nowDay
        }

        const getTime = function () {
            const nav__time__meridiem = document.querySelector('.nav__time__meridiem')
            const nav__time__hour = document.querySelector('.nav__time__hour')
            const nav__time__min = document.querySelector('.nav__time__min')

            const now = new Date()
            const nowHours = now.getHours() // 顯示為 0 ~ 24
            const nowMinutes = `0${now.getMinutes()}`.slice(-2)
            let limitNowHours = nowHours % 12 // 限制循環顯示為 0 ~ 12
            limitNowHours = limitNowHours !== 0 ? limitNowHours : 12 // the hour '0' should be '12'
            var hours = now.getHours() % 12 || 12;  // 12h instead of 24h, with 12 instead of 0.

            nav__time__meridiem.innerText = nowHours >= 12 ? 'PM' : 'AM'
            nav__time__hour.innerText = limitNowHours
            nav__time__min.innerText = nowMinutes
        }

        const getWeather = function () {
            const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?q=Taipei&appid=63182031553e9116554bca43215f571f&units=metric&lang=zh_tw'
            const oReq = new XMLHttpRequest()

            oReq.open('get', apiUrl, true)
            oReq.addEventListener('load', function () {
                const response = JSON.parse(this.responseText)
                console.log('getWeather', response)

                // 溫度顯示
                const showTemp = function () {
                    const nav__weather__temp = document.querySelector('.nav__weather__temp')
                    nav__weather__temp.innerText = Math.round(response.main.temp)
                }

                // 狀態描述顯示
                const showDescribe = function () {
                    const nav__weather__describe = document.querySelector('.nav__weather__describe')
                    nav__weather__describe.innerText = `${response.weather[0].description}`
                }

                // icon顯示
                const showWeatherIcon = function () {
                    const nav__weather__icon = document.querySelector('.nav__weather__icon')
                    let weatherIcon = response.weather[0].icon
                    let showIcon = null

                    if (weatherIcon === '01d' || weatherIcon === '01n') {
                        showIcon = 'clear_day'
                    } else if (weatherIcon === '02d' || weatherIcon === '02n') {
                        showIcon = 'partly_cloudy_day'
                    } else if (weatherIcon === '03d' || weatherIcon === '03n') {
                        showIcon = 'cloud'
                    } else if (weatherIcon === '04d' || weatherIcon === '04n') {
                        showIcon = 'cloud'
                    } else if (weatherIcon === '09d' || weatherIcon === '09n') {
                        showIcon = 'rainy_light'
                    } else if (weatherIcon === '10d' || weatherIcon === '10n') {
                        showIcon = 'rainy'
                    } else if (weatherIcon === '11d' || weatherIcon === '11n') {
                        showIcon = 'thunderstorm'
                    } else if (weatherIcon === '13d' || weatherIcon === '13n') {
                        showIcon = 'ac_unit'
                    } else {
                        showIcon = 'mist'
                    }


                    nav__weather__icon.innerText = showIcon
                }


                showTemp()
                showDescribe()
                showWeatherIcon()
            })
            oReq.send()
        }


        getTime()
        getDate()
        getWeather()
        return getTime
    }
    const useComponentModal = function () {

        const showViewDetails = function () {
            const renderCurrentSelectionAreaViewDataToModel = function (id) {
                const modal__dialog__wrap = document.querySelector('.modal__dialog__wrap')
                let modal__dialog__wrapHTMLCode = ''

                console.log('currentSelectionAreaName :', currentSelectionAreaName, '||', 'renderCurrentSelectionAreaModel', currentSelectionAreaViewData)


                currentSelectionAreaViewData.forEach((item) => {
                    if (id === item.dataNo) {

                        modal__dialog__wrapHTMLCode = `
                            <div class="modal__pic">
                                <img src="${item.dataPicSrc}" alt="${item.dataPicDesc}">
                            </div>
                            <div class="modal__content">
                                <div class="modal__header">
                                    <h1 class="modal__title">${item.dataTitle}</h1>
                                </div>
        
                                <div class="modal__body">
                                    <p class="modal__description customize-scrollbar">
                                        ${item.dataDesc}
                                    </p>
                                    <ul class="modal__category">
                                        <li class="modal__category__item">
                                            <span class="modal__category__name">地址</span>
                                            <p class="modal__category__content">${item.dataAddress}</p>
                                        </li>
                                        <li class="modal__category__item">
                                            <span class="modal__category__name">鄰近捷運站</span>
                                            <p class="modal__category__content">
                                                ${item.dataMRT}
                                            </p>
                                        </li>
                                        <li class="modal__category__item">
                                            <span class="modal__category__name">交通資訊</span>
                                            <p class="modal__category__content__traffic customize-scrollbar">
                                                ${item.dataInfo}
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        `

                    }
                })

                modal__dialog__wrap.innerHTML = modal__dialog__wrapHTMLCode
            }

            const areaCarasOfButtonViewDetails = document.querySelectorAll('.area .card .btn')
            areaCarasOfButtonViewDetails.forEach((button) => {
                button.addEventListener('click', function (event) {
                    // 開彈窗 => body新增'js--isModalShow'
                    window.document.body.classList.add('js--isModalShow')

                    // 抓取所點的卡片本身的ID當參數去要資料(id是設定在Button按鈕上)
                    id = event.target.getAttribute('data-id')
                    console.log('cardId', id)
                    // 透過id比對資料後顯示在頁面上
                    renderCurrentSelectionAreaViewDataToModel(id)
                })
            })
        }

        const modalButtonCloseHandler = function () {
            const buttonClose = document.querySelector('.modal .btn-close')
            buttonClose.addEventListener('click', function () {
                // 關彈窗 => body移除'js--isModalShow'
                window.document.body.classList.remove('js--isModalShow')
            })
        }

        showViewDetails() // 打開
        modalButtonCloseHandler() // 關閉
    }
    // useComponentSelect 需要
    const useComponentPagination = function () {
        let pagesTotal = Math.ceil(currentSelectionAreaViewData.length / currentSelectionAreaViewLimitOfPage) // 全部的景點可總共分成幾頁

        const activePaginationButton = function () {
            const paginationItems = document.querySelectorAll('.pagination-item')
            paginationItems.forEach((item) => {
                // 點擊每個分頁碼來獲取目前的位置數字來當參數＋重新渲染
                item.addEventListener('click', function (e) {
                    currentPageNum = Number(e.target.innerText)

                    setLocalStorage(currentSelectionAreaName, currentPageNum) // 儲存當前資料於 LocalStorage
                    renderPagination(currentPageNum)
                    renderCurrentSelectionAreaViewCardForPagination(currentPageNum)
                    goToDesignatedPosition('.area .content') // 滑到指定的座標位置
                    // window.scrollTo(0, 300)
                })
            })
        }

        const renderPagination = function (currentPageNum) {
            const pagination = document.querySelector('ul.pagination')
            let paginationHTML = '' // [NOTO] 寫在外面的話，重新執行renderPagination會往後加，變成要另外清空一次
            console.log(currentSelectionAreaName + 'pagesTotal可分成' + pagesTotal + '頁')
    
            for (let i = 0; i < pagesTotal; i++) {
                let pageNum = parseInt(i + 1)
                console.log(currentPageNum, pageNum)
                console.log(typeof (currentPageNum), typeof (pageNum))
                
                // [NOTE] 型別要注意!
                if (currentPageNum === pageNum) {
                    paginationHTML += `
                        <li class="pagination-item js--active">${pageNum}</li>
                    `
                } else {
                    paginationHTML += `
                        <li class="pagination-item">${pageNum}</li>
                    `
                }
            }
            pagination.innerHTML = paginationHTML
            activePaginationButton()
        }


        // 景點分頁有1頁以上才會有分頁碼產生
        if (pagesTotal > 1) {
            renderPagination(currentPageNum)
            console.log('pagesTotalpagesTotal',pagesTotal)
        }

    }
    const useComponentSelect = function () {
        const select__boxs = document.querySelectorAll('.select__box')
        const option__lists = document.querySelectorAll('.option__list')
        let optionListHTML = ''

        // 取得Zip資料後產生選單於畫面上
        const renderOptionList = function () {
            apiDataOfZip.forEach((item) => {
                let areaNameTw = item.districtTw
                let areaNameEn = item.districtEn
                let areaZip = item.zipcode
                optionListHTML = optionListHTML + `
                        <li class="option">
                            <input type="radio" class="radio" id="area${areaZip}" name="area" value="${areaZip}">
                            <label for="area${areaZip}">${areaNameTw}</label>
                        </li>
                    `
            })
        }
        renderOptionList()


        // 針對頁面上2組下拉選單個別進行業務(
        option__lists.forEach((option__list) => {

            // 針對”每一組選單“寫入內容＋顯示於頁面
            const renderOptionLists = function () {
                return option__list.innerHTML = optionListHTML
            }

            // 針對“每ㄧ組選單內“所有的項目處理業務
            const clickOption = function () {
                const itemOptions = option__list.querySelectorAll('li.option')
                itemOptions.forEach((option) => {
                    const clickHandler = function () {
                        // 執行選項觸發的class樣式
                        const activeOption = function () {
                            
                            // 先移除“所有” li.option 上的 js--active
                            itemOptions.forEach((itemOption) => {
                                itemOption.classList.remove('js--active')
                            })

                            // 再針對“當下點擊的” li.option 新增 js--active
                            option.classList.add('js--active') // [BUG] 只會針對點的那個新增，另外一組不會連動...
                            // 關閉下拉選單內容
                            removeElementClass('.select__box', 'selected__header', 'js--active')
                        }

                        // 選擇區域後執行的業務
                        const chooseSelectArea = function () {

                            const changeAreaName = function () {
                                const selected__headers = document.querySelectorAll('.selected__header')
                                let optionAreaName = option.querySelector('label').innerHTML
                                // 變更當前的地區名
                                currentSelectionAreaName = optionAreaName
                                // 只有第一組選單的標題內容文字不變動
                                selected__headers.forEach((selected__header, index) => {
                                    if (index !== 0) {
                                        selected__header.innerHTML = optionAreaName
                                    }
                                })

                                console.log('當前地區已修改: ', currentSelectionAreaName)
                                // 連動渲染頁面地區名稱
                                renderCurrentSelectionAreaInfo()
                            }

                            const resetCurrentSelectionArea = function () {
                                // currentSelectionAreaViewData = [] // 先清空上一筆的當前資料
                                currentPageNum = 1
                                updateCurrentSelectionAreaViewData() // 再更新當前資料
                                useComponentPagination() // 更新分頁狀態(回到第一頁)
                                setLocalStorage(currentSelectionAreaName, currentPageNum) // 儲存當前資料於LocalStorage
                            }


                            changeAreaName()  // 修改所選的名字
                            resetCurrentSelectionArea() // 重製更新
                            goToDesignatedPosition('.area .content') // 滑到指定的座標位置
                            // document.querySelector('.area .content').scrollIntoView()
                        }


                        chooseSelectArea()
                        activeOption()

                    }

                    option.addEventListener('click', clickHandler)
                })
            }

            renderOptionLists()
            clickOption()
        })

        // 針對每個選單標題進行的開關業務
        select__boxs.forEach((select__box) => {
            const selected__header = select__box.querySelector('.selected__header')
            selected__header.addEventListener('click', function () {
                select__box.classList.toggle('js--active')
            })
        })
    }
    const useComponentPagetop = function () {
        document.querySelector('.pagetop__button').addEventListener('click', function () {
            window.scrollTo(0, 0)
        })
    }
    const renderCurrentSelectionAreaInfo = function () {

        const area__info__subtitle = document.querySelector('.area__info__subtitle')
        const area__info__title = document.querySelector('.area__info__title')
        const area__info__zipCode = document.querySelector('.area__info__zip-code')

        apiDataOfZip.forEach((item) => {
            if (currentSelectionAreaName === item.districtTw) {
                area__info__subtitle.innerText = item.districtEn
                area__info__title.innerText = item.districtTw
                area__info__zipCode.innerText = item.zipcode
            }
        })
    }
    // 渲染當前選擇的資料於頁面景點卡片區(所有數量)
    const renderCurrentSelectionAreaViewCardForAll = function () {

        const card__list = document.querySelector('.area__view .card__list')
        let card__listHTMLCode = ''
        currentSelectionAreaViewData.forEach((item) => {
            card__listHTMLCode += `
                <li class="card">
                    <div class="card__img" >
                        <img src="${item.dataPicSrc}" alt="${item.dataPicDesc}">
                    </div>
                    
                    <div class="card__body">
                        <h5 class="card__title">
                            ${item.dataTitle}
                        </h5>
                        <p class="card__text">
                            <span class="material-symbols-outlined">schedule</span>
                            <span class="card__text_time">${item.dataOpenTime}</span>
                        </p>
                        <p class="card__text">
                            <span class="material-symbols-outlined">call</span>
                            <span class="card__text_tel">${item.dataTel}</span>
                        </p>
                        <p class="card__text">
                            <span class="material-symbols-outlined">location_on</span>
                            <span class="card__text_add">${item.dataAddress}</span>
                        </p>
                    </div>
                    <div class="card__footer">

                    <button type="button" class="btn" data-id="${item.dataNo}">
                        View Details
                    </button>
                    </div>

                    <div class="area__mark">
                        ${item.dataAreaName}
                    </div>
                </li>
            `
        })

        card__list.innerHTML = card__listHTMLCode
        useComponentModal() // 觸發彈跳視窗功能
    }
    // 渲染當前選擇的資料於頁面景點卡片區(分頁限制數量)
    const renderCurrentSelectionAreaViewCardForPagination = function (currentPageNum) {

        const card__list = document.querySelector('.area__view .card__list')
        let card__listHTMLCode = ''
        let pageStart = null
        let pageEnd = null

        // 每頁顯示 12 筆的範圍判斷
        if (currentPageNum === 1) {
            // 如果是第一頁
            pageStart = 0
            pageEnd = currentSelectionAreaViewLimitOfPage
        } else {
            pageStart = (currentPageNum * currentSelectionAreaViewLimitOfPage) - currentSelectionAreaViewLimitOfPage
            pageEnd = (pageStart + currentSelectionAreaViewLimitOfPage)
        }

        // 只跑指定範圍內的資料
        for (let i = pageStart; i < pageEnd; i++) {
            if (i === currentSelectionAreaViewData.length) {
                break
            } else {
                let item = currentSelectionAreaViewData[i]
                card__listHTMLCode += `
                <li class="card"  style="--card-sec: ${(i % currentSelectionAreaViewLimitOfPage + 1) * 0.3}s;">
                    <div class="card__img" >
                        <img src="${item.dataPicSrc}" alt="${item.dataPicDesc}">
                    </div>
                    
                    <div class="card__body">
                        <h5 class="card__title">
                            ${item.dataTitle}
                        </h5>
                        <p class="card__text">
                            <span class="material-symbols-outlined">schedule</span>
                            <span class="card__text_time">${item.dataOpenTime}</span>
                        </p>
                        <p class="card__text">
                            <span class="material-symbols-outlined">call</span>
                            <span class="card__text_tel">${item.dataTel}</span>
                        </p>
                        <p class="card__text">
                            <span class="material-symbols-outlined">location_on</span>
                            <span class="card__text_add">${item.dataAddress}</span>
                        </p>
                    </div>
                    <div class="card__footer">

                    <button type="button" class="btn" data-id="${item.dataNo}">
                        View Details
                    </button>
                    </div>

                    <div class="area__mark">
                        ${item.dataAreaName}
                    </div>
                </li>
            `
            }

        }

        card__list.innerHTML = card__listHTMLCode
        useComponentModal() // 觸發彈跳視窗功能
    }

    // 畫面初始化的時候需要一次
    const updateCurrentSelectionAreaViewData = function () {
        const setCurrentSelectionAreaViewData = function () {
            const noDataText = '暫時未提供'
            apiDataOfView.forEach((i, index) => {

                let dataAreaName = i.address.substr(5, 3) || noDataText
                let dataNo = i.RowNumber || noDataText
                let dataTitle = i.stitle || noDataText
                let dataDesc = i.xbody || noDataText
                let dataMRT = i.MRT || noDataText
                let dataInfo = i.info || noDataText
                let dataOpenTime = i.MEMO_TIME || noDataText
                let dataAddress = i.address || noDataText
                let dataTel = i.MEMO_TEL || noDataText
                const getFirstDataPicSrc = function () {
                    if (!apiDataOfView[index].file.img.length) {
                        return apiDataOfView[index].file.img['#text'] || ''
                    } else {
                        return apiDataOfView[index].file.img[0]['#text'] || ''
                    }
                }
                const getFirstDataPicDesc = function () {
                    if (!apiDataOfView[index].file.img.length) {
                        return apiDataOfView[index].file.img['-description'] || noDataText
                    } else {
                        return apiDataOfView[index].file.img[0]['-description'] || noDataText
                    }
                }
                let dataPicSrc = getFirstDataPicSrc()
                let dataPicDesc = getFirstDataPicDesc()



                // 當前選擇的地區和資料名一樣才塞資料於 currentSelectionAreaViewData
                if (currentSelectionAreaName === dataAreaName) {
                    currentSelectionAreaViewData.push({
                        'dataAreaName': dataAreaName,
                        'dataNo': dataNo,
                        'dataTitle': dataTitle,
                        'dataDesc': dataDesc,
                        'dataMRT': dataMRT,
                        'dataInfo': dataInfo,
                        'dataOpenTime': dataOpenTime,
                        'dataAddress': dataAddress,
                        'dataTel': dataTel,
                        'dataPicSrc': dataPicSrc,
                        'dataPicDesc': dataPicDesc
                    })
                }
            })
        }

        // console.log('更新當前名: ', currentSelectionAreaName, '||', 'updateCurrentSelectionAreaViewData', currentSelectionAreaViewData)

        // 先清空上一筆資料
        currentSelectionAreaViewData = []
        // 製作當前選擇的資料
        setCurrentSelectionAreaViewData()
        // 渲染當前選擇的資料於頁面景點卡片區(由分頁器來控制顯示的數量)
        renderCurrentSelectionAreaViewCardForPagination(currentPageNum)
        // 渲染當前選擇的資料於頁面景點卡片區(所有數量)
        // renderCurrentSelectionAreaViewCardForAll()
    }

    const getApiData = function () {

        const getZipData = function () {
            const apuUrl = 'data/viewZip.json'
            fetch(apuUrl, { method: 'GET' })
                .then(function (response) {
                    // 先判斷狀態碼是否正常(200~299)
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .then(function (data) {
                    apiDataOfZip = data
                    useComponentSelect() // 資料傳入select元件並使用
                    // 判斷紀錄點處理
                    renderCurrentSelectionAreaInfo() // 初始化預設地區名稱顯示資訊
                })
                .catch(function (error) {
                    console.log('getZipData', error)
                    window.document.body.innerHTML = `
                    <div class="error-page">
                        <h1>404 Error !</h1>
                    </div>
                    `
                })
        }

        const getViweData = function () {
            const apuUrl = 'data/viewData.json'
            fetch(apuUrl, { method: 'GET' })
                .then(function (response) {
                    // 先判斷狀態碼是否正常(200~299)
                    if (!response.ok) {
                        throw new Error(response.statusText)
                    }
                    return response.json()
                })
                .then(function (data) {
                    apiDataOfView = data

                    // let userHistoryRecord = JSON.parse(localStorage.getItem('userHistoryRecord'))

                    // console.log('userHistoryRecord 一開始', userHistoryRecord)


                    // if (userHistoryRecord) {
                    //     currentSelectionAreaName = userHistoryRecord.areaName
                    //     currentPageNum = userHistoryRecord.latestPage
                    //     updateCurrentSelectionAreaViewData(currentSelectionAreaName, currentPageNum) 
                    // } else {
                    //     // 初始化第一筆(預設/本地端)資料
                    //     updateCurrentSelectionAreaViewData() 
                    // }
                    updateCurrentSelectionAreaViewData() 
                    useComponentPagination()
                })
                .catch(function (error) {
                    console.log('apiDataOfView', error)
                    window.document.body.innerHTML = `
                    <div class="error-page">
                        <h1>404 Error !</h1>
                    </div>
                    `
                })
        }

        getZipData()
        getViweData()
    }



    
    const init = function () {
        splitTextIntoSpans('.slogan p')
        splitTextIntoSpans('.hero__info h1')

        animateStartLoader() // 開場動畫
        useComponentPagetop() // 回到最上面

        useComponentNav() // 獲取天氣跟時間
        updateCurrentTime() // 每秒重複更新時間
        
        compareCurrentSelection() // 確認 LocalStorage 是否有上一次的資料(紀錄點)
        getApiData() // 獲取地方名跟景點資訊(並先預設名跟景點一開始就顯示)(執行useComponentSelect)
    }


    // 監聽 history 變化，觸發行為 (回上一頁要做的事)
    window.addEventListener('popstate', function (e) {
        console.log('e.state:', e)
        if (e.state) {
            localStorage.setItem('userHistoryRecord', e.state)
            let userHistoryRecord = JSON.parse(e.state)

            currentSelectionAreaName = userHistoryRecord.areaName
            currentPageNum = userHistoryRecord.latestPage
            console.log('userHistoryRecord', userHistoryRecord, '||',currentSelectionAreaName, currentPageNum)




            const changeAreaName = function () {
                const selected__headers = document.querySelectorAll('.selected__header')
                const options = document.querySelectorAll('li.option')

                options.forEach((option) => {
                    let optionAreaName = option.querySelector('label').innerHTML
                    // 變更為當前的地區名
                    optionAreaName = currentSelectionAreaName
                    // 只有第一組選單的標題內容文字不變動
                    selected__headers.forEach((selected__header, index) => {
                        if (index !== 0) {
                            selected__header.innerHTML = optionAreaName
                        }
                    })
                })
            }


            // currentSelectionAreaViewData = [] // 先清空上一筆的當前資料
            changeAreaName()
            updateCurrentSelectionAreaViewData() // 再更新當前資料
            renderCurrentSelectionAreaInfo() // 再更新當前資料
            useComponentPagination() // 更新分頁狀態(回到第一頁)
        } else {
            history.back()
        }
    })

    document.addEventListener('DOMContentLoaded', init)
})()
