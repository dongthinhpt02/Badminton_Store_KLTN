import { ServiceContext } from "../../src/shared/interface";
import { HttpSizeTypeController } from "./controller";
import { SizeTypeService } from "./service";
import { SizeTypeRepo } from "./service/repo";

export function setupSizeTypeModule(sctx: ServiceContext) {
  const repository = new SizeTypeRepo();

  const service = new SizeTypeService(repository);

  const controller = new HttpSizeTypeController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
