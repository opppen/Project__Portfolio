const apiLink = 'https://opendata.cwa.gov.tw/api/v1/rest/datastore/F-C0032-001?Authorization=CWB-F2013C4D-6FC9-41F4-9898-0D46C70E00C3'
// const apiLink = 'https://api.openweathermap.org/data/2.5/box/city?bbox=120,19,122,30,10&appid=cb9de36bbd3a6969b700004716fd3036'

// https://opendata.cwa.gov.tw/index

let weatherData = []
const btnSearch = document.querySelector('.btn-search')
const inputSearch = document.querySelector('.input-search')
const form = document.querySelector('form')
const nowSection = document.querySelector('.now-section')
const futureList = document.querySelector('.future-list')
const loader = document.querySelector('.loader')

axios
    .get(apiLink)
    .then((res) => {
        // 1. 成功後，將api回傳的內容存在所設定的變數容器內
        console.log(res)
        weatherData = res.data.records.location
        // 2. 成功抓取api檔案後移除load狀態
        // loader.remove()
        loader.style.display = 'none'
        // 3. 將畫面顯示內容
        showWeater(weatherData)
        
    }).catch((err) => {
        console.log(err)
        loader.style.display = 'block'
        alert(err)
    })


// method: 顯示現在天氣
const showWeater = function (weatherData) {

    /* -----------------------------------------------------------------------------
                                        變數設定
    ------------------------------------------------------------------------------ */
    // const cityInfo = weatherData instanceof Array ? weatherData[1] :weatherData
    // 預設台北市
    const cityInfo = weatherData.length ? weatherData[5] : weatherData
    // 臺灣各縣市，預設為回傳全部縣市 (locationName)
    const locationCityName = cityInfo.locationName

    // 天氣因子 Available values (weatherElement)
    // 0: Wx(天氣現象)、1: PoP(降雨機率)、2: MinT(最低溫度)、3: CI(舒適度)、4: MaxT(最高溫度)

    // 天氣現象狀態
    const weather = cityInfo.weatherElement[0].time[0].parameter.parameterName
    
    // 降雨機率(%)
    const probabilityOfPrecipitation = cityInfo.weatherElement[1].time[0].parameter.parameterName

    // 舒適度
    const comfortIndex	 = cityInfo.weatherElement[3].time[0].parameter.parameterName

    // 最低溫度(°C)
    const minTemperature = Number(cityInfo.weatherElement[2].time[0].parameter.parameterName)

    // 最高溫度(°C)
    const maxTemperature = Number(cityInfo.weatherElement[4].time[0].parameter.parameterName)

    // 平均溫度(°C)   --> ceil 無條件進位
    const temperature = Math.ceil( (maxTemperature + minTemperature) / 2 )

    /* -----------------------------------------------------------------------------
                                        寫入頁面
    ------------------------------------------------------------------------------ */
    nowSection.innerHTML = `
        <div class="now-content">
            <h1 class="content__city-name">${locationCityName}</h1>
            <span class="content__ci">${comfortIndex}</span>
            <div class="content__temp">${temperature}<span>°C</span></div>
            <div class="content__wx">${weather}</div>
            <div class="content__pop">降雨機率 : ${probabilityOfPrecipitation}%</div>

            <!-- 
                <div class="content__bg bg-01"></div>
                <div class="content__bg bg-02"></div>
                <div class="content__bg bg-03"></div> 
            -->
        </div>
    `
    /* -----------------------------------------------------------------------------
                                        其他配置
    ------------------------------------------------------------------------------ */
    showFutureWeater(cityInfo)
    // changeBg(temperature, probabilityOfPrecipitation)
}
// method: 顯示未來24小時的天氣
const showFutureWeater = function (cityInfo) {
    // 1. 清空未來天氣預報項目
    futureList.innerHTML = ''

    // 2. 
    let limitTime = 2
    for (let i = 1; i <= limitTime ; i++) {
        // 天氣現象狀態
        const weather = cityInfo.weatherElement[0].time[i].parameter.parameterName
        // 降雨機率(%)
        const probabilityOfPrecipitation = cityInfo.weatherElement[1].time[i].parameter.parameterName
        // 平均溫度(°C)
        const minTemperature = Number(cityInfo.weatherElement[2].time[i].parameter.parameterName)
        const maxTemperature = Number(cityInfo.weatherElement[4].time[i].parameter.parameterName)
        const temperature = Math.ceil( (maxTemperature + minTemperature) / 2 )
        // 舒適度
        const comfortIndex	 = cityInfo.weatherElement[3].time[i].parameter.parameterName
        /* -----------------------------------------------------------------------------
                                            寫入頁面
        ------------------------------------------------------------------------------ */
        futureList.innerHTML += `
            <div class="row future-item">
                <div class="col">${weather}</div>
                <div class="col">${temperature}°C</div>
                <div class="col">${probabilityOfPrecipitation}%</div>
                <div class="col">${comfortIndex}</div>
            </div>
        `
    }
}
// method: 隨溫度改變顏色
const changeBg = function (temperature, probabilityOfPrecipitation) {
    const contentBgs = document.querySelectorAll('.content__bg')
    contentBgs.forEach((item)=>{
        if (Number(temperature) >= 30) {
            item.style = 'background-image: url("https://images.unsplash.com/photo-1447601932606-2b63e2e64331?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=379&q=80")'
        } else if (Number(probabilityOfPrecipitation) >= 90) {
            item.style = 'background-image: url("https://images.unsplash.com/photo-1514632595-4944383f2737?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80")'
        } else {
            item.style = 'background-image: url("https://images.unsplash.com/photo-1513002749550-c59d786b8e6c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80")'
        }
    })

}
// method: 關鍵字搜尋
const searchKeyword = function () {

    const keyword = inputSearch.value
    if (keyword.length === 0) {
        alert('請輸入縣市！')
        return
    }

    const keywordSplit = keyword.split('')

    const findTai = keywordSplit.includes('台') ? '臺' + keywordSplit.splice(1).join('') : keyword
    console.log(findTai)

    const result = weatherData.find((item) => {
        return item.locationName.includes(findTai)
    })

    if (result) {
        showWeater(result)
        inputSearch.value = ''
    } else {
        alert('輸入有誤請重新輸入')
        inputSearch.value = ''
    }
  
    console.log(keyword)
}

btnSearch.addEventListener('click', searchKeyword)
btnSearch.addEventListener('keyup.enter', searchKeyword)

// 沒有這個會直接跳掉？？
// the submit event will no longer reload the page
form.addEventListener('submit', (e) => e.preventDefault())