(function() {
  //require simple inheritance
  window.FrameUtil = Class.extend({
    //构造函数
    init: function() {
      this.countFrames = 0; //帧数统计
      this.FPS = 0; //记录当前真实的FPS
      
      this.preFrameTime = new Date(); //用于计算真实FPS信息
      this.preFrames = 0; //用于计算真实FPS信息
    },
    //更新
    update: function() {
      this.countFrames++;
      var temp = new Date();
      if (temp - this.preFrameTime >= 1000) {
        //如果大于等于1000 证明已经过去1s 去计算在过去的1s中 执行了多少帧
        this.FPS = this.countFrames - this.preFrames;
        this.preFrames=this.countFrames;
        this.preFrameTime = temp;
      }
    },
    //获取当前FPS
    getFPS: function() {
    	return this.FPS;
    },
    //获取总帧数
    getCountFrames: function() {
      return this.countFrames;
    }
  })
})();
