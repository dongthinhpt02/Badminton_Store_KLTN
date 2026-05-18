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
// import testDB from "./testdb";
async function bootServer(port: number) {
  // await testDB();
  const sctx = {
    mdlFactory: setupMiddlewares(),
  };

  const sctxadmin = {
    mdlFactory: setupAdminMiddlewares(),
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

  const adminModule = setupAdminModule(sctxadmin);

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

  app.use(adminModule);

  app.use(swagger());

  // start server
  app.listen(port);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
  );
}

bootServer(8081);
