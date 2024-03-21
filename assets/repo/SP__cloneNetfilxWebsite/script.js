;(function () {
    const animatedLoading = function () {
        gsap.from('body', {
            overflowY: 'hidden',
            duration: 10,
        })

        gsap.fromTo('.loading__page', {
            opacity: 1,
        },{
            opacity: 0,
            display: 'none',
            duration: 1,
            esae: 'power4.inOut',
            delay: 10
        })
    }

    const init = function () {
        animatedLoading()
    }

    window.addEventListener('load', init)
})()