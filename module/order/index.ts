import { ServiceContext } from "../../src/shared/interface";
import { HttpOrderController } from "./controller";
import { OrderService } from "./service";
import { OrderRepo } from "./service/repo";

export function setupOrderModule(sctx: ServiceContext) {
  const repository = new OrderRepo();

  const service = new OrderService(repository);

  const controller = new HttpOrderController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
