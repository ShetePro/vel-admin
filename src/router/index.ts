import { createRouter, createWebHashHistory } from "vue-router";
import viewsRoute from "./routes/index";
import { registerGuard } from "./guard";

const router = createRouter({
  history: createWebHashHistory(),
  routes: viewsRoute,
});
registerGuard(router);



export default router;
