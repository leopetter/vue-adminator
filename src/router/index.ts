import Vue from "vue";
import VueRouter, { RouteConfig, RawLocation, Route, RouterMode } from "vue-router";
import Adminator from "../views/Adminator.vue";
import Error from "../views/Error.vue";
import Landing from "../views/Landing.vue";
import { AuthModule } from "@/store/modules/auth";
import { UserManagementModule } from "@/store/modules/usermgmt";

Vue.use(VueRouter);

const authenticationRequired = true;

const checkAuthenticated = (): boolean => {
  let token = Vue.cookies?.get("user-token") as string;
  let email = Vue.cookies?.get("user-email") as string;
  let userID = Vue.cookies?.get("user-id") as string;
  AuthModule.setAuthToken(token);
  AuthModule.setUserID(userID);
  UserManagementModule.setCurrentUserEmail(email);
  return (
    (token != undefined && token != null && token.length > 0) ||
    !authenticationRequired
  );
};

const checkNotAlreadyAuthenticated = (
  to: Route,
  from: Route,
  next: (to?: RawLocation | false | void) => void
) => {
  if (!checkAuthenticated()) {
    next();
    return;
  }
  next({ name: "dashboard" });
};

const requireAuthenticated = (
  to: Route,
  from: Route,
  next: (to?: RawLocation | false | void) => void
) => {
  if (checkAuthenticated()) {
    next();
    return;
  }
  next({ name: "login" });
};

const routes: Array<RouteConfig> = [
  {
    path: "/",
    beforeEnter: requireAuthenticated,
    meta: { requiresAuth: true },
    redirect: "/dashboard"
  },
  {
    path: "/(login|signup)",
    redirect: "/dashboard",
    component: Landing,
    children: [
      {
        path: "/login",
        name: "login",
        beforeEnter: checkNotAlreadyAuthenticated,
        component: () =>
          import(/* webpackChunkName: "login" */ "@/views/Login.vue")
      },
      /*
      {
        path: "/signup",
        name: "signup",
        beforeEnter: checkNotAlreadyAuthenticated,
        component: () =>
          import(
            // webpackChunkName: "signup"
          "@/views/Signup.vue")
      }
      */
    ]
  },
  {
    path: "/dashboard",
    redirect: "/dashboard/home",
    meta: { requiresAuth: true },
    beforeEnter: requireAuthenticated,
    component: Adminator,
    children: [
      {
        path: "home",
        name: "home",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
          //webpackChunkName: "home"  
          "@/views/Home.vue")
      },
      {
        path: "stocks",
        name: "stockmgmt",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
          //webpackChunkName: "stockmanagement"  
          "@/views/StockManagement.vue")
      },
      {
        path: "user",
        name: "usersubmissions",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
          //webpackChunkName: "usersubmission"  
          "@/views/UserSubmission.vue")
      },
      {
        path: "order",
        name: "ordermgmt",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
          //webpackChunkName: "ordermanagement"  
          "@/views/OrderManagement.vue")
      },
      {
        path: "download",
        name: "downloadmgmt",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
          //webpackChunkName: "downloadmanagement"  
          "@/views/DownloadManagement.vue")
      },
      {
        path: "files",
        name: "filegenerator",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
          //webpackChunkName: "filegenerator"  
          "@/views/FileGenerator.vue")
      },
      {
        path: "email",
        name: "emails",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
          //webpackChunkName: "emails"  
          "@/views/Emails.vue")
      },
    ]
  },
  /*
  {
    path: "/dashboard",
    redirect: "/dashboard/start",
    meta: { requiresAuth: true },
    beforeEnter: requireAuthenticated,
    component: Adminator,
    children: [
      {
        path: "start",
        name: "dashboard",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
          //webpackChunkName: "dashboard"  
          "@/views/Dashboard.vue")
      },
      {
        path: "email",
        meta: { requiresAuth: true },
        redirect: { name: "inboxes", params: { inbox: "inbox" } },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
            //webpackChunkName: "email" 
            "@/views/Email.vue"),
        children: [
          {
            path: "inbox",
            name: "inbox",
            meta: { requiresAuth: true },
            beforeEnter: requireAuthenticated,
            redirect: { name: "inboxes", params: { inbox: "inbox" } }
          },
          {
            path: ":inbox(inbox|sent|important|drafts|spam|trash)",
            name: "inboxes",
            props: true,
            meta: { requiresAuth: true },
            beforeEnter: requireAuthenticated,
            component: () =>
              import(
                // webpackChunkName: "emaildefault"
                "@/views/EmailDefault.vue"
              )
          },
          {
            path: "compose",
            name: "compose",
            meta: { requiresAuth: true },
            beforeEnter: requireAuthenticated,
            component: () =>
              import(
                // webpackChunkName: "emailcompose"
                "@/views/EmailCompose.vue"
              )
          }
        ]
      },
      {
        path: "calendar",
        name: "calendar",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
            // webpackChunkName: "calendar"
          "@/views/Calendar.vue")
      },
      {
        path: "chat",
        name: "chat",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
            // webpackChunkName: "chat" 
          "@/views/Chat.vue")
      },
      {
        path: "charts",
        name: "charts",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(/
          //webpackChunkName: "charts" 
          "@/views/Charts.vue")
      },
      {
        path: "forms",
        name: "forms",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
            // webpackChunkName: "forms"
          "@/views/Forms.vue")
      },
      {
        path: "ui",
        name: "ui",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () => import(
          // webpackChunkName: "ui"
        "@/views/UI.vue")
      },
      {
        path: "blank",
        name: "blank",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
            // webpackChunkName: "blank"
          "@/views/Blank.vue")
      },
      {
        path: "tables/basictables",
        name: "basictables",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
            // webpackChunkName: "basictables"
            "@/views/Basictables.vue"
          )
      },
      {
        path: "tables/datatables",
        name: "datatables",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
            // webpackChunkName: "datatables" 
          "@/views/Datatables.vue")
      },
      {
        path: "maps/openstreetmap",
        name: "openstreetmap",
        meta: { requiresAuth: true },
        beforeEnter: requireAuthenticated,
        component: () =>
          import(
            // webpackChunkName: "openstreetmap"
            "@/views/OpenStreetMap.vue"
          )
      }
    ]
  },
  */

  // Error pages
  {
    path: "/error",
    redirect: "/error/404",
    component: Error,
    children: [
      {
        path: "404",
        name: "error404",
        component: () =>
          import(/* webpackChunkName: "404error" */ "@/views/404.vue")
      },
      {
        path: "500",
        name: "error500",
        component: () =>
          import(/* webpackChunkName: "500error" */ "@/views/500.vue")
      }
    ]
  },
  // Default fallback
  { path: "*", redirect: { name: "error404" } }
];

const router = new VueRouter({
  mode: process.env.VUE_APP_ROUTER_MODE as RouterMode,
  base: process.env.VUE_APP_ROUTER_BASE,
  routes
});

export default router;
