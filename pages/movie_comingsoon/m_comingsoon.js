// pages/movie/m_comingsoon.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //电影列表组件
    list: {
      movieinfo: [],//豆瓣API返回电影信息
      start: 0,//起始条数
      count: 20,//每次返回条数
      total: 0//总数
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示加载框
    wx.showLoading({
      title: '大鹅排队买可乐'
    })
    //保存this 否则发完请求this指向改变
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/coming_soon',
      data: {
        'start': that.data.list.start,
        'count': that.data.list.count
      },
      header: {
        'content-type': 'json'
      },
      success: function (resp) {
        //更新视图层
        that.setData({
          'list.movieinfo': resp.data.subjects,
          'list.start': that.data.list.start + that.data.list.count,
          'list.total': resp.data.total
        })
        //隐藏加载框
        wx.hideLoading();
      },
      fail: function () {
        //查询失败时 显示提示框
        wx.showToast({
          title: '大鹅生气不看了',
          image: '../../images/e2.png',
          duration: 3000
        })
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
    //显示加载框
    wx.showLoading({
      title: '大鹅重新买可乐'
    })
    //保存this 否则发完请求this指向改变
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/coming_soon',
      data: {
        'start': 0,//下拉刷新时 从第0条重新查询
        'count': that.data.list.count
      },
      header: {
        'content-type': 'json'
      },
      success: function (resp) {
        //更新视图层
        that.setData({
          'list.movieinfo': resp.data.subjects,
          'list.start': that.data.list.start + that.data.list.count,
          'list.total': resp.data.total
        })
        //隐藏加载框
        wx.hideLoading();
      },
      fail: function () {
        //查询失败时 显示提示框
        wx.showToast({
          title: '大鹅生气不看了',
          image: '../../images/e2.png',
          duration: 3000
        })
      }
    })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    //显示加载框
    wx.showLoading({
      title: '大鹅又在买可乐'
    })
    //保存this 否则发完请求this指向改变
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/coming_soon',
      data: {
        'start': that.data.list.start,
        'count': that.data.list.count,
        'total': that.data.list.total
      },
      header: {
        'content-type': 'json'
      },
      success: function (resp) {
        //将新的电影信息合并到之前的数组中
        that.data.list.movieinfo = that.data.list.movieinfo.concat(resp.data.subjects);
        //更新视图层
        that.setData({
          'list.movieinfo': that.data.list.movieinfo,
          'list.start': that.data.list.start + that.data.list.count
        })
        //隐藏加载框
        wx.hideLoading();
      },
      fail: function () {
        //查询失败时 显示提示框
        wx.showToast({
          title: '大鹅生气不看了',
          image: '../../images/e2.png',
          duration: 3000
        })
      }
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /** 
  * 显示电影详情
  */
  subject: function (event) {
    wx.navigateTo({
      url: '../../pages/movie_subject/m_subject?movieid=' + event.currentTarget.dataset.movieid
    })
  }
})