import { ServiceContext } from "../../src/shared/interface";
import { CartService } from "../cart/service";
import { CartRepo } from "../cart/service/repo";
import { CartItemRepo } from "../cartitem/service/repo";
import { OrderRepo } from "../order/service/repo";
import { OrderDetailRepo } from "../orderdetail/service/repo";
import { StoreRepo } from "../store/service/repo";
import { UserRepo } from "../user/service/repo";
import { HttpPaymentController } from "./controller";
import { PaymentService } from "./service";
import { PaymentRepo } from "./service/repo";

export function setupPaymentModule(sctx: ServiceContext) {
  const userRepository = new UserRepo();

  //cartRepo

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

  // order detail repo
  const orderDetailRepo = new OrderDetailRepo();

  const orderRepo = new OrderRepo();

  const repository = new PaymentRepo(userRepository);

  const service = new PaymentService(
    repository,
    cartService,
    orderDetailRepo,
    orderRepo,
  );

  const controller = new HttpPaymentController(service);

  return controller.getRoutes(sctx.mdlFactory);
}
