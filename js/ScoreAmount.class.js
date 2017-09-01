(function() {
  window.ScoreAmount = Class.extend({
    init: function(ctx, image) {
      this.ctx = ctx;
      this.image = image;

      //初始分数
      this.score = 0;
    },
    //更新分数
    update: function() {
    	this.score+=10;
    },
    //渲染分数
    render: function() {
      var tempStr = this.score.toString(),
        len = tempStr.length;
      for (var i = 0; i < len; i++) {
        this.ctx.drawImage(this.image, parseInt(tempStr[i]) * 40, 0, 40, 57, STAGE_WIDTH / 2 - len * 40 / 2 + i * 40, 70, 40, 57);
      }
    }
  })
})();
