<template>
<div class="BOX">
  <el-container class="jbb-one">
    <el-header class="text-center">
      <el-row :gutter="20" type="flex" justify="space-around">
        <el-col :span="9">
          <div class="logo">
            <h1>JBB.ONE</h1>
            <div class="line"></div>
            <div class="title"></div>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="progress" v-if="JSON.stringify(get_account)!='{}'">
            <div class="cpu">
              <p class="con">CPU可用 </p>
              <el-progress type="circle" :stroke-width="3" :width="48" :percentage="typeCount(get_account.cpu_limit.available,get_account.cpu_limit.max)"></el-progress>
            </div>
            <div class="net">
              <p class="con">net可用 </p>
              <el-progress type="circle" :percentage="typeCount(get_account.net_limit.available , get_account.net_limit.max)" :stroke-width="3" :width="48"></el-progress>
            </div>
            <p class="con"> EOS余额 : {{get_account.core_liquid_balance}} </p>
          </div>
        </el-col>
        <el-col :span="3">
          <el-button v-if="JSON.stringify(get_account)=='{}'" round size="small" plain type="info" class="login" @click="login">statter登录</el-button>
          <el-dropdown v-else @command="logout">
            <span class="el-dropdown-link">
              <el-button round size="small" plain type="danger" class="logout"> 欢迎 {{get_account.account_name}} </el-button>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>退出</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
    </el-header>
    <el-main class="content" id="appBody">
      <el-row :gutter="40">
        <el-col :span="14">
          <div class="mining">
            <h3>挖矿区</h3>
            <ul class="mininglist">
              <li v-for="(item , index) in miningList" :key="index">
                <div class="bg"></div>
                <div class="con">
                  <div class="top">
                    <el-row type="flex" class="row-bg" justify="space-around">
                      <el-col :span="3">
                        <div class="title poker" :class="item.type">
                          <div class="logo"></div>
                          <div class="connter">{{item.type}}</div>
                        </div>
                      </el-col>
                      <el-col :span="1">
                        <el-tooltip class="item" effect="dark" content="点击可查看游戏介绍" placement="top">
                          <div class="help" @click="isShowIntroduce = true"></div>
                        </el-tooltip>
                      </el-col>
                      <el-col :span="1">
                        <el-tooltip class="item" effect="dark" content="点击可查看分红记录" placement="top">
                          <div class="profit" @click="isShowRecord = true"></div>
                        </el-tooltip>
                      </el-col>
                      <el-col :span="6">
                        <div class="recommend">推荐返利：{{item.recommend}} EOS</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="wktotal">
                          <span>挖矿总数：{{item.wktotal}} POKER</span>
                          <p>≈ 1234.4567 EOS</p>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div class="determined">游戏盈亏：{{item.determined}} EOS</div>
                      </el-col>
                      <el-col :span="1">
                        <el-tooltip :content="item.signal == true ? '正常运行':'运行异常'" placement="top" v-if="item.start">
                          <div class="state" v-if="item.signal" @click="isShowAlert = true"></div>
                          <div class="state ac" @click="isShowAlert = true" v-else></div>
                        </el-tooltip>
                      </el-col>
                    </el-row>
                  </div>
                  <div class="region">
                    <el-row :gutter="40">
                      <el-col :span="4">
                        <div class="title">总局数</div>
                      </el-col>
                      <el-col :span="7">
                        <div class="result">{{item.totalResult}}</div>
                      </el-col>
                      <el-col :span="6">
                        <div>
                          <p>推荐人(90%概率)</p>
                          <el-input placeholder="推荐人" v-model="item.referrals" clearable></el-input>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div>
                          <p>保留余额</p>
                          <el-input placeholder="保留余额" v-model="item.balanceUnder" clearable>
                            <template slot="append">EOS
</template>
                          </el-input>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="4">
                        <div class="title sl">胜率</div>
                      </el-col>
                      <el-col :span="7">
                        <div class="result">{{item.slResult}}%</div>
                      </el-col>
                      <el-col :span="6">
                        <div class="multiple">
                          <p>策略</p>
                          <el-select v-model="item.opValue">
                            <el-option
                              v-for="b in item.options"
                              :key="b.value"
                              :label="b.label"
                              :value="b.value">
                            </el-option>
                          </el-select>
                          <el-tooltip placement="right" effect="light" v-if="item.opValue == 1">
                            <div slot="content" style="color:#333;line-height:22px;">
                              <p>倍投说明：</p>
                              <p>1、如果输了，则下一局的下注额为前一局下注额乘以倍投倍数；</p>
                              <p>2、如果赢了，则下一局的下注额回到起始下注额。</p>
                            </div>
                            <i></i>
                          </el-tooltip>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div v-if="item.opValue == 1">
                          <p>倍投倍数</p>
                          <el-input placeholder="倍投倍数" v-model="item.opKeyValue" clearable>
