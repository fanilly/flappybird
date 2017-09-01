(function() {
  window.Game = Class.extend({
    //构造函数
    init: function(settings) {
      var self = this,
        settings = settings ? settings : {}; //配置参数的容错处理
      this.timer = null; //定时器
      this.images = null;
      this.alpha = 0;

      //FPS
      this.timeDiff = settings.timeDiff || 60; //帧间隔
      this.frameUtil = new FrameUtil(); //帧控制

      //画布
      this.canvas = document.querySelector(settings.canvasID);
      this.canvas.width = STAGE_WIDTH;
      this.canvas.height = STAGE_HEIGHT;
      this.ctx = this.canvas.getContext('2d');
      this.loadingProgress = new LoadingProgress(this.canvas);

      //静态资源加载
      this.resources = new StaticResourceUtil();
      this.resources.loadPicture("resource.json", {
        //每张图片加载成功
        oneSuccess: function(currentImageLength, allImageLength) {
          //显示进度条进度
          self.loadingProgress.update(currentImageLength / allImageLength);
          self.loadingProgress.render();
        },
        //所有图片加载成功
        allSuccess: function(imgs) {
          //保存图片资源
          self.images = imgs;
          //演员管理
          self.actorManager = new ActorManager(self.canvas, self.ctx, self.images, self.frameUtil);
          // self.start();

          //隐藏进度条
          self.loadingProgress.hide();

          //创建演员
          self.actorManager.createActors();
          self.mainLoop();
        }
      });
    },
    restart: function() {
      this.actorManager = new ActorManager(this.canvas, this.ctx, this.images, this.frameUtil);
      this.actorManager.createActors();
    },
    //主循环
    mainLoop: function() {
      //清除画布
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

      //演员出场
      this.actorManager.action();

      //更新当前帧 
      this.frameUtil.update();

      //如果鸟死亡 游戏结束
      if (this.actorManager.bird.isDie || this.actorManager.bird == false) {
        this.over();
        this.loadingProgress.showRestart();
      }

      //打印FPS及总帧数
      this.ctx.fillText('FPS / ' + this.frameUtil.getFPS(), 20, 20);
      this.ctx.fillText('FNO / ' + this.frameUtil.getCountFrames(), 80, 20);
    },
    //开始
    start: function() {
      var self = this;

      //每帧执行一次主循环
      this.timer = setInterval(function() {
        self.mainLoop();
      }, this.timeDiff);

    },
    //结束
    over: function() {
      var w = STAGE_WIDTH / 2;
      this.ctx.save();
      this.ctx.beginPath();
      if (this.alpha < 1) {
        this.alpha += 0.05;
      }
      this.ctx.globalAlpha = this.alpha;
      this.ctx.drawImage(this.images.gameover, 0, 0, 626, 144, STAGE_WIDTH / 4, STAGE_HEIGHT / 3, w, 144 / 626 * w);
      this.ctx.restore();
    },
    //暂停
    pause: function() {
      clearInterval(this.timer);
    }
  })
})();
