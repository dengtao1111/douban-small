// pages/movie/movie.js
const Http = require('../../utils/http');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    movies: {
    }
  },
  async onLoad() {
    /* 有缓存则获取缓存中的数据,没有缓存,则发送http */
    var storageData = wx.getStorageSync("movies");
    if (storageData) {
      this.setData({
        movies: storageData
      })
    } else {
      var movies = {}
      var top250 = await Http.getTop250();
      var inTheaters = await Http.getInTheaters();
      var comingSoon = await Http.getComingSoon();
      movies.inTheaters = {};
      movies.inTheaters.title = "正在热映"
      movies.inTheaters.data = inTheaters.data.subjects.slice(0, 3);
      movies.inTheaters.subTitle = "in_theaters";

      movies.comingSoon = {};
      movies.comingSoon.title = "即将上映"
      movies.comingSoon.data = comingSoon.data.subjects.slice(0, 3);
      movies.comingSoon.subTitle = "coming_soon";

      movies.top250 = {};
      movies.top250.title = "豆瓣top250";
      movies.top250.data = top250.data.subjects.slice(0, 3);
      movies.top250.subTitle = "top250";

      wx.setStorageSync("movies", movies);
      this.setData({
        movies
      })
    }

  },
  handleMore(e){
    var {title,url} = e.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/movie-detail/movie-detail?title=${title}&url=${url}`
    })
  }
})