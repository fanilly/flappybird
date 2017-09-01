(function() {
  window.Bird = Class.extend({

    /**
     * [init 构造函数]
     * @param  {[Object]} ctx   [画布的上下文对象]
     * @param  {[Object]} image [图片对象]
     * @return {[void]}       [无返回值]
     */
    init: function(canvas, ctx, image) {

      this.isDie = false;
      this.dropSpeedTemp = 0;

      this.canvas = canvas;
      this.ctx = ctx;
      this.image = image;

      this.swiftly = 0; //飞行状态 也就是翅膀的煽动
      this.dropSpeed = 1; //下降速度
      this.rotateAngle = 1; //鸟的旋转
      this.rotateAngleSpeed = 3; //旋转速度
      this.state = 0; //如果状态为0 向下落 如果为1 上升
      this.maxFly = 65; //每次向上飞的最大距离
      this.wing = 5; //翅膀煽动的间隔
      this.allowingWing = true; //允许翅膀煽动

      this.x = STAGE_WIDTH/2-85; //初始化完成鸟的x坐标
      this.y = STAGE_HEIGHT/2-30; //初始化完成鸟的y坐标
      this.width = 85; //鸟的宽度
      this.height = 60; //鸟的高度

      this.bindEventListener();
    },

    render: function() {
      //鸟旋转
      this.ctx.save();
      var x = this.x + this.width / 2,
        y = this.y + this.height / 2;
      this.ctx.translate(x, y);
      this.ctx.rotate(this.rotateAngle * Math.PI / 180);
      this.ctx.translate(-x, -y);
      this.ctx.drawImage(this.image, this.width * this.swiftly, 0, this.width, this.height, this.x, this.y, this.width, this.height);
      this.ctx.restore();


      if (this.isDie) {
        //如果死亡
        if (this.isDie) {
          this.ctx.drawImage(game.images.die, 0, 0, 80, 60, this.x, this.y, 80, 60);
          game.actorManager.pause();
        }
      }
    },

    update: function(amountFrames) {
      //每五帧煽动一次翅膀
      if (this.allowingWing && amountFrames % this.wing == 0) {
        this.swiftly++;
        this.swiftly %= 3;
      }
      this.fly();
      if (this.y > STAGE_HEIGHT) {
        game.actorManager.bird = false;
      }
    },

    //绑定事件
    bindEventListener: function() {
      var self = this;
      this.canvas.addEventListener('mousedown', function() {
        if (self.dropSpeed != 0) {
          self.state = 1;
          self.oldY = self.y;
        }
      });
      this.canvas.addEventListener('touchstart', function() {
        if (self.dropSpeed != 0) {
          self.state = 1;
          self.oldY = self.y;
        }
      });
    },

    //鸟飞行
    fly: function() {
      //使鸟的下降形成匀加速运动
      if (this.state == 0) {
        this.dropSpeed *= 1.15;
      } else if (this.state == 1) {
        //要上升的距离
        this.rotateAngle = -25;

        this.wing = 3; //使翅膀煽动速度加快
        var d = this.y - (this.oldY - this.maxFly); //阻力减速
        this.dropSpeed = -d / 2;

        //如果小于0 则不需要上升 开始下降
        if (d <= 1  || this.y + this.dropSpeed < 0 /*表示超出天空的高度*/) {
          this.state = 0;
          this.dropSpeed = 1;
          this.wing = 5;
        }
      }
      this.y += this.dropSpeed;
      this.rotateAngle += this.rotateAngleSpeed;
    },

    pause: function() {
      var self = this;
      this.dropSpeed = 0;
      this.rotateAngleSpeed = 0;
      this.allowingWing = false;
      setTimeout(function() {
        self.dropSpeed = self.dropSpeedTemp;
      }, 200);
    }
  })
})();
