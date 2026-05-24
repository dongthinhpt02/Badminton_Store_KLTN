import { ServiceContext } from "../../src/shared/interface";
import { CartItemService } from "../cartitem/service";
import { CartItemRepo } from "../cartitem/service/repo";
import { StoreRepo } from "../store/service/repo";
import { UserRepo } from "../user/service/repo";
import { HttpCartController } from "./controller";
import { CartService } from "./service";
import { CartRepo } from "./service/repo";

export function setupCartModule(sctx: ServiceContext) {
  const cartrepo = new CartRepo();

  const storeRepo = new StoreRepo();

  const cartItemRepo = new CartItemRepo();

  const userRepo = new UserRepo();

  const cartService = new CartService(
    cartrepo,
    storeRepo,
    cartItemRepo,
    userRepo,
  );

  const cartItemService = new CartItemService(cartItemRepo);

  const controller = new HttpCartController(cartService, cartItemService);

  return controller.getRoutes(sctx.mdlFactory);
}