<template slot="append">
 倍
</template>
                          </el-input>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="4">
                        <div class="title spf">{{item.spfTitle}}</div>
                      </el-col>
                      <el-col :span="7">
                        <div class="result">{{item.spfResult}}</div>
                      </el-col>
                      <el-col :span="6">
                        <div>
                          <p>投注点数</p>
                          <el-input placeholder="投注点数" v-model="item.rollUnder" clearable></el-input>
                        </div>
                      </el-col>
                      <el-col :span="6">
                        <div>
                          <p>投注金额</p>
                          <el-input placeholder="投注金额" v-model="item.betamount" clearable>
<template slot="append">
 EOS
</template>
                          </el-input>
                        </div>
                      </el-col>
                    </el-row>
                    <el-row :gutter="40">
                      <el-col :span="4">
                        <div class="title lasttime">最近一局</div>
                      </el-col>
                      <el-col :span="7">
                        <div class="result lasttime">{{item.lastTime}}</div>
                      </el-col>
                      <el-col :span="12">
                        <div class="operation">
                          <div class="btn" :class="{ac:item.start}" @click="startFn(item)">{{item.start == true ? '暂停挖矿':'开始挖矿'}}</div>
                          <span class="start">{{item.start == true ? '正在挖矿':'等待开始'}}</span>
                          <p class="balance" >{{item.type}} 剩余 : {{item.currencySupply}}</p>
                        </div>
                      </el-col>
                    </el-row>
                  </div>
                </div>
              </li>
            </ul>
          </div>
        </el-col>
        <el-col :span="10">
          <div class="record">
            <h3>挖矿记录</h3>
            <div class="switch clearfix">
              <div class="left f-left" @click="switchFn('left')"><i class="el-icon-arrow-left"></i></div>
              <div class="f-right" @click="switchFn('right')"><i class="el-icon-arrow-right"></i></div>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
              <el-tab-pane :label="item.label" :name="item.name" v-for="(item , index) in recordList" :key="index">
                <div class="recordlist">
                  <div class="bg"></div>
                  <div class="connter">
                    <el-table
                      :data="item.tableData"
                      style="width: 100%">
                      <el-table-column
                        prop="date"
                        label="时间"
                        width="180">
                      </el-table-column>
                      <el-table-column
                        prop="quota"
                        label="下注额">
                      </el-table-column>
                      <el-table-column
                        prop="result"
                        label="结果">
                      </el-table-column>
                      <el-table-column
                        prop="reward"
                        sortable
                        label="奖励">
                      </el-table-column>
                    </el-table>
                    <div class="page">
                      <el-pagination @size-change="pageSize" 
                        @current-change="pageCurrent"
                        background
                        layout="prev, pager, next"
                        prev-text="上一页"
                        next-text="下一页"
                        :total="30">
                      </el-pagination>
                    </div>
                  </div>
                </div>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
      </el-row>
      <footer class="footer">Copyright © 2018, JBB.ONE Team. All rights reserved</footer>
    </el-main>
  </el-container>
  <div class="layer" v-if="isShowAlert">
    <div class="mask"></div>
    <div class="alertTemp animZoomIn">
      <i class="el-icon-close"  @click="isShowAlert = false"></i>
      <div class="title">警告</div>
      <div class="msg">CPU不足或网络堵塞，下注速度较慢</div>
      <div class="btn" @click="isShowAlert = false">我知道了</div>
    </div>
  </div>
  <div class=" layer" v-if="isShowIntroduce">
    <div class="mask"></div>
    <div class="introduce animZoomIn">
      <i class="el-icon-close"  @click="isShowIntroduce = false"></i>
      <span class="expo">扑克类</span>
      <div class="title">POKER游戏介绍
        <a href="javascript:;">前往官网</a>
      </div>
      <div class="msg">
        <el-row :gutter="30">
          <el-col :span="12">
            <div class="con clearfix">
              <p class="f-left">总币量：</p>
              <span class="f-left">1000万 POKER</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="con clearfix">
              <p class="f-left">24H用户：</p>
              <span class="f-left">492</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="con clearfix">
              <p class="f-left">挖矿奖励：</p>
              <span class="f-left">80%(已挖30%300万)</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="con clearfix">
              <p class="f-left">矿工量：</p>
              <span class="f-left">246(50.00%)</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="con clearfix">
              <p class="f-left">当前倍数：</p>
              <span class="f-left">1EOS ：0.1POKER</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="con clearfix">
              <p class="f-left">24H交易：</p>
              <span class="f-left">1,492,345.0984</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="con clearfix">
              <p class="f-left">当前价格：</p>
              <span class="f-left">0.1345 EOS</span>
            </div>
          </el-col>
          <el-col :span="12">
            <div class="con clearfix">
              <p class="f-left">矿工交易：</p>
              <span class="f-left">892,345.0984(67.43%)</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="describe">
        <h3>游戏介绍</h3>
        <p>1、21点，点数大赢 </p>
        <p>2、每日分红(需质押)</p>
      </div>
      <div class="btn" @click="isShowIntroduce = false">我知道了</div>
    </div>
  </div>
  <div class="layer" v-if="isShowRecord">
    <div class="mask"></div>
    <div class="recordTemp animZoomIn">
      <i class="el-icon-close"  @click="isShowRecord = false"></i>
      <div class="title">
        POKER分红记录
        <span>以EOS分红</span>
      </div>
      <div class="con">
        <el-table
          :data="isrecordList"
          :height="330"
          style="width: 100%">
          <el-table-column
            prop="date"
            label="时间">
          </el-table-column>
          <el-table-column
            prop="quota"
            label="分红量/万币">
          </el-table-column>
        </el-table>
      </div>
      <div class="page">
        <el-pagination @size-change="pageSize" 
          @current-change="pageCurrent"
          background
          layout="prev, pager, next"
          prev-text="上一页"
          next-text="下一页"
          :total="30">
        </el-pagination>
      </div>
    </div>
  </div>
  <BackTop :bodyId="'appBody'"></BackTop>
