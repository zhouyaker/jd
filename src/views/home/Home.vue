<template>
  <div id="home">
    <div class="container">
      <!-- 头部区域 -->
      <div class="header">
        <div class="left">
          <span class="position iconfont">&#xe616;</span>
          <span class="text">北京理工大学国防科技园2号楼10层</span>
        </div>
        <div class="right"><span class="notice iconfont">&#xe70a;</span></div>
      </div>
      <!-- 搜索区域 -->
      <div class="search iconfont">
        <span>&#xe62d;</span>
        <input type="text" class="input" placeholder="山姆会员商店优惠商品">

      </div>
      <!-- banner区域 -->
      <div class="banner">
        <img src="../../assets/img/home/banner.png">
      </div>
      <!-- 首页导航 -->
      <div class="nav">
        <div class="nav-item" v-for="(item,index) in navList" :key="index">
          <img :src="item.url" alt="">
          <span class="text">{{item.text}}</span>
        </div>
      </div>
      <div class="gap" />
      <!-- 附近店铺 -->
      <div class="shop">
        <h3>附近店铺</h3>
        <div class="shop-item" v-for="(item,index) in shopList" :key="index">
          <div class="item-left">
            <img :src="item.img" alt="">
          </div>
          <div class="item-right">
            <div class="title">{{item.title}}</div>
            <div class="info">
              <span v-for="(info_item,index) in item.info" :key="index">{{info_item}}</span>
            </div>
            <div class="sale"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      navList: [
        {
          url: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843776.png',
          text: '超市便利'
        },
        {
          url: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843550.png',
          text: '菜市场'
        },
        {
          url: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843505.png',
          text: '水果店'
        },
        {
          url: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211843412.png',
          text: '鲜花绿植'
        },
        {
          url: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844276.png',
          text: '医药健康'
        },
        {
          url: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844145.png',
          text: '家具时尚'
        },
        {
          url: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844545.png',
          text: '蛋糕烘培'
        },
        {
          url: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844072.png',
          text: '签到'
        },
        {
          url: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844735.png',
          text: '打牌免运'
        },
        {
          url: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211844286.png',
          text: '红包'
        }
      ],
      shopList: [
        {
          img: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211407079.png',
          title: '沃尔玛',
          info: ['月售1万+', '起送￥0', '基础运费￥5'],
          sale: 'VIP尊享满89元减4元运费券（每月3张）'
        },
        {
          img: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211407079.png',
          title: '沃尔玛',
          info: ['月售1万+', '起送￥0', '基础运费￥5'],
          sale: 'VIP尊享满89元减4元运费券（每月3张）'
        },
        {
          img: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211407079.png',
          title: '沃尔玛',
          info: ['月售1万+', '起送￥0', '基础运费￥5'],
          sale: 'VIP尊享满89元减4元运费券（每月3张）'
        },
        {
          img: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211407079.png',
          title: '沃尔玛',
          info: ['月售1万+', '起送￥0', '基础运费￥5'],
          sale: 'VIP尊享满89元减4元运费券（每月3张）'
        },
        {
          img: 'https://markdown-1253389072.cos.ap-nanjing.myqcloud.com/202202211407079.png',
          title: '沃尔玛',
          info: ['月售1万+', '起送￥0', '基础运费￥5'],
          sale: 'VIP尊享满89元减4元运费券（每月3张）'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../style/maxin.scss';
.container {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  padding-bottom: 49rem;
  .header {
    display: flex;
    justify-content: space-between;
    padding: 16rem 20rem;
    line-height: 16rem;
    .left,
    .right {
      display: flex;
      align-items: center;
    }
    .iconfont {
      font-size: 20rem;
      margin: 0 10rem;
    }
    .text {
      display: inline-block;
      width: 250rem;
      font-size: 16rem;
      @include ellipsis;
    }
  }
  .search {
    position: relative;
    margin: 0 30rem;
    background-color: #f5f5f5;
    color: #b7b7b7;
    border-radius: 17rem;
    span {
      position: absolute;
      top: 8rem;
      left: 20rem;
      font-size: 20rem;
    }
    .input {
      margin-left: 50rem;
      width: 240rem;
      height: 34rem;
      background-color: #f5f5f5;
      font-size: 14rem;
    }
  }
  .banner {
    text-align: center;
    height: 98rem;
    img {
      width: 339rem;
      height: 86rem;
      margin-top: 12rem;
    }
  }
  .nav {
    display: flex;
    flex-wrap: wrap;
    margin-top: 16rem;
    .nav-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      flex: 20%;
      margin-bottom: 16rem;
      img {
        width: 40rem;
        height: 40rem;
        margin-bottom: 6rem;
      }
    }
  }
  .gap {
    width: 375rem;
    height: 10rem;
    background-color: #f1f1f1;
  }
  .shop {
    h3 {
      margin: 16rem 18rem 14rem;
      font-size: 18rem;
      color: #333;
    }
    .shop-item {
      display: flex;
      align-items: center;
      margin-bottom: 12rem;
      .item-left {
        margin-left: 18rem;
        img {
          width: 56rem;
          height: 56rem;
          margin-right: 16rem;
        }
      }
      .item-right {
        border-bottom: 1px solid #f1f1f1;
        .title {
          margin-bottom: 8rem;
          font-size: 16rem;
          color: #333;
        }
        .info {
          display: flex;
          span {
            font-size: 13rem;
            color: #333;
            margin-right: 16rem;
            margin-bottom: 8rem;
          }
        }
        .sale {
          font-size: 13rem;
          color: #e93b3b;
          margin-bottom: 12rem;
        }
      }
    }
  }
}
</style>