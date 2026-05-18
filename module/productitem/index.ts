import { ServiceContext } from "../../src/shared/interface";
import { HttpProductItemController } from "./controller";
import { ProductItemService } from "./service";
import { ProductItemRepo } from "./service/repo";

export function setupProductItemModule(sctx: ServiceContext) {
  const repository = new ProductItemRepo();

  const service = new ProductItemService(repository);

  const controller = new HttpProductItemController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
