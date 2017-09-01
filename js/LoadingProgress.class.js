(function() {
  var PX = 'px',
    PROGRESS_WIDTH = 300;
  window.LoadingProgress = Class.extend({
    init: function(stage) {
      this.container = document.querySelector('.loading-layer');
      this.txt = document.querySelector('.loading-layer h6');
      this.stage = stage;
      this.progressBox = document.querySelector('.progress-box');
      this.progressBar = document.querySelector('.progress-bar');
      this.startGame = document.querySelector('#game_start');
      this.restartGame = document.querySelector('#game_restart');
      this.progress = 0;
      //为开始按钮绑定事件
      this.addEventToStart();
    },
    addEventToStart: function() {
      var self = this;
      this.startGame.addEventListener('click', function(e) {
        e.preventDefault();
        self.hideLoad();
      });
      this.startGame.addEventListener('touchstart', function(e) {
        e.preventDefault();
        self.hideLoad();
      });

      this.restartGame.addEventListener('click', function(e) {
        e.preventDefault();
        this.setCss({
          display: 'none'
        })
        game.restart();

      });
      this.restartGame.addEventListener('touchstart', function(e) {
        e.preventDefault();
        this.setCss({
          display: 'none'
        })
        game.restart();
      });
    },
    hideLoad: function() {
      var self = this;
      this.container.setCss({
        opacity: 0
      });
      setTimeout(function() {
        self.container.setCss({
          display: 'none'
        })
        game.start();
      }, 600);
    },
    update: function(val) {
      this.progress = val * PROGRESS_WIDTH;
    },
    render: function() {
      this.progressBar.setCss({
        left: this.progress - PROGRESS_WIDTH + PX
      })
    },
    hide: function() {
      var self = this;

      setTimeout(function() {
        //隐藏loading
        self.txt.setCss({
          display: 'none'
        });
        //隐藏进度条
        self.progressBox.setCss({
          display: 'none'
        });
        //显示开始按钮
        self.startGame.setCss({
          display: 'block'
        })
      }, 1000);
    },
    showRestart: function() {
      var topSpace = STAGE_HEIGHT / 3 + 144 / 626 * (STAGE_WIDTH / 2);
      this.restartGame.setCss({
        left: STAGE_WIDTH / 2 - 65 + PX,
        top: topSpace + 'PX',
        display: 'block'
      })
    }
  })
})();
