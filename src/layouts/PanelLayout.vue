<template>
  <div class="panel-layout">
    <div class="header" />
    <div class="container">
      <q-card class="side-menu">
        <div class="user-section">
          <div class="avatar">
            <q-avatar>
              <q-img :src="user.picture" />
            </q-avatar>
          </div>
          <div class="message">
            خوش آمدید
          </div>
          <div class="full-name">
            محمد راوش
          </div>
          <q-card class="wallet">
            <div class="value">
              <div class="value-unit">
                تومان
              </div>
              <div class="value-number">
                100,000
              </div>
            </div>
            <q-btn class="action card">
              شارژ کیف پول
            </q-btn>
          </q-card>
        </div>
        <div class="items-section">
          <q-list>
            <q-item v-for="(menuItem, menuItemIndex) in menuItems"
                    :key="menuItemIndex"
                    v-ripple
                    clickable
                    exact
                    :to="menuItem.route">
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
          </q-list>

        </div>
      </q-card>
      <div class="content">
        <router :include="keepAliveComponents" />
      </div>
    </div>
  </div>
</template>

<script>
import { User } from 'src/models/User.js'
import Router from 'src/router/Router.vue'
import KeepAliveComponents from 'src/assets/js/KeepAliveComponents.js'
export default {
  components: { Router },
  data () {
    return {
      menuItems: [
        {
          label: 'داشبورد',
          icon: 'dashboard',
          route: { name: 'UserPanel.Dashboard' }
        },
        {
          label: 'رزرو خدمات',
          icon: 'person_pin',
          route: { name: 'UserPanel.Dashboard' }
        },
        {
          label: 'پیام ها',
          icon: 'chat_bubble_outline',
          route: { name: 'UserPanel.Ticket.List' }
        },
        {
          label: 'اعلان ها',
          icon: 'notifications',
          route: { name: 'UserPanel.Notice.List' }
        },
        {
          label: 'صورت‌حساب‌ها',
          icon: 'account_balance_wallet',
          route: { name: 'UserPanel.Invoice.List' }
        },
        {
          label: 'تراکنش ها',
          icon: 'account_balance_wallet',
          route: { name: 'UserPanel.Payment.List' }
        },
        {
          label: 'ویرایش حساب',
          icon: 'person',
          route: { name: 'UserPanel.Dashboard' }
        },
        {
          label: 'پکیج ها',
          icon: 'inventory_2',
          route: { name: 'UserPanel.Package.RegisteredList' }
        },
        {
          label: 'خروج از حساب',
          icon: 'logout',
          route: { name: 'UserPanel.Dashboard' }
        }
      ],
      user: new User(),
      keepAliveComponents: KeepAliveComponents
    }
  },
  mounted () {
    this.loadAuthData()
  },
  methods: {
    loadAuthData() { // prevent Hydration node mismatch
      this.user = this.$store.getters['Auth/user']
    }
  }
}
</script>

<style scoped lang="scss">
.panel-layout {
  position: relative;
  .header {
    position: absolute;
    width: 100%;
    height: 140px;
    top: 0;
    left: 0;
    z-index: 0;
    background-image: url("/img/panel/panel-header.png");
    background-position: center center;
    background-repeat: repeat-x;
  }
  .container {
    position: relative;
    z-index: 1;
    padding-top: 56px;
    width: 1271px;
    max-width: 100%;
    margin: auto;
    display: flex;
    flex-flow: row;
    .side-menu {
      width: 241px;
      padding: 21px 37px 33.5px 37px;
      .user-section {
        width: 100%;
        display: flex;
        flex-flow: column;
        justify-content: center;
        align-items: center;
        margin-bottom: 33.5px;
        .avatar {
          margin-bottom: 5px;
          .q-avatar {
            width: 78px;
            height: 78px;
          }
        }
        .message {
          margin-bottom: 0;
          font-style: normal;
          font-weight: 400;
          font-size: 16px;
          color: #C5C5C5;
        }
        .full-name {
          font-style: normal;
          font-weight: 700;
          font-size: 18px;
          color: #2E2E2E;
          margin-bottom: 24px;
        }
        .wallet {
          width: 167px;
          background: #E9F2E6;
          color: #23A52D;
          display: flex;
          flex-flow: column;
          justify-content: center;
          align-items: center;
          padding-top: 14px;
          padding-bottom: 26px;
          position: relative;
          .value {
            .value-unit {
              font-style: normal;
              font-weight: 400;
              font-size: 8px;
              line-height: 12px;
              width: 100%;
              text-align: left;
            }
            .value-number {
              font-style: normal;
              font-weight: 700;
              font-size: 24px;
              line-height: 37px;
            }
          }
          .action {
            position: absolute;
            bottom: -15px;
            right: 26px;
            width: 117px;
            height: 29px;
            font-style: normal;
            font-weight: 500;
            font-size: 12px;
            line-height: 19px;
            color: #FFFFFF;
            background: #2FA84A;
          }
        }
      }
      .items-section {
        .q-list {
          .q-item {
            font-style: normal;
            font-weight: 500;
            font-size: 16px;
            line-height: 25px;
            color: #A9A9A9;
            padding-left: 24.67px;
            margin-bottom: 27px;
            padding-right: 0;
            align-items: center;
            &.q-router-link--active {
              color: $primary;
            }
            .q-item__section--avatar {
              width: 18.67px;
              min-width: 18.67px;
              max-width: 18.67px;
              padding-right: 0;
              margin-right: 20.67px;
              .q-icon {
                width: 18.67px;
                font-size: 18.67px;
              }
            }
            .q-item__section:nth-child(3) {
              height: 25px;
            }
          }
        }
      }
    }
    .content {
      width: calc( 100% - 241px );
      padding-left: 40px;
    }
  }
}
</style>
