(function ($) {
  function Swiper(options, wrap) {
    this.list = options.list || [];
    this.width = options.width || $(wrap).width();
    this.height = options.height || $(wrap).height();
    this.type = options.type || "fade";
    this.autoChange =
      typeof options.autoChange === "undefined" ? true : options.autoChange;
    this.autoTime = options.autoTime || 5000;
    this.showSpotBtn =
      typeof options.showSpotBtn === "undefined" ? true : options.showSpotBtn;
    this.showChangeBtn = options.showChangeBtn || "always";
    this.spotPosition = options.spotPosition || "left";
    this.num = this.list.length;
    this.wrap = wrap;
    this.spotColor = options.spotColor || "red";
    this.nowIndex = 0;
    this.timer = null;
    this.flag = true;
  }
  Swiper.prototype.init = function () {
    this.createDom();
    this.initStyle();
    this.bindEvent();
    if (this.autoChange) {
      this.autoChangeFn();
    }
  };
  Swiper.prototype.createDom = function () {
    var swiperWrapper = $('<div class="my-swiper"></div>');
    var domList = $('<ul class="my-swiper-list"></ul>');
    var spotsBtn = $('<div class="my-swiper-spots"></div>');
    var len = this.list.length;
    for (var i = 0; i < len; i++) {
      var oLi = $('<li class="my-swiper-item"></li>');
      oLi.append(this.list[i]).appendTo(domList);
      spotsBtn.append($("<span></span>"));
    }
    if (this.type === "animation") {
      domList.append(
        $('<li class="my-swiper-item"></li>').append(
          $(this.list[0]).clone(true)
        )
      );
    }
    var leftBtn = $('<div class="my-swiper-btn my-swiper-lbtn">&lt;</div>');
    var rightBtn = $('<div class="my-swiper-btn my-swiper-rbtn">&gt;</div>');
    swiperWrapper
      .append(domList)
      .append(leftBtn)
      .append(rightBtn)
      .append(spotsBtn)
      .appendTo(this.wrap)
      .addClass("my-swiper-" + this.type);
  };
  Swiper.prototype.initStyle = function () {
    $(".my-swiper", this.wrap)
      .css({
        width: this.width,
        height: this.height,
      })
      .find(".my-swiper-list")
      .css({
        width:
          this.type === "animation" ? this.width * (this.num + 1) : this.width,
      })
      .find(".my-swiper-item")
      .css({
        width: this.width,
      })
      .end()
      .end()
      .find(".my-swiper-spots")
      .css({
        textAlign: this.spotPosition,
        display: this.showSpotBtn ? "block" : "none",
      })
      .find("span")
      .eq(this.nowIndex)
      .css({
        backgroundColor: this.spotColor,
      });
    if (this.type === "fade") {
      $(".my-swiper > .my-swiper-list > .my-swiper-item", this.wrap)
        .css({
          display: "none",
        })
        .eq(this.nowIndex)
        .css({
          display: "block",
        });
    }
    if (this.showChangeBtn === "always") {
      $(".my-swiper > .my-swiper-btn", this.wrap).css({
        display: "block",
      });
    } else if (this.showChangeBtn === "hidden") {
      $(".my-swiper > .my-swiper-btn", this.wrap).css({
        display: "none",
      });
    } else if (this.showChangeBtn === "hover") {
      $(".my-swiper > .my-swiper-btn", this.wrap).css({
        display: "none",
      });
      var self = this;
      $(".my-swiper", this.wrap).hover(
        function () {
          console.log(self);
          $(".my-swiper > .my-swiper-btn", self.wrap).css({
            display: "block",
          });
        },
        function () {
          $(".my-swiper > .my-swiper-btn", self.wrap).css({
            display: "none",
          });
        }
      );
    }
  };
  Swiper.prototype.bindEvent = function () {
    var self = this;
    $(".my-swiper > .my-swiper-lbtn", this.wrap).click(function () {
      if (self.flag) {
        self.flag = false;
      } else {
        return false;
      }
      if (self.nowIndex === 0) {
        if (self.type === "animation") {
          $(".my-swiper-list", self.wrap).css({
            left: -self.num * self.width,
          });
        }
        self.nowIndex = self.num - 1;
      } else {
        self.nowIndex--;
      }
      self.changePage();
    });
    $(".my-swiper > .my-swiper-rbtn", this.wrap).click(function () {
      if (self.flag) {
        self.flag = false;
      } else {
        return false;
      }
      if (self.type === "animation") {
        if (self.nowIndex === self.num) {
          $(".my-swiper-list", self.wrap).css({
            left: 0,
          });
          self.nowIndex = 1;
        } else {
          self.nowIndex++;
        }
      } else {
        if (self.nowIndex === self.num - 1) {
          self.nowIndex = 0;
        } else {
          self.nowIndex++;
        }
      }

      self.changePage();
    });
    $(".my-swiper-spots > span", this.wrap).mouseenter(function () {
      if (self.flag) {
        self.flag = false;
      } else {
        return false;
      }
      var index = $(this).index();
      self.nowIndex = index;
      self.changePage();
    });
    $(".my-swiper", this.wrap)
      .mouseenter(function () {
        clearInterval(self.timer);
      })
      .mouseleave(function () {
        if (self.autoChange) {
          self.autoChangeFn();
        }
      });
  };
  Swiper.prototype.changePage = function () {
    var self = this;
    if (this.type === "animation") {
      $(".my-swiper-list", this.wrap).animate(
        {
          left: -this.nowIndex * this.width,
        },
        function () {
          self.flag = true;
        }
      );
    } else {
      $(".my-swiper-list > .my-swiper-item", this.wrap)
        .fadeOut()
        .eq(this.nowIndex)
        .fadeIn(function () {
          self.flag = true;
        });
    }
    $(".my-swiper-spots > span", this.wrap)
      .css({
        backgroundColor: "#fff",
      })
      .eq(this.nowIndex % this.num)
      .css({
        backgroundColor: this.spotColor,
      });
  };
  Swiper.prototype.autoChangeFn = function () {
    var self = this;
    clearInterval(this.timer);
    this.timer = setInterval(function () {
      $(".my-swiper > .my-swiper-rbtn", self.wrap).trigger("click");
    }, this.autoTime);
  };

  $.fn.extend({
    swiper: function (options) {
      var obj = new Swiper(options, this);
      obj.init();
    },
  });
})($ || jQuery);
