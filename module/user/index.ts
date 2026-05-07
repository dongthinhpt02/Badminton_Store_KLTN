import { ServiceContext } from "../../src/shared/interface";
import { HttpUserController } from "./controller";
import { UserService } from "./service";
import { UserRepo } from "./service/repo";

export function setupUserModule(sctx: ServiceContext) {
  const repository = new UserRepo();

  const service = new UserService(repository);

  const controller = new HttpUserController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
