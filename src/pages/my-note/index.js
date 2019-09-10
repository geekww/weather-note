const App = getApp();

Page({
    data: {
        list:[
            {
                id:1,
                memo: '今天的心情美美哒！！！',
                time: '2019-09-10',
                isTouchMove:false,
            },
            {
                id:2,
                memo: '今天一定有好事发生！！！',
                time: '2019-09-10',
                isTouchMove:false,
            }
        ]
    },
    touchstart: function (e) {
        //开始触摸时 重置所有删除
        let data = App.touch._touchstart(e, this.data.list) //将修改过的list setData
        this.setData({
            list: data
        })
    },

    //滑动事件处理
    touchmove: function (e) {
        let data = App.touch._touchmove(e, this.data.list,'id')//将修改过的list setData
        this.setData({
            list: data
        })
    },
})
