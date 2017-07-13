// pages/movie_intheaters/m_intheaters.js
//正在上映
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //滑动图片组件
    swiper: {
      imageUrls: [],//豆瓣API返回电影图片信息取前三
      autoplay: true, //是否自动切换
      interval: 5000,//自动切换时间间隔      
      duration: 500//滑动动画时长
    },
    //电影列表组件
    list:{
      movieinfo:[],//豆瓣API返回电影信息
      start:0,//起始条数
      count:10,//每次返回条数
      total:0//总数
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //显示加载框
    wx.showLoading({
      title: '大鹅正在贴海报'
    })
    //保存this 否则发完请求this指向改变
    var that = this;    
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters', 
      data:{
        'start':that.data.list.start,
        'count': that.data.list.count
      },
      header: {
        'content-type': 'json'
      },    
      success: function (resp) {
        //设置滑动图片
        var o1 = {};
        o1.id = resp.data.subjects[0].id;
        o1.img = resp.data.subjects[0].images.large;
        var o2 = {};
        o2.id = resp.data.subjects[1].id;
        o2.img = resp.data.subjects[1].images.large;
        var o3 = {};
        o3.id = resp.data.subjects[2].id;
        o3.img = resp.data.subjects[2].images.large;            
        that.data.swiper.imageUrls = [o1, o2, o3];
        //更新视图层
        that.setData({
          'swiper.imageUrls': that.data.swiper.imageUrls,
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
          title: '大鹅吃掉了海报',
          image: '../../images/e1.png',
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
      title: '大鹅重新贴海报'
    })
    //保存this 否则发完请求this指向改变
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters',
      data: {
        'start': 0,//下拉刷新时 从第0条重新查询
        'count': that.data.list.count
      },
      header: {
        'content-type': 'json'
      },
      success: function (resp) {
        //设置滑动图片
        var o1 = {};
        o1.id = resp.data.subjects[0].id;
        o1.img = resp.data.subjects[0].images.large;
        var o2 = {};
        o2.id = resp.data.subjects[1].id;
        o2.img = resp.data.subjects[1].images.large;
        var o3 = {};
        o3.id = resp.data.subjects[2].id;
        o3.img = resp.data.subjects[2].images.large;
        that.data.swiper.imageUrls = [o1, o2, o3];
        //更新视图层
        that.setData({
          'swiper.imageUrls': that.data.swiper.imageUrls,
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
          title: '大鹅吃掉了海报',
          image: '../../images/e1.png',
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
      title: '大鹅又在贴海报'
    })
    //保存this 否则发完请求this指向改变
    var that = this;
    wx.request({
      url: 'https://api.douban.com/v2/movie/in_theaters',
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
          title: '大鹅吃掉了海报',
          image: '../../images/e1.png',
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