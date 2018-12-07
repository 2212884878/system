<!--拖动验证组件-->
<template>
  <div class="movebox">
    <div class="movego"></div>
    <div class="txt" id="txt">按住滑块,拖动到最右边</div>
    <div class="move moveBefore" v-move ></div>
  </div>
</template>
<script>
export default {
  directives: {
    move(el) {
      el.onmousedown = function(e) {
        var X = e.clientX - el.offsetLeft;
        document.onmousemove = function(e) {
          var endx = e.clientX - X;
          el.className = "move moveBefore";
          el.style.left = endx + "px";
          // console.log(el.parentNode.children[0])
          var width = document.querySelector(".movebox").offsetWidth - document.querySelector(".move").offsetWidth;
          el.parentNode.children[0].style.width = endx + "px";
          el.parentNode.children[1].innerHTML = "按住滑块,拖动到最右边";
          //临界值小于
          if (endx <= 0) {
            el.style.left = 0 + "px";
            el.parentNode.children[0].style.width = 0 + "px";
            //document.querySelector('.movego').width(0)
          }
          //临界值大于
          // console.log(el.style.left)
          if (parseInt(el.style.left) >= width) {
            el.style.left = width + "px";
            el.parentNode.children[0].style.width = width + "px";
            el.parentNode.children[1].innerHTML = "<span style='color:#fff'>验证通过</span>";
            el.className = "move moveSuccess";
            el.onmousedown = null;
            //利用session判断状态
            sessionStorage.setItem("move","1");
          }
        };
      };
      document.onmouseup = function() {
        document.onmousemove = null;
      };
    }
  },
  mounted(){
    sessionStorage.removeItem("move")
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.movebox {
  position: relative;
  background-color: #e8e8e8;
  width: 350px;
  height: 40px;
  line-height: 40px;
  text-align: center;

  .txt {
    position: absolute;
    top: 0px;
    width: 350px;
    -moz-user-select: none;
    -webkit-user-select: none;
    user-select: none;
    -o-user-select: none;
    -ms-user-select: none;
    font-size: 12px;
    color: #999;
  }
  .movego {
    background-color: #f37b3a;
    height: 40px;
    width: 0px;
  }
  .move {
    position: absolute;
    top: 0px;
    left: 0px;
    width: 40px;
    height: 40px;
    border: 1px solid #ccc;
    cursor: move;
    border-radius: 4px;
  }
  .moveBefore {
    background:#fff url(../assets/hua.png) no-repeat center;
  }
  .moveSuccess {
    background: #fff url(../assets/tongguo.png) no-repeat center;
  }
}
</style>
