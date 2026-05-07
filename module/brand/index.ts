import { ServiceContext } from "../../src/shared/interface";
import { HttpBrandController } from "./controller";
import { BrandService } from "./service";
import { BrandRepo } from "./service/repo";

export function setupBrandModule(sctx: ServiceContext) {
  const repository = new BrandRepo();

  const service = new BrandService(repository);

  const controller = new HttpBrandController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
