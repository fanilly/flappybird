(function() {
  window.Pipe = Class.extend({
    init: function(ctx, images) {
      //管道放下 0向上 1向下
      this.type = Math.floor(Math.random() * 2);

      //管道的高度
      this.height = Math.ceil(Math.random() * (STAGE_HEIGHT / 2 - 100) + 50);
      this.width = 148;
      this.x = STAGE_WIDTH;

      this.ctx = ctx;
      this.images = images;

      this.speed = 8;
      this.flag = true; //记录当前管子是否加过分 true没有

      //画布除去地板之外的高度
      this.areaHeight = STAGE_HEIGHT - 48;
    },
    update: function() {
      //检测鸟是否碰撞到管子及地面
      //首先检测是否进入管子区域
      var bird = game.actorManager.bird;
      if ((bird.x + bird.width) > this.x && bird.x < (this.x + this.width)) { //进入管道区域
        if (this.type == 0) { //检测与向上的管道是否碰撞
          if ((bird.y + bird.height) > (this.areaHeight - this.height)) {
            game.actorManager.bird.isDie = game.actorManager.allowingDie;
            game.actorManager.bird.dropSpeedTemp = 6;
          }
        } else if (this.type == 1) { //检测与向下的管道是否碰撞
          if (bird.y < this.height) {
            game.actorManager.bird.isDie = game.actorManager.allowingDie;
            game.actorManager.bird.dropSpeedTemp = 6;
          }
        }
      } else if (bird.y + bird.height > this.areaHeight-15) {
        //撞到地板 死亡
        game.actorManager.bird.isDie = game.actorManager.allowingDie;
        game.actorManager.bird.dropSpeedTemp = 1;
      }

      //判断如果鸟飞过管子,更新分数
      if (this.flag && bird.x > this.x + this.width) {
        this.flag = false;
        game.actorManager.scoreAmount.update();
      }

      //移动管子
      this.x -= this.speed;
      if (this.x < -this.width) {
        game.actorManager.allPipe = game.actorManager.allPipe.removeArrayItem(this);
      }
    },
    render: function() {
      //渲染管道
      if (this.type == 0) {
        this.ctx.drawImage(this.images.pipe0, 0, 0, this.width, this.height, this.x+20, this.areaHeight - this.height, this.width, this.height);
      } else {
        this.ctx.drawImage(this.images.pipe1, 0, 1664 - this.height, this.width, this.height, this.x+20, 0, this.width, this.height);
      }
    },
    //暂停移动
    pause:function(){
      this.speed = 0;
    }
  })
})();
