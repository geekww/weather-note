const app = getApp();

Page({
    data: {
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/sHNIjbLV2aHOVktSBcKK5vIsEpRiakEYxic8l7udSoMdzf7VvhbAtKJ605pcMRaicsO1thQicZ2RicpSugJ9CSkSKKg/132',
        userInfo: {},
    },
    onLoad() {
        // 获取用户信息
        let cloud = wx.cloud.database();
        cloud.collection('user_info').where({
            _openid: app.globalData.openid
        }).get({
            success(res) {
                console.log(res)
                this.setData({
                    avatarUrl: res.data[0].avatarUrl,
                    userInfo: res.data[0]
                });
                console.log(this.avatarUrl)
            }
        });
    },
});
