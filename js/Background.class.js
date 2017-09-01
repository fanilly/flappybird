(function() {
  window.Background = Class.extend({
    init: function(options) {
      this.y = options.y; //y轴坐标
      this.image = options.image; //图片对象
      this.width = options.width; //图片宽度
      this.height = options.height; //图片高度
      this.speed = options.speed; //移动速度
      this.ctx = options.ctx; //canvas上下文对象

      this.x = 0;
      this.amount = Math.ceil(STAGE_WIDTH / this.width) * 2;
    },
    render: function() {
      for (var i = 0; i <= this.amount; i++) {
        this.ctx.drawImage(this.image, 0, 0, this.width, this.height, -this.x + this.width * i, this.y, this.width, this.height);
      }
    },
    update: function() {
      this.x += this.speed;
      if (this.x >= this.amount / 2 * this.width) {
        this.x = 0;
      }
    },
    //暂停移动
    pause:function(){
      this.speed = 0;
    }
  })
})();
