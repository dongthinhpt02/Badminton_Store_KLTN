import { ServiceContext } from "../../src/shared/interface";
import { HttpColorController } from "./controller";
import { ColorService } from "./service";
import { ColorRepo } from "./service/repo";

export function setupColorModule(sctx: ServiceContext) {
  const repository = new ColorRepo();

  const service = new ColorService(repository);

  const controller = new HttpColorController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
