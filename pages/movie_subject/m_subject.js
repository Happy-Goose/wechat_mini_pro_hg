// pages/movie_subject/m_subject.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movieinfo:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieid = options.movieid;
    //显示加载框
    wx.showLoading({
      title: '大鹅忙着擦眼镜'
    })
    //保存this 否则发完请求this指向改变
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/subject/' + movieid,
      header: {
        'content-type': 'json'
      },
      success: function (resp) {
        //更新视图层
        that.setData({          
          'movieinfo': resp.data
        })
        //隐藏加载框
        wx.hideLoading(); 
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})