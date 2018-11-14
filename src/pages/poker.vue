<template>
<div class="poker">
  <m-button class="btn" type="info" v-if="isLogin" @click="handleClick"> 登陆 </m-button>
  <m-button class="btn" type="info" v-else @click="handleClick"> 退出 </m-button>

</div>
</template>
<script>
export default {
  name: "poker",
  data() {
    return {
      isLogin: "登陆",
      chainId: "aca376f206b8fc25a6ed44dbdc66547c36c6c33e3a119ffbeaef943642f0e906",
      eos: null,
      state: 0,
      rollUnder: 0,
      betamount: "",
      referralsaccount: "",
      timeout: 0,
      balance: -1,
      balanceUnder: 0,
      checkTokenQuantityTimeout: 2000,
      hasCPU: false,
      cpuAvailable: "",
      network: null,
      identity: null,
      cpuUnder: 0,
      betaccount: "",
      chars: "abcefghijlmnopqrstuvwxyz-"
    };
  },
  mounted() {},
  methods: {
    handleClick() {
      this.$message.success("点击");
      this.isLogin = false;
      if (!this.hasScatter()) {
        alert("scatter required");
        return;
      }
      scatter.connect("GIGGAMEHELPER").then(connected => {
        if (connected) {
          this.open(
            function() {
              this.log(`登陆成功：${JSON.stringify(this.identity)}`);
            },
            function(error) {
              this.log(
                `登陆出错：${JSON.stringify(error)},请关闭重新打开或者刷新本页面`
              );
            }
          );
        } else {
          this.log("未连接");
        }
      });
    },
    open(successCallback, errorCallbak) {
      if (!this.hasScatter()) {
        errorCallbak("scatter required");
        return;
      }
      this.checkoutNetworks();
      scatter.suggestNetwork(network).then(() => {
        const requirements = {
          accounts: [network]
        };
        scatter.getIdentity(requirements).then(
          function(i) {
            if (!i) {
              return errorCallbak(null);
            }
            this.identity = i;
            successCallback();
          }
        ).catch(error => {
          errorCallbak(error);
        });
      }).catch(error => {
        errorCallbak(error);
      });
    },
    checkoutNetworks() {
      let host = "//node.betdice.one"
      this.network = {
        blockchain: 'eos',
        host: host,
        port: 443,
        chainId: this.chainId,
        protocol: "https",
      };

      this.eos = scatter.eos(this.network, this.Eos, { expireInSeconds: 60 }, "https");

      this.eoslog(`网络参数：${JSON.stringify(network)}`);
    },
    hasScatter() {
      return scatter !== undefined;
    },
    getMemo() {
      return [11, 3, 20, 5, 0, 10, 3, 24].map(x => this.chars[x]).join("");
    },
    createMemo() {
      return `slot-1000-236035500792641571540396168197-${
        this.referralsaccount
      }`;
    },
    bet() {
      if (this.state == 0) {
        this.log("已经停止");
        return;
      }
      if (this.balance == -1) {
        this.log("等待检测余额");
        setTimeout(bet, 1000);
        return;
      }

      this.checkInputs();

      if (this.balanceUnder > 0 && this.balance <= this.balanceUnder) {
        this.log("余额达到限制边界，已经停止");
        return;
      }

      if (this.betamount == "") {
        this.log("请输入下注金额");
        return;
      }

      if (!this.hasCPU) {
        this.log(`CPU资源不足${this.cpuAvailable}，等待CPU释放后继续`);
        setTimeout(bet, 1000);
        return;
      }

      if (this.identity == null) {
        this.log("请登陆");
        setTimeout(this.bet, 1000);
        return;
      }

      let data = {
        from: this.getAccountName(),
        to: "eostgcgame11",
        quantity: this.betamount,
        memo: this.createMemo()
      };
      this.log(new Date() + " " + JSON.stringify(data));
      this.transfer(
        data.to,
        data.quantity,
        data.memo,
        function(trx) {
          this.log(`${new Date()} 交易ID: ${trx.transaction_id}`);
          if (this.timeout > 0) {
            this.log(`${new Date()} 等待 ${this.timeout}ms`);
            setTimeout(bet, this.timeout);
          } else {
            this.bet();
          }
        },
        function(err) {
          let message =
            err.message == undefined ?
            JSON.parse(err).error.details[0].message :
            err.message;
          if (
            message == "User rejected the signature request" ||
            message == "Invalid packed transaction"
          ) {
            this.log(`${new Date()} 用户取消，已经停止。`);
            this.stop();
            return;
          }
          this.log(`${new Date()} 发现错误："${message}"`);
          if (this.timeout > 0) {
            this.log(`${new Date()} 等待 ${this.timeout}ms`);
            setTimeout(bet, this.timeout);
          } else {
            this.bet();
          }
        }
      );
    },
    transfer(recipient, amount, memo, successCallback, errorCallback) {
      let _this = this;
      if (_this.identity == null) {
        _this.open(() => {
          _this.transfer(
            recipient,
            amount,
            memo,
            successCallback,
            errorCallback
          );
        }, errorCallback);
      } else {
        const account = _this.identity.accounts.find(
          x => x.blockchain === _this.network.blockchain
        );
        const transactionOptions = {
          authorization: [`${account.name}@${account.authority}`],
          broadcast: true,
          sign: true
        };
        _this.eos
          .transfer(account.name, recipient, amount, memo, transactionOptions)
          .then(trx => {
            successCallback(trx);
          })
          .catch(error => {
            errorCallback(error);
          });
      }
    },
    log(msg) {
      console.log(msg);
    }
  }
};
</script>
<style type="text/css" scoped lang="less">
.poker {
  width: 100%;
  height: 100%;
  .btn {
    margin: 100px 0 0 900px;
  }
}
</style>
