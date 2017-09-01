(function() {
  //require simple inheritance
  window.StaticResourceUtil = Class.extend({
    init: function() {
      this.images = new Object();
    },

    /**
     * [loadPicture 加载图片]
     * @param  {[Array]} url     [需要加载图片的地址列表]
     * @param  {[Object]} success [onSuccess(当前加载的张数,共需要加载多少张)每加载成功一张执行一次
     *                             allSuccess(所有加载完成图片组成的集合)所有图片加载成功执行]
     * @return {[type]}         [description]
     */
    loadPicture: function(url, success) {
      var self = this;
      //调用ajax异步请求地址列表 文件
      this._ajax(url, function(data) {
        var countLoadedImage = 0, //当前加载到的图片个数
          allImage = data.images.length; //共需要加载的个数
        data.images.forEach(function(item) {
          var img = new Image();
          img.src = item.src;
          img.onload = function() {
          	
            //每次完成加载 当前加载到的图片个数加一
            countLoadedImage++;

            //把加载成功的图片对象保存到集合中
            self.images[item.name] = this;
            success.oneSuccess(countLoadedImage, allImage);

            //如果当前加载到的张数等于所有图片的个数
            if (countLoadedImage == allImage) {
              success.allSuccess(self.images);
            }
          }
        });
      });
    },

    /**
     * ajax请求json文件
     * @param  {[String]} url     [请求文件的地址]
     * @param  {[Function]} success [请求成功的回调函数]
     * @return {[void]}         [无返回值]
     */
    _ajax: function(url, success) {
      //创建ajax对象
      var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');
      //定义请求方式及请求地址
      xhr.open('get', url);
      //发出请求
      xhr.send(null);
      //当加载状态改变
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          if (xhr.status == 200) {
            //将获取到的json文本转换为json对象
            var responseData = JSON.parse(xhr.responseText);
            success(responseData);
          }
        }
      }
    }
  })
})();
