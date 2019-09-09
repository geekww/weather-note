const app = getApp()

Page({
    data: {
        avatarUrl: './user-unlogin.png',
        userInfo: {},
        logged: false,
        takeSession: false,
        requestResult: ''
    },

    onLoad: function() {
        if (!wx.cloud) {
            wx.redirectTo({
                url: '../chooseLib/chooseLib',
            })
            return
        }

        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            this.setData({
                                avatarUrl: res.userInfo.avatarUrl,
                                userInfo: res.userInfo
                            })
                        }
                    })
                }
            }
        })
    },

    onGetUserInfo: function(e) {
        if (!this.logged && e.detail.userInfo) {
            this.setData({
                logged: true,
                avatarUrl: e.detail.userInfo.avatarUrl,
                userInfo: e.detail.userInfo
            })
        }
    },

    // 上传图片
    doUpload: function () {
        // 选择图片
        wx.chooseImage({
            count: 1,
            sizeType: ['compressed'],
            sourceType: ['album', 'camera'],
            success: function (res) {

                wx.showLoading({
                    title: '上传中',
                })

                const filePath = res.tempFilePaths[0]

                // 上传图片
                const cloudPath = 'my-image' + filePath.match(/\.[^.]+?$/)[0]
                wx.cloud.uploadFile({
                    cloudPath,
                    filePath,
                    success: res => {
                        console.log('[上传文件] 成功：', res)

                        app.globalData.fileID = res.fileID
                        app.globalData.cloudPath = cloudPath
                        app.globalData.imagePath = filePath

                        wx.navigateTo({
                            url: '../storageConsole/storageConsole'
                        })
                    },
                    fail: e => {
                        console.error('[上传文件] 失败：', e)
                        wx.showToast({
                            icon: 'none',
                            title: '上传失败',
                        })
                    },
                    complete: () => {
                        wx.hideLoading()
                    }
                })

            },
            fail: e => {
                console.error(e)
            }
        })
    },

    // 授权后用户操作（创建心情）
    createNote(e) {
        // 获取用户openId
        wx.cloud.callFunction({
            name: 'login',
            success(res) {
                app.globalData.openid = res.result.openid;

                // 判断是否已经存在用户
                let cloud = wx.cloud.database();
                cloud.collection('user_info').where({
                    _openid: app.globalData.openid
                }).get({
                    success(res) {
                        if (res.data.length > 0) {
                            // 跳转至写心情页面
                            wx.navigateTo({
                                url: '../createNote/index',
                            })
                        } else {
                            // 创建新用户
                            this.createUser(e.detail.userInfo);
                        }
                    }
                })
            }
        })
    },

    // 创建新用户
    createUser(userInfo) {
        let cloud = wx.cloud.database();
        cloud.collection('user_info').add({
            data: {
                avatarUrl: userInfo.avatarUrl,
                city: userInfo.city,
                country: userInfo.country,
                gender: userInfo.gender,
                language: userInfo.language,
                nickName: userInfo.nickName,
                province: userInfo.province,
            },
            success(res) {
                wx.showToast({
                    title: '注册成功',
                });
            },
            fail(err) {
                wx.showToast({
                    icon: 'none',
                    title: '注册失败'
                });
            }
        })
    },

    // 下拉刷新
    onPullDownRefresh: function () {
        // 显示顶部刷新图标
        wx.startPullDownRefresh()
        var that = this;
        // wx.request({
        //     url: 'https://xxx/?page=0',
        //     method: "GET",
        //     header: {
        //         'content-type': 'application/text'
        //     },
        //     success: function (res) {
        //         that.setData({
        //             moment: res.data.data
        //         });
        //         console.log(that.data.moment);
        //         // 隐藏导航栏加载框
        //         wx.hideNavigationBarLoading();
        //         // 停止下拉动作
        //         wx.stopPullDownRefresh();
        //     }
        // })
    }
})
