import { ServiceContext } from "../../src/shared/interface";
import { HttpPromotionController } from "./controller";
import { PromotionService } from "./service";
import { PromotionRepo } from "./service/repo";

export function setupPromotionModule(sctx: ServiceContext) {
  const repository = new PromotionRepo();

  const service = new PromotionService(repository);

  const controller = new HttpPromotionController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
