import { ServiceContext } from "../../src/shared/interface";
import { HttpConservationController } from "./controller";
import { ConservationService } from "./service";
import { ConservationRepo } from "./service/repo";

export function setupConservationModule(sctx: ServiceContext) {
  const repository = new ConservationRepo();

  const service = new ConservationService(repository);

  const controller = new HttpConservationController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
