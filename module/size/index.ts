import { ServiceContext } from "../../src/shared/interface";
import { HttpSizeController } from "./controller";
import { SizeService } from "./service";
import { SizeRepo } from "./service/repo";

export function setupSizeModule(sctx: ServiceContext) {
  const repository = new SizeRepo();

  const service = new SizeService(repository);

  const controller = new HttpSizeController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
