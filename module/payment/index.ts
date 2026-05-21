import { ServiceContext } from "../../src/shared/interface";
import { HttpPaymentController } from "./controller";
import { PaymentService } from "./service";
import { PaymentRepo } from "./service/repo";

export function setupPaymentModule(sctx: ServiceContext) {
  const repository = new PaymentRepo();

  const service = new PaymentService(repository);

  const controller = new HttpPaymentController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
