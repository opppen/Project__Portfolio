; (function () {
    let apiDataOfZip = []
    let apiDataOfView = []
    let currentSelectionAreaName = '中正區'
    let currentSelectionAreaData = []


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
        }


        updateCounter()
        animateBgImg()
    }

    const componentPagetop = function () {
        document.querySelector('.pagetop__button').addEventListener('click', function () {
            window.scrollTo(0, 0)
        })
    }

    const componentNav = function () {

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

    const getTimeSetIntervalFUNC = componentNav()

    const componentModal = function () {
        const modal = document.querySelector('.modal')
        const areaCarasOfButtonViewDetails = document.querySelectorAll('.area .card .btn')
        const showViewDetails = function () {
            areaCarasOfButtonViewDetails.forEach((button) => {
                button.addEventListener('click', function () {
                    // modal.classList.add('js--isShow')
                    window.document.body.classList.add('js--isModalShow')
                })
            })
        }
        const buttonCloseHandler = function () {
            const buttonClose = document.querySelector('.modal .btn-close')
            buttonClose.addEventListener('click', function () {
                // modal.classList.remove('js--isShow')
                window.document.body.classList.remove('js--isModalShow')
            })
        }
        showViewDetails()
        buttonCloseHandler()
    }

    const componentSelect = function () {
        const select__boxs = document.querySelectorAll('.select__box')
        const selected__headers = document.querySelectorAll('.selected__header')
        const option__lists = document.querySelectorAll('.option__list')
        let optionListHTML = ''


        apiDataOfZip.forEach((item) => {
            let areaNameTw = item.districtTw
            let areaNameEn = item.districtEn
            let areaZip = item.zipcode
            const renderOptionList = function () {
                optionListHTML += `
                <li class="option">
                    <input type="radio" class="radio" id="area${areaZip}" name="area" value="${areaZip}">
                    <label for="area${areaZip}">${areaNameTw}</label>
                </li>
            `
            }

            renderOptionList()
        })


        // 針對頁面個別的下拉選單進行業務
        option__lists.forEach((item) => {

            // 針對”每一組選單“寫入內容＋顯示於頁面
            const renderOption = function () {
                return item.innerHTML = optionListHTML
            }

            // 針對“每ㄧ組選單內“所有的項目處理業務
            const optionHanlder = function () {
                const itemOptions = item.querySelectorAll('li.option')
                itemOptions.forEach((option) => {

                    option.addEventListener('click', function () {
                        // 執行選項觸發的class樣式
                        const activeOption = function () {
                            // 先移除“所有” li.option 上的 js--active
                            itemOptions.forEach((itemOption) => {
                                itemOption.classList.remove('js--active')
                            })
                            // 再針對“當下點擊的” li.option 新增 js--active
                            option.classList.add('js--active')
                            // 關閉下拉選單內容
                            select__boxs.forEach((select__box) => {
                                select__box.classList.remove('js--active')
                            })
                        }

                        // 選擇區域後處裡的業務
                        const chooseSelectArea = function () {


                            // 渲染所選當前地區的名稱於頁面上 ///////// repeat
                            // const renderCurrentSelectionAreaInfo = function () {

                            //     const area__info__subtitle = document.querySelector('.area__info__subtitle')
                            //     const area__info__title = document.querySelector('.area__info__title')
                            //     const area__info__zipCode = document.querySelector('.area__info__zip-code')

                            //     apiDataOfZip.forEach((item) => {
                            //         if (currentSelectionAreaName === item.districtTw) {
                            //             area__info__subtitle.innerText = item.districtEn
                            //             area__info__title.innerText = item.districtTw
                            //             area__info__zipCode.innerText = item.zipcode
                            //         }
                            //     })
                            // }

                            // 渲染所選當前地區的卡片資料於頁面上 ///////// repeat
                            // const renderCurrentSelectionAreaCard = function () {

                            //     const card__list = document.querySelector('.area__sports .card__list')
                            //     let card__listHTML = ''
                            //     currentSelectionAreaData.forEach((item) => {
                            //         card__listHTML += `
                            //                                         <li class="card">
                            //                                             <img class="card__img-top" src="${item.dataPicSrc}"
                            //                                             alt="${item.dataPicDesc}">
                            //                                             <div class="card__body">
                            //                                             <h5 class="card__title">
                            //                                                 ${item.dataTitle}
                            //                                             </h5>
                            //                                             <p class="card__text">
                            //                                                 <span class="material-symbols-outlined">schedule</span>
                            //                                                 <span class="card__text_time">${item.dataOpenTime}</span>
                            //                                             </p>
                            //                                             <p class="card__text">
                            //                                                 <span class="material-symbols-outlined">call</span>
                            //                                                 <span class="card__text_tel">${item.dataTel}</span>
                            //                                             </p>
                            //                                             <p class="card__text">
                            //                                                 <span class="material-symbols-outlined">location_on</span>
                            //                                                 <span class="card__text_add">${item.dataAddress}</span>
                            //                                             </p>
                            //                                             </div>
                            //                                             <div class="card__footer">
                            //                                             <button type="button" class="btn">
                            //                                                 View Details
                            //                                             </button>
                            //                                             </div>
                            //                                             <div class="area__mark">${item.dataAreaName}</div>
                            //                                         </li>
                            //                                     `
                            //     })

                            //     card__list.innerHTML = card__listHTML
                            //     currentSelectionAreaData = []
                            //     componentModal()
                            // }

                            // 修改所選的名字
                            const changeAreaName = function () {
                                let optionAreaName = option.querySelector('label').innerHTML
                                // 修改當前的地區名
                                currentSelectionAreaName = optionAreaName
                                // 只有第一組選單的標題內容文字不變動
                                selected__headers.forEach((selected__header, index) => {
                                    if (index !== 0) {
                                        selected__header.innerHTML = optionAreaName
                                    }
                                })

                                renderCurrentSelectionAreaInfo()
                            }

                            // 處理所選當前地區的資料  ///////// repeat
                            // const setCurrentSelectionAreaData = function () {
                            //     const noDataText = '暫時未提供'
                            //     apiDataOfView.forEach((i, index) => {


                            //         let dataAreaName = i.address.substr(5, 3) || noDataText
                            //         let dataNo = i.RowNumber || noDataText
                            //         let dataTitle = i.stitle || noDataText
                            //         let dataDesc = i.xbody || noDataText
                            //         let dataMRT = i.MRT || noDataText
                            //         let dataInfo = i.info || noDataText
                            //         let dataOpenTime = i.MEMO_TIME || noDataText
                            //         let dataAddress = i.address || noDataText
                            //         let dataTel = i.MEMO_TEL || noDataText

                            //         const getFirstDataPicSrc = function () {
                            //             if (!apiDataOfView[index].file.img.length) {
                            //                 return apiDataOfView[index].file.img['#text'] || ''
                            //             } else {
                            //                 return apiDataOfView[index].file.img[0]['#text'] || ''
                            //             }
                            //         }

                            //         const getFirstDataPicDesc = function () {
                            //             if (!apiDataOfView[index].file.img.length) {
                            //                 return apiDataOfView[index].file.img['-description'] || noDataText
                            //             } else {
                            //                 return apiDataOfView[index].file.img[0]['-description'] || noDataText
                            //             }
                            //         }

                            //         let dataPicSrc = getFirstDataPicSrc()
                            //         let dataPicDesc = getFirstDataPicDesc()

                            //         if (currentSelectionAreaName === dataAreaName) {
                            //             currentSelectionAreaData.push({
                            //                 'dataAreaName': dataAreaName,
                            //                 'dataNo': dataNo,
                            //                 'dataTitle': dataTitle,
                            //                 'dataDesc': dataDesc,
                            //                 'dataMRT': dataMRT,
                            //                 'dataInfo': dataInfo,
                            //                 'dataOpenTime': dataOpenTime,
                            //                 'dataAddress': dataAddress,
                            //                 'dataTel': dataTel,
                            //                 'dataPicSrc': dataPicSrc,
                            //                 'dataPicDesc': dataPicDesc
                            //             })

                            //         }


                            //     })

                            //     renderCurrentSelectionAreaCard()
                            // }



                            document.querySelector('.area .content').scrollIntoView()

                            changeAreaName()
                            setCurrentSelectionAreaData()
                        }

                        activeOption()
                        chooseSelectArea()
                    })
                })
            }

            renderOption()
            optionHanlder()
        })

        // 針對每個選單標題進行的業務
        select__boxs.forEach((select__box) => {
            const selected__header = select__box.querySelector('.selected__header')
            selected__header.addEventListener('click', function () {
                select__box.classList.toggle('js--active')
            })
        })
    }






    ///// repeat /////
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
    ///// repeat /////
    const renderCurrentSelectionAreaCard = function () {

        const card__list = document.querySelector('.area__sports .card__list')
        let card__listHTML = ''
        currentSelectionAreaData.forEach((item) => {
            card__listHTML += `
                <li class="card">
                    <img class="card__img-top" src="${item.dataPicSrc}"
                    alt="${item.dataPicDesc}">
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
                    <button type="button" class="btn">
                        View Details
                    </button>
                    </div>
                    <div class="area__mark">${item.dataAreaName}</div>
                </li>
            `
        })

        card__list.innerHTML = card__listHTML
        currentSelectionAreaData = []
        componentModal()
    }
    ///// repeat /////
    const setCurrentSelectionAreaData = function () {
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

            if (currentSelectionAreaName === dataAreaName) {
                currentSelectionAreaData.push({
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

        console.log('currentSelectionAreaData', currentSelectionAreaData)
        renderCurrentSelectionAreaCard()
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
                    componentSelect(apiDataOfZip)
                    renderCurrentSelectionAreaInfo()
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
                    setCurrentSelectionAreaData()
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

        animateStartLoader()
        getApiData()

        // componentSelect()
        componentNav()
        setInterval(getTimeSetIntervalFUNC, 1000)
        componentModal()
        componentPagetop()
    }

    document.addEventListener('DOMContentLoaded', init)
})()
