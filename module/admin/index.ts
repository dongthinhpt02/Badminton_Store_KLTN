import { ServiceContext } from "../../src/shared/interface";
import { BrandService } from "../brand/service";
import { BrandRepo } from "../brand/service/repo";
import { CategoryService } from "../category/service";
import { CategoryRepo } from "../category/service/repo";
import { ColorService } from "../color/service";
import { ColorRepo } from "../color/service/repo";
import { ProductService } from "../product/service";
import { ProductRepo } from "../product/service/repo";
import { PromotionService } from "../promotion/service";
import { PromotionRepo } from "../promotion/service/repo";
import { SizeService } from "../size/service";
import { SizeRepo } from "../size/service/repo";
import { SizeTypeService } from "../sizetype/service";
import { SizeTypeRepo } from "../sizetype/service/repo";
import { UserService } from "../user/service";
import { UserRepo } from "../user/service/repo";
import { HttpAdminController } from "./controller";

export function setupAdminModule(sctx: ServiceContext) {
  const userRepository = new UserRepo();
  const cateRepository = new CategoryRepo();
  const brandRepository = new BrandRepo();
  const sizeTypeRepository = new SizeTypeRepo();
  const colorRepository = new ColorRepo();
  const sizeRepository = new SizeRepo();
  const productRepository = new ProductRepo();
  const promotionRepository = new PromotionRepo();

  const userService = new UserService(userRepository);
  const cateService = new CategoryService(cateRepository);
  const brandService = new BrandService(brandRepository);
  const sizeTypeService = new SizeTypeService(sizeTypeRepository);
  const colorService = new ColorService(colorRepository);
  const sizeService = new SizeService(sizeRepository);
  const productService = new ProductService(productRepository);
  const promotionService = new PromotionService(promotionRepository);

  const controller = new HttpAdminController(
    userService,
    cateService,
    brandService,
    sizeTypeService,
    colorService,
    sizeService,
    productService,
    promotionService,
  );

  return controller.getRoutes(sctx.mdlFactory);
}
