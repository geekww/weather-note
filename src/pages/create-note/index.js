const app = getApp()

Page({
    data: {
        memo: '',
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        weatherList: [
            {
                weather: 'sunny',
                word: '风和日丽'
            },
            {
                weather: 'cloudy',
                word: '如晴天似雨天'
            },
            {
                weather: 'stormy',
                word: '电闪雷鸣'
            },
            {
                weather: 'rainy',
                word: '风雨交加'
            },
            {
                weather: 'snowy',
                word: '千里冰封'
            },
            {
                weather: 'rainbow',
                word: '雨过天晴'
            },
            {
                weather: 'starry',
                word: '繁星点点'
            }
        ]
    },
    tap() {
        console.log('tap')
    },
    swiperChange: function (e) {
        console.log(e);
        this.setData({
            swiperCurrent: e.detail.current   //获取当前轮播图片的下标
        })
    }
})