</div>
</template>
<script type="text/javascript">
import EOS from "eosjs";
import BackTop from "@/m/back-top/back-top";
export default {
  name: "home",
  data() {
    return {
      isRun: false,
      getAccountTimer: null,
      get_account: {},
      EOS_CONFIG: {
        contractName: "xyz",
        contractSender: "xyz",
        network: {
          protocol: "https",
          blockchain: "eos",
          host: "node.betdice.one",
          port: "",
          chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906"
        },
        eosOptions: {}
      },
      eos: null,
      identity: null,
      activeName: "poker",
      swichIndex: 0,
      switchList: ["poker", "roll", "svn", "dice", "bet"],
      recordList: [{
        label: "POKER",
        name: "poker",
        tableData: [{
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.96'
        }, {
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.96'
        }, {
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.96'
        }]
      }, {
        label: "ROLL",
        name: "roll",
        tableData: [{
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.56'
        }, {
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.96'
        }, {
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.93'
        }]
      }, {
        label: "SVN",
        name: "svn",
        tableData: [{
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.98'
        }, {
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.96'
        }, {
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.99'
        }]
      }, {
        label: "DICE",
        name: "dice",
        tableData: [{
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.56'
        }, {
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.26'
        }, {
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '1.96'
        }]
      }, {
        label: "BET",
        name: "bet",
        tableData: [{
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '2.96'
        }, {
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '3.96'
        }, {
          date: '2016/05/02 11:12:13',
          quota: '1.0000',
          result: '20/负',
          reward: '4.96'
        }]
      }],
      miningList: [{
          type: "DICE",
          recommend: "124.4567", // 推荐返利
          wktotal: "12334.4567", // 挖矿总数 POKER
          determined: "22324.4567", // 游戏盈亏EOS
          signal: false, // 脚本运行状态
          totalResult: "4820", // 总局数
          slResult: "95.42", // 胜率
          spfTitle: '胜/负',
          spfResult: '1005/40', // 胜/负
          lastTime: '2018/11/10 22:22:22', // 最近一局
          start: false, // 是否运行
          opValue: 1, // 策略值 配置
          options: [{
            value: 0,
            label: "无"
          }, {
            value: 1,
            label: "倍投"
          }],
          opKeyValue: 2, // 倍投倍数
          referrals: 'winninetysix', // 推荐人
          balanceUnder: 0, // 保留余额
          rollUnder: 96, // 投注点数
          betamount: '1.0000', // 投注金额
          currencySupply: 0 // 当前提供的token数量。
        },
        {
          type: "SVN",
          recommend: "124.4567",
          wktotal: "12334.4567",
          determined: "22324.4567",
          signal: true,
          totalResult: "4820",
          slResult: "95.42",
          spfTitle: '胜/平/负',
          spfResult: '1005/40/6',
          lastTime: '2018/11/10 22:22:22',
          start: false,
          opValue: 0,
          options: [{
            value: 0,
            label: "无"
          }, {
            value: 1,
            label: "倍投"
          }],
          opKeyValue: 2,
          referrals: 'winninetysix',
          balanceUnder: 0,
          rollUnder: 96,
          betamount: '1.0000',
          currencySupply: 0
        },
        {
          type: "ROLL",
          recommend: "124.4567",
          wktotal: "12334.4567",
          determined: "22324.4567",
          signal: true,
          totalResult: "4820",
          slResult: "95.42",
          spfTitle: '胜/平/负',
          spfResult: '1005/40/6',
          lastTime: '2018/11/10 22:22:22',
          start: false,
          opValue: 0,
          options: [{
            value: 0,
            label: "无"
          }, {
            value: 1,
            label: "倍投"
          }],
          opKeyValue: 2,
          referrals: 'winninetysix',
          balanceUnder: 0,
          rollUnder: 96,
          betamount: '1.0000',
          currencySupply: 0
        }
      ],
      isShowAlert: false,
      isShowIntroduce: false,
      isShowRecord: false,
      isrecordList: [{
          date: "2018/11/04  11:00:00",
          quota: " 12.3143"
        },
        {
          date: "2018/11/04  11:00:00",
          quota: " 12.3143"
        },
        {
          date: "2018/11/04  11:00:00",
          quota: " 12.3143"
        },
        {
          date: "2018/11/04  11:00:00",
          quota: " 12.3143"
        },
        {
          date: "2018/11/04  11:00:00",
          quota: " 12.3143"
        },
        {
          date: "2018/11/04  11:00:00",
          quota: " 12.3143"
        },
        {
          date: "2018/11/04  11:00:00",
          quota: " 12.3143"
        },
        {
          date: "2018/11/04  11:00:00",
          quota: " 12.3143"
        },
        {
          date: "2018/11/04  11:00:00",
          quota: " 12.3143"
        },
        {
          date: "2018/11/04  11:00:00",
          quota: " 12.3143"
        }
      ]
    };
  },
  mounted() {
    
  },
  methods: {
    login() {
      this.getCurrencyStats();
      return
      let isChrome = navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Safari") > -1;
      if (!isChrome) {
        this.$notify.error({
          title: "错误信息",
          message: "请使用谷歌浏览器登录!",
          duration: 0
        });
        return;
      }
      if (!scatter) {
        this.$notify.error({
          title: "错误信息",
          message: "请安装Scatter插件后进行登录",
          duration: 0
        });
        return;
      }
      if (!scatter.eth) {
        this.$notify.error({
          title: "错误信息",
          message: "请安装Scatter插件后进行登录",
          duration: 0
        });
        return;
      }
      scatter.connect("DICEEOSHELPER").then(connected => {
        let _this = this;
        this.open(
          function() {
            _this.eos.getAccount({
              account_name: _this.identity.accounts[0].name
            }).then(res => {
              _this.get_account = res;
              _this.$message({
                message: "登录成功",
                type: "success"
              });

              clearInterval(_this.getAccountTimer);
              _this.getAccountTimer = null;

              // _this.getAccountTimer = setInterval(() => {
              //   _this.getAccount();
              // }, 2000);

              // _this.getCurrencyBalance(res.account_name,'eoseventoken','SVN');
              // _this.getCurrencyBalance(res.account_name,'betdicetoken','DICE');

            }).catch(err => {
              _this.$notify.error({
                title: "登录出错",
                message: "检查账号出错,请确认EOS账号是否正确"
              });
            });

          },
          function(error) {
            _this.$notify.error({
              title: "登录出错",
              message: "请重新登录"
            });
          }
        );
      }).catch(error => {
        this.$notify.error({
          title: "错误信息",
          message: "请安装Scatter插件后进行登录",
          duration: 0
        });
      });
    },
    getCurrencyBalance(account, code, symbol) {
      this.eos.getCurrencyBalance({
          account: account,
          code: code,
          symbol: symbol // EOS
        })
        .then(res => {
          console.log(`获取成功：${JSON.stringify(res)}`);
        }).catch(err => {
          console.log(err)
        });
    },
    getCurrencyStats() {
      const stats = [{
          code: 'betdicetoken',
          symbol: 'DICE'
        },
        {
          code: 'eoseventoken',
          symbol: 'SVN'
        },
        {
          code: 'luckymetoken',
          symbol: 'ROLL'
        }
      ]
      for (let index = 0; index < this.miningList.length; index++) {
        if (stats[index].symbol == this.miningList[index].type) {

          this.eos.getCurrencyStats({
              code: stats[index].code,
              symbol: stats[index].symbol
            })
            .then(res => {
              // console.log(`获取成功：${JSON.stringify(res)}`);
              console.log(`${stats[index].symbol}---${JSON.stringify(res)}`)
              this.miningList[index].currencySupply = res[stats[index].symbol].supply
            }).catch(err => {
              console.log(err)
            });
        }
      }
    },
    getAccount() {
      this.eos.getAccount({
        account_name: this.identity.accounts[0].name
      }).then(res => {
        this.get_account = res;
        // console.log(`登录成功：${JSON.stringify(this.identity)}`);
      }).catch(err => {
        this.$notify.error({
          title: "登录出错",
          message: "检查账号出错,请确认EOS账号是否正确"
        });
      });
    },
    typeCount(available, max) {
      if (available && max) {
        let result = (available * 100 / max).toFixed(0);
        return Number(result);
      } else {
        return 0;
      }
    },
    open(successCallback, errorCallbak) {
      scatter.suggestNetwork(this.EOS_CONFIG.network)
        .then(() => {
          const requirements = {
            accounts: [this.EOS_CONFIG.network]
          };
          let _this = this;
          scatter.getIdentity(requirements)
            .then(function(i) {
              if (!i) {
                return errorCallbak(null);
              }
              _this.identity = i;
              _this.eos = scatter.eos(
                _this.EOS_CONFIG.network,
                EOS,
                _this.EOS_CONFIG.eosOptions,
                _this.EOS_CONFIG.network.protocol
              );
              successCallback();
            })
            .catch(error => {
              errorCallbak(error);
            });
        })
        .catch(error => {
          errorCallbak(error);
        });
    },
    logout() {
      if (this.isRun) {
        this.$message.error('请先停止挖矿!');
        return;
      }
      this.$confirm("是否退出当前账号?", "温馨提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        })
        .then(() => {
          clearInterval(this.getAccountTimer);
          this.getAccountTimer = null;
          this.identity = null;
          if (scatter) {
            scatter.forgetIdentity().then(() => {
              this.get_account = {};
              this.$message({
                message: "退出成功",
                type: "success"
              });
            });
          }
        })
        .catch(() => {});
    },
    handleClick(tab, event) {
      this.swichIndex = tab.index;
      console.log(tab, event);
    },
    startFn(val) {
      if (!this.identity) {
        this.$message.error('请先登录！');
        return;
      }

      if (this.typeCount(this.get_account.cpu_limit.available, this.get_account.cpu_limit.max) == 0) {
        if (!val.start) {
          this.$message.error('CPU不足！');
          return;
        }
      }

      val.start = !val.start;
      this.isRun = !this.isRun;

      if (val.start) {

        switch (val.type) {
          case 'DICE':
            this.diceBetting(val)
            break;
          case 'ROLL':
            this.$message.success('开始ROLL挖矿');
            break;
          default:
            break;
        }
      }
    },
    diceBetting(val) {
      let data = {
        to: 'betdiceadmin', // 收件人
        quantity: `${val.betamount} EOS`, // 资产
        memo: this.createMemo(18, val.rollUnder, val.referrals) // 备注
      };
      const account = this.identity.accounts.find(x => x.blockchain === this.EOS_CONFIG.network.blockchain);
      const transactionOptions = {
        authorization: [`${account.name}@${account.authority}`],
        broadcast: true,
        sign: true
      };
      console.log(data)
      console.log(account)
      console.log(transactionOptions)
      return
      this.eos.transfer(account.name, data.to, data.quantity, data.memo, transactionOptions).then(trx => {
        console.log(`${new Date()} 交易ID: ${trx.transaction_id}`);
      }).catch(error => {
        this.$message.error(`${new Date()} 发现错误：${error.error.details[0].message}`);
      });

    },
    createMemo(t, rollUnder, referralsaccount) {
      let n = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890';
      let e = '';
      for (let o = 0; o < t; o++) {
        e += n.charAt(Math.floor(Math.random() * n.length));
      }
      return `action:bet,seed:${e},rollUnder:${rollUnder},ref:${referralsaccount || 'winninetysix'}`
    },
    switchFn(val) {
      switch (val) {
        case 'left':
          this.swichIndex--;
          if (this.swichIndex == -1) {
            this.swichIndex = this.switchList.length - 1;
          }
          break;
        case 'right':
          this.swichIndex++;
          if (this.swichIndex == this.switchList.length) {
            this.swichIndex = 0;
          }
          break;
      }
      this.activeName = this.switchList[this.swichIndex];
    },
    pageSize(val) {
      console.log(val)
    },
    pageCurrent(val) {
      console.log(val)
    }
  },
  components: {
    BackTop
  }
};
</script>
<style type="text/css" scoped lang="less">
.jbb-one {
  width: 100%;
  height: 100%;
}

header {
  width: 100%;
  height: 70px !important;
  background: #414453;
  color: #fff;
  .logo {
    width: 100%;
    height: 100%;
    display: flex;
    h1 {
      text-indent: -999px;
      width: 168px;
      height: 22px;
      background: url(~@/assets/img/JBB.png) no-repeat;
      background-size: 100% 100%;
      margin: 26px 30px 0 0;
    }
    .line {
      width: 58px;
      height: 70px;
      background: url(~@/assets/img/logo-line.png) no-repeat;
      background-size: auto 100%;
    }
    .title {
      width: 276px;
      height: 20px;
      background: url(~@/assets/img/title.png) no-repeat;
      background-size: 100% 100%;
      margin: 26px 0 0 20px;
    }
  }
  .progress {
    padding-top: 14px;
    height: 100%;
    display: flex;
    p.con {
      margin-right: 20px;
      margin-left: 50px;
      font-size: 18px;
      line-height: 2.7;
    }
    .cpu {
      display: flex;
    }
    .net {
      display: flex;
    }
  }
  .login {
    background: none;
    color: #fff;
    font-size: 16px;
    margin-top: 18px;
  }
  .logout {
    font-size: 18px;
    margin-top: 20px;
  }
}

.content {
  padding: 50px 7% 10px 7%;
  box-sizing: border-box;
  background: url(~@/assets/img/BG.jpg) no-repeat #121528;
  background-size: 100% auto;
  h3 {
    width: 150px;
    height: 38px;
    background: url(~@/assets/img/region.png) no-repeat;
    background-size: 100% 100%;
    text-align: center;
    font-size: 26px;
    line-height: 38px;
    font-weight: 400;
    font-style: italic;
    margin-bottom: 32px;
  }
  .mining {
    width: 100%;
    .mininglist {
      width: 100%;
      li {
        width: 100%;
        height: 440px;
        position: relative;
        border: 2px solid rgba(255, 255, 255, .4);
        border-radius: 10px;
        margin-bottom: 30px;
        .bg {
          width: 100%;
          height: 100%;
          background: #5C5C5C;
          opacity: 0.4;
          position: absolute;
          left: 0;
          top: 0;
        }
        .con {
          width: 100%;
          height: 100%;
          position: absolute;
          left: 0;
          top: 0;
          padding: 10px 36px;
          .top {
            width: 100%;
            height: 50px;
            border-bottom: 2px solid rgba(255, 255, 255, .4);
            margin-bottom: 20px;
            .title {
              font-size: 18px;
              font-family: MicrosoftYaHei-Bold;
              font-weight: bold;
              padding-top: 9px;
              display: flex;
            }
            .poker {
              .connter {
                background: linear-gradient(-90deg, rgba(196, 113, 245, 1) 0%, rgba(250, 113, 205, 1) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent
              }
              .logo {
                width: 20px;
                height: 20px;
                background: url(~@/assets/img/ROLL.png) no-repeat left center;
                background-size: 20px 20px;
                margin: 2px 8px 0 2px;
              }
            }
            .ROLL {
              .connter {
                background: linear-gradient( -90deg, rgba(79, 172, 254, 1) 0%, rgba(0, 242, 254, 1) 100%);
                -webkit-background-clip: text;
                -webkit-text-fill-color: transparent;
              }
              .logo {
                width: 20px;
                height: 20px;
                background: url(~@/assets/img/POKER.png) no-repeat left center;
                background-size: 20px 20px;
                margin: 2px 8px 0 2px;
              }
            }
            .help {
              width: 20px;
              height: 20px;
              background: url(~@/assets/img/help.png) no-repeat;
              background-size: 100% 100%;
              margin-top: 10px;
              cursor: pointer;
            }
            .profit {
              width: 20px;
              height: 20px;
              background: url(~@/assets/img/profit.png) no-repeat;
              background-size: 100% 100%;
              margin-top: 10px;
              cursor: pointer;
            }
            .state {
              width: 18px;
              height: 18px;
              background: url(~@/assets/img/normal.png) no-repeat;
              background-size: 100% 100%;
              margin: 10px 0 0 18px;
              cursor: pointer;
              animation: twinkling 2s infinite ease-in-out;
              &.ac {
                background: url(~@/assets/img/warning.png) no-repeat;
                background-size: 100% 100%;
              }
            }
            .recommend {
              padding: 12px 0 0 10px;
            }
            .wktotal {
              padding-top: 4px;
              p {
                font-size: 10px;
                padding: 2px 0 0 70px;
              }
            }
            .determined {
              padding: 10px 0 0 10px;
            }
          }
          .region {
            .el-row {
              margin: 10px 0 20px 0;
            }
            .title {
              margin-top: 10px;
              font-size: 14px;
              font-weight: bold;
              background: url(~@/assets/img/total.png) no-repeat left 14px;
              background-size: 20px 18px;
              padding: 14px 0 0 30px;
              &.sl {
                background: url(~@/assets/img/probability.png) no-repeat left 14px;
                background-size: 20px 18px;
                padding: 14px 0 0 30px;
              }
              &.spf {
                background: url(~@/assets/img/result.png) no-repeat left 15px;
                background-size: 18px 17px;
                padding: 14px 0 0 30px;
              }
              &.lasttime {
                background: url(~@/assets/img/time.png) no-repeat left 15px;
                background-size: 18px 17px;
                padding: 14px 0 0 30px;
              }
            }
            .result {
              margin-top: 12px;
              font-size: 26px;
              font-weight: bold;
              font-family: DIN;
              &.lasttime {
                margin-top: 20px;
                font-size: 18px;
              }
            }
            .multiple {
              position: relative;
              i {
                width: 20px;
                height: 20px;
                background: url(~@/assets/img/respo.png) no-repeat;
                background-size: 20px 20px;
                position: absolute;
                right: -30px;
                top: 34px;
              }
            }
            p {
              margin-bottom: 6px;
              &.balance {
                margin-bottom: 0;
                line-height: 40px;
              }
            }
            span.start {
              color: #ffd31d;
            }
            .operation {
              margin-top: 10px;
              .btn {
                width: 120px;
                height: 38px;
                display: inline-block;
                background: url(~@/assets/img/btn.png) no-repeat;
                background-size: 100% 100%;
                color: #444;
                line-height: 38px;
                text-align: center;
                cursor: pointer;
                font-family: MicrosoftYaHei-Bold;
                font-weight: bold;
                margin-right: 20px;
                margin-bottom: 6px;
                &.ac {
                  background: url(~@/assets/img/ac-btn.png) no-repeat;
                  background-size: 100% 100%;
                  color: #666;
                }
                &:hover {
                  background: url(~@/assets/img/ac-btn.png) no-repeat;
                  background-size: 100% 100%;
                  color: #666;
                }
              }
            }
          }
        }
      }
    }
  }
  .record {
    position: relative;
    .el-tabs__item {
      font-size: 18px;
      color: #fff;
      font-weight: 400;
    }
    .recordlist {
      width: 100%;
      height: 698px;
      border: 2px solid rgba(255, 255, 255, .4);
      border-radius: 10px;
      position: relative;
      .bg {
        width: 100%;
        height: 100%;
        background: #5C5C5C;
        opacity: 0.4;
        position: absolute;
        left: 0;
        top: 0;
      }
      .connter {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        padding: 20px 30px;
      }
    }
    .switch {
      position: absolute;
      right: 14px;
      top: 70px;
      width: 60px;
      height: 28px;
      border: 2px solid rgba(255, 255, 255, 1);
      border-radius: 4px;
      z-index: 99;
      div {
        width: 50%;
        height: 100%;
        cursor: pointer;
        text-align: center;
        line-height: 26px;
        opacity: .8;
        &:hover {
          opacity: 1;
        }
      }
      .left {
        border-right: 1px solid #fff;
      }
    }
    .page {
      position: absolute;
      right: 10%;
      bottom: 5%;
    }
  }
}

@keyframes twinkling {
  20% {
    opacity: 0.9;
    -webkit-transform: scale(1);
  }
  50% {
    opacity: 1;
    -webkit-transform: scale(1.12);
  }
  100% {
    opacity: 0.9;
    -webkit-transform: scale(1);
  }
}

@keyframes zoomIn {
  from {
    opacity: 0;
    -webkit-transform: scale3d(0.3, 0.3, 0.3);
    transform: scale3d(0.3, 0.3, 0.3);
  }
  50% {
    opacity: 1;
  }
}

.animZoomIn {
  animation: zoomIn 0.5s;
}

.BOX {
  width: 100%;
  height: 100%;
}

footer.footer {
  width: 100%;
  text-align: center;
  margin-top: 100px;
}

.layer {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  .mask {
    width: 100%;
    height: 100%;
    background: #000;
    opacity: .4;
  }
  .btn {
    width: 100px;
    height: 36px;
    background: rgba(255, 211, 29, 1);
    border-radius: 4px;
    position: absolute;
    bottom: 20px;
    left: 50%;
    margin-left: -50px;
    cursor: pointer;
    line-height: 36px;
    color: #333;
    &:hover {
      background: #ffb21d;
    }
  }
  i {
    position: absolute;
    right: 16px;
    top: 16px;
    font-size: 30px;
    cursor: pointer;
    &:hover {
      color: #ffd31d;
    }
  }
  .title {
    width: 100%;
    font-size: 18px;
    border-bottom: 1px solid #fff;
    line-height: 60px;
  }
  .alertTemp {
    width: 450px;
    height: 260px;
    background: #30313D;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: fixed;
    left: 50%;
    margin-left: -225px;
    top: 32%;
    padding: 0 20px 10px 20px;
    text-align: center;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    .msg {
      width: 100%;
      height: 90px;
      margin: 20px auto;
      padding-top: 20px;
      font-size: 16px;
    }
  }
  .introduce {
    width: 612px;
    height: 480px;
    background: #30313D;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: fixed;
    left: 50%;
    margin-left: -306px;
    top: 20%;
    padding: 0 20px 10px 20px;
    text-align: center;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    .expo {
      position: absolute;
      left: 26px;
      top: 24px;
    }
    .title {
      text-indent: 2em;
    }
    a {
      font-size: 14px;
      color: #FFD31D;
      margin-left: 20px;
      font-weight: normal;
      &:hover {
        color: #ffb21d;
      }
    }
    .msg {
      width: 100%;
      padding-top: 30px;
      padding-bottom: 26px;
      border-bottom: 1px solid #fff;
      .con {
        line-height: 36px;
      }
      p {
        width: 100px;
        text-align: right;
      }
      span {
        opacity: .8;
        margin-left: 2px;
        ;
        font-weight: normal;
      }
    }
    .describe {
      width: 100%;
      text-align: left;
      padding: 20px 0 0 10px;
      h3 {
        font-size: 16px;
        font-weight: normal;
        margin-bottom: 10px;
      }
      p {
        line-height: 30px;
        font-weight: normal;
      }
    }
  }
  .recordTemp {
    width: 612px;
    height: 480px;
    background: #30313D;
    border: 1px solid rgba(255, 255, 255, 1);
    border-radius: 10px;
    position: fixed;
    left: 50%;
    margin-left: -306px;
    top: 20%;
    padding: 0 20px 10px 20px;
    text-align: center;
    font-family: MicrosoftYaHei-Bold;
    font-weight: bold;
    .title {
      text-indent: 2em;
      span {
        font-size: 14px;
        margin-left: 20px;
      }
    }
    .con {
      width: 100%;
      font-weight: normal;
    }
    .page {
      position: absolute;
      right: 30px;
      bottom: 20px;
    }
  }
}
</style>
<style lang="less">
.progress .el-progress__text {
  color: #fff !important;
}

.progress svg>path:first-of-type {
  stroke: #fff !important;
}

.progress .cpu svg>path:last-of-type {
  stroke: #f04134 !important;
}

.progress .net svg>path:last-of-type {
  stroke: #00a854 !important;
}

.region .el-input-group__append {
  color: #999 !important;
  font-weight: 400 !important;
  background-color: #fff !important;
  padding: 0 10px 0 0 !important;
  border: none !important;
}

.region .el-input__inner {
  border: none !important;
  padding: 0 0 0 15px !important;
}

.record .el-tabs__item.is-active {
  color: #FFD31D !important;
}

.record .el-tabs__item:hover {
  color: #FFD31D !important;
}

.record .el-tabs__item {
  font-size: 18px !important;
  color: #fff !important;
  font-weight: 400 !important;
}

.record .el-tabs__active-bar {
  background-color: #FFD31D !important;
}

.record .el-tabs__header {
  padding: 0 12px !important;
}

.record .el-table {
  background: none !important;
}

.record .el-table th,
.el-table tr {
  background: none !important;
  color: #fff !important;
  text-align: center !important;
  font-size: 16px !important;
}

.record .el-table td,
.el-table th.is-leaf {
  border-bottom: none !important;
}

.record tr:hover>td {
  background: none !important;
}

.record .el-table td {
  padding: 8px 0 !important;
}

.record .el-table--border::after,
.el-table--group::after,
.el-table::before {
  background: none !important;
}

.recordTemp .el-table {
  background: none !important;
}

.recordTemp .el-table th,
.el-table tr {
  background: none !important;
  color: #fff !important;
  text-align: center !important;
  font-size: 16px !important;
}

.recordTemp .el-table td,
.el-table th.is-leaf {
  border-bottom: none !important;
}

.recordTemp tr:hover>td {
  background: none !important;
}

.recordTemp .el-table td {
  padding: 6px 0 !important;
}

.recordTemp .el-table--border::after,
.el-table--group::after,
.el-table::before {
  background: none !important;
}

.el-progress--circle .el-progress__text {
  top: 41% !important;
  font-size: 10px !important;
}

.el-tabs__nav-wrap::after {
  background: none !important;
}

.el-pagination.is-background .el-pager li.active {
  background: none !important;
  border: none !important;
}

.el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  padding: 0 6px !important;
  background: none !important;
  color: #fff !important;
  border: 1px solid rgba(255, 255, 255, 1) !important;
}

.el-pagination.is-background .btn-next.disabled,
.el-pagination.is-background .btn-prev.disabled {
  color: #c0c4cc !important;
}
</style>

