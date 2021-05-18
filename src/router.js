import Vue from 'vue';

import Router from 'vue-router';

import Home from './view/home.vue'
import Index from './view/index.vue'
import Product from './view/product.vue'
import Detail from './view/detail.vue'
import Cart from './view/cart.vue'
import Order from './view/order.vue';
import OrderConfirm from './view/order/orderConfirm.vue';
import OrderPay from './view/order/orderPay.vue';
import OrderList from './view/order/orderList.vue';

Vue.use(Router)

export default new Router({

    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'home',
            redirect: '/index',
            component: Home,
            children: [
                {
                    path: '/index',
                    name: 'index',
                    component: Index
                },
                {
                    path: '/product/:id',
                    name: 'product',
                    component: Product
                },
                {
                    path: '/detail/:id',
                    name: 'detail',
                    component: Detail
                }
            ]
        },
        {
            path: '/cart',
            name: 'cart',
            component: Cart
        },
        {
            path: '/order',
            name: 'order',
            component: Order,
            children: [
                {
                    path: '/orderconfirm',
                    name: 'orderconfirm',
                    component: OrderConfirm
                },
                {
                    path: '/orderList',
                    name: 'orderList',
                    component: OrderList
                },
                {
                    path: '/orderPay',
                    name: 'orderPay',
                    component: OrderPay
                },

            ]
        }

    ]
})