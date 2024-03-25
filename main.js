; (function () {
	const getDate = function () {
		// ===================================
		// 設定時間
		// ===================================
		const lang = navigator.language
		const date = new Date()
		const dayNumber = date.getDate()
		const month = date.getMonth()
		const weekName = date.toLocaleString(lang, { weekday: 'long' })
		const monthName = date.toLocaleString(lang, { month: 'long' })

		document.querySelector('.month').innerHTML = monthName
		document.querySelector('.week').innerHTML = weekName
		document.querySelector('.day').innerHTML = dayNumber
	}

    const goToDesignatedPosition = function (elementClassName) {
        document.querySelector(elementClassName).scrollIntoView({ behavior: "smooth", }) // 滑到指定的座標位置
    }

	const goToTopScroll = function () {
		/*	
			// https://shubo.io/element-size-scrolling/
			取得整個文件的寬度/高度 可以用 document.documentElement 這個特殊的DOM node (對應於html)
			PS 瀏覽器相容性的問題也可能要用 document.body
			
			完整內容高度 (scrollHeight)
			捲軸本身高度 (clientHeight)
		*/


		const gototop = document.getElementById('gototop')
		const lastHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight
		// let scrollNow = document.documentElement.scrollTop
		let scrollNow = window.scrollY
		// 為什麼 scrollNow * 100 ? (因為要換算成百分比)
		const scrollValue = Math.round((scrollNow / lastHeight) * 100)
		// console.log('scrollValue', scrollValue)
		// console.log('scrollNow', scrollNow)

		// ---------------------------------
		// 控制gototop出現
		// ---------------------------------
		if (scrollNow > 100) {
			gototop.style.display = 'flex'
		} else {
			gototop.style.display = 'none'
		}

		// ---------------------------------
		// 點 gototop 回到最上面
		// ---------------------------------
		gototop.addEventListener('click', function () {
			console.log(scrollNow)

			// 為什麼不能直接 scrollNow = 0 ?
			// 寫法一
			// document.documentElement.scrollTop = 0
			// 寫法二
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			})
		})

		// ---------------------------------
		// 點 gototop 進度條效果
		// ---------------------------------
		gototop.style.background = `conic-gradient(#00a0e8 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`
	}

	const animaxHero = function () {
		const animaxHeroInit = function () {
			gsap.set('.nav__timer', {
				yPercent: -100,
			})
			gsap.set('.logo__mascot', {
				// scale: 0,
				xPercent: -300,
				yPercent: 45,
				rotate: 360,
				autoAlpha: 0,
			})
			gsap.set('.hero__title .remark h1', {
				yPercent: -200,
			})
			gsap.set('.hero__title h2', {
				yPercent: -500,
			})
			gsap.set('.scroll__sign', {
				autoAlpha: 0,
			})
			gsap.set('.icon__arrow-downward', {
				autoAlpha: 0,
				yPercent: -100,
			})
		}

		const animaxHeroRunning = function () {
			const tl = gsap.timeline({
				defaults: {
					duration: 2,
					ease: 'power4.inOut',
				}
			})

			tl.to('.logo__mascot', {
				autoAlpha: 1,
				xPercent: 80,
				rotate: -360,
				duration: 3,
			}).to('.logo__mascot', {
				xPercent: 0,
				rotate: 0,
				// scale: 1,
				// yPercent: 0,
				// duration: 5,
				ease: "back.inOut(1.7)",
			}).to('.logo__mascot', {
				yPercent: 0,
				ease: "back.inOut(1.7)",
			}).to('.hero__title .remark h1', {
				yPercent: 0,
			}).to('.hero__title .remark h2', {
				yPercent: 0,
			}).to('.nav__timer', {
				yPercent: 0,
			}, '<').to('.hero', {
				yPercent: 8,
			}, '<').to('.icon__arrow-downward', {
				autoAlpha: 1,
				yPercent: 0,
			}).to('.scroll__sign', {
				autoAlpha: 1,
			}, '<')
			// .to('.hero', {
			// 	yPercent: -50,
			// }, '<+2')
		}

		animaxHeroInit()
		animaxHeroRunning()
		// 跑完動畫到指定的地方
		setTimeout(() => {
			// goToDesignatedPosition('.project')
			window.scrollBy({
				top: 500,
				// left: 100,
				behavior: "smooth",
			  })
		}, 14500)
	}



	const scrollHandler = function () {
		goToTopScroll()
	}

	const initHandler = function () {
		getDate()
		goToTopScroll()
		animaxHero()
	}



	window.addEventListener('DOMContentLoaded', initHandler)
	window.addEventListener('scroll', scrollHandler)
})()