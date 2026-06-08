import { Elysia } from "elysia";
import app from "./app";
import setupMiddlewares from "./shared/middleware";
import { setupUserModule } from "../module/user";
import swagger from "@elysiajs/swagger";
import testDB from "./testdb";
import { setupImagekitModule } from "../module/imagekit";
import { setupCateModule } from "../module/category";
import { setupAdminModule } from "../module/admin";
import setupAdminMiddlewares from "./shared/middleware/admin";
import { setupBrandModule } from "../module/brand";
import { setupSizeTypeModule } from "../module/sizetype";
import { setupColorModule } from "../module/color";
import { setupSizeModule } from "../module/size";
import { setupProductModule } from "../module/product";
import { setupPromotionModule } from "../module/promotion";
import { setupProductItemModule } from "../module/productitem";
import { setupPaymentModule } from "../module/payment";
import { setupCartModule } from "../module/cart";
import { setupOrderModule } from "../module/order";
import setupManagerMiddlewares from "./shared/middleware/manager";
import { setupManagerModule } from "../module/manager";
import { setupConservationModule } from "../module/conservation";
import {
  conservationSocket,
  conservationSocketTest,
  conservationSocketTest1,
} from "../module/conservation/websocket/websocket";
import {
  publishConversation,
  setSocketServer,
} from "../module/conservation/websocket";

// import testDB from "./testdb";
async function bootServer(port: number) {
  // await testDB();
  const sctx = {
    mdlFactory: setupMiddlewares(),
  };

  const sctxadmin = {
    mdlFactory: setupAdminMiddlewares(),
  };
  const sctxmanager = {
    mdlFactory: setupManagerMiddlewares(),
  };

  const userModule = setupUserModule(sctx);
  const imagekitModule = setupImagekitModule(sctx);
  const categoryModule = setupCateModule(sctx);
  const brandModule = setupBrandModule(sctx);
  const sizeTypeModule = setupSizeTypeModule(sctx);
  const colorModule = setupColorModule(sctx);
  const sizeModule = setupSizeModule(sctx);
  const productModule = setupProductModule(sctx);
  const promotionModule = setupPromotionModule(sctx);
  const productItemModule = setupProductItemModule(sctx);
  const paymentModule = setupPaymentModule(sctx);
  const cartModule = setupCartModule(sctx);
  const orderModule = setupOrderModule(sctx);
  const conservationModule = setupConservationModule(sctx);

  const adminModule = setupAdminModule(sctxadmin);
  const managerModule = setupManagerModule(sctxmanager);

  app.use(userModule);
  app.use(imagekitModule);
  app.use(categoryModule);
  app.use(brandModule);
  app.use(sizeTypeModule);
  app.use(colorModule);
  app.use(sizeModule);
  app.use(productModule);
  app.use(promotionModule);
  app.use(productItemModule);
  app.use(paymentModule);
  app.use(cartModule);
  app.use(orderModule);

  app.use(conservationModule);

  app.use(conservationSocket);
  app.use(conservationSocketTest);
  app.use(conservationSocketTest1);

  app.use(adminModule);
  app.use(managerModule);

  app.get("/test-publish", () => {
    publishConversation("3fc775db-8652-4027-b518-9a74e3f20fdb", {
      type: "new_message",
      data: {
        content: "hello websocket",
      },
    });

    return {
      success: true,
    };
  });

  app.use(swagger());

  // start server
  app.listen(port);

  setSocketServer(app.server!);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}

bootServer(8080);
