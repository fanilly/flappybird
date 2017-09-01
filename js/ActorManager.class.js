(function() {
  window.ActorManager = Class.extend({
    init: function(canvas, ctx, images, frameUtil) {
      //允许死亡 作弊使用 如果为false则无敌不会死亡
      this.allowingDie = true;

      //房子
      this.house = null;

      //地板
      this.floor = null;

      //树木
      this.tree = null;

      //小鸟
      this.bird = null;

      //所有的管道
      this.allPipe = new Array();

      //分数统计
      this.scoreAmount = null;

      //画布dom对象
      this.canvas = canvas;

      //画布上下文对象
      this.ctx = ctx;

      //加载好的图片资源
      this.images = images;

      //帧工具
      this.frameUtil = frameUtil;

      //开始的第一根管子
      this.allPipe.push(new Pipe(this.ctx, this.images));

      //允许新建管子
      this.allowingNewPipe = true;
    },

    /**
     * [createActors 创建演员]
     * @return {[void]} [无返回值]
     */
    createActors: function() {
      //创建房子
      this.house = new Background({
        width: 300,
        height: 256,
        y: STAGE_HEIGHT-370,
        speed: 5,
        ctx: this.ctx,
        image: this.images.house
      })

      //创建树
      this.tree = new Background({
        width: 300,
        height: 216,
        y: STAGE_HEIGHT-264,
        speed: 6,
        ctx: this.ctx,
        image: this.images.tree
      });

      //创建鸟
      this.bird = new Bird(this.canvas, this.ctx, this.images.bird);

      //创建地板
      this.floor = new Background({
        width: 48,
        height: 48,
        y: STAGE_HEIGHT-48,
        speed: 8,
        ctx: this.ctx,
        image: this.images.floor
      });

      //创建分数统计
      this.scoreAmount = new ScoreAmount(this.ctx, this.images.number);

    },

    /**
     * [action 演员出场]
     * @return {[void]} [无返回值]
     */
    action: function() {
      //房子
      this.house.update();
      this.house.render();

      //树
      this.tree.update();
      this.tree.render();

      //鸟
      if (this.bird) {
        this.bird.update(this.frameUtil.getCountFrames())
        if (this.bird) {
          this.bird.render();
        }
      }

      //地板
      this.floor.update();
      this.floor.render();

      //判断当前的帧数是不是60的整数倍，如果是，那么new一个新管子
      if (this.allowingNewPipe && this.frameUtil.getCountFrames() % 35 == 0) {
        this.allPipe.push(new Pipe(this.ctx, this.images));
      }

      //遍历所有的管子，让所有的管子都更新、渲染
      for (var i = 0; i < this.allPipe.length; i++) {
        this.allPipe[i].update();
        if (this.allPipe[i]) {
          this.allPipe[i].render();
        }
      }

      //分数
      this.scoreAmount.render();
    },
    pause: function() {
      var self = this;
      this.house.pause();
      this.tree.pause();
      this.floor.pause();
      if (this.bird) {
        this.bird.pause();
      }
      this.allPipe.forEach(function(item) {
        item.pause();
        self.allowingNewPipe = false;
      })
    }
  })
})();
