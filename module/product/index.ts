import { ServiceContext } from "../../src/shared/interface";
import { HttpProductController } from "./controller";
import { ProductService } from "./service";
import { ProductRepo } from "./service/repo";

export function setupProductModule(sctx: ServiceContext) {
  const repository = new ProductRepo();

  const service = new ProductService(repository);

  const controller = new HttpProductController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
