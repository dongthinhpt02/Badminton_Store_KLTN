import { ServiceContext } from "../../src/shared/interface";
import { HttpCategoryController } from "./controller";
import { CategoryService } from "./service";
import { CategoryRepo } from "./service/repo";

export function setupCateModule(sctx: ServiceContext) {
  const repository = new CategoryRepo();

  const service = new CategoryService(repository);

  const controller = new HttpCategoryController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
