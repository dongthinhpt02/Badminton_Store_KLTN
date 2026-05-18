import { ServiceContext } from "../../src/shared/interface";
import { BrandService } from "../brand/service";
import { BrandRepo } from "../brand/service/repo";
import { CategoryService } from "../category/service";
import { CategoryRepo } from "../category/service/repo";
import { ColorService } from "../color/service";
import { ColorRepo } from "../color/service/repo";
import { ImportService } from "../import/service";
import { ImportRepo } from "../import/service/repo";
import { ImportDetailService } from "../importdetail/service";
import { ImportDetailRepo } from "../importdetail/service/repo";
import { ProductService } from "../product/service";
import { ProductRepo } from "../product/service/repo";
import { ProductItemService } from "../productitem/service";
import { ProductItemRepo } from "../productitem/service/repo";
import { PromotionService } from "../promotion/service";
import { PromotionRepo } from "../promotion/service/repo";
import { SizeService } from "../size/service";
import { SizeRepo } from "../size/service/repo";
import { SizeTypeService } from "../sizetype/service";
import { SizeTypeRepo } from "../sizetype/service/repo";
import { SupplierService } from "../supplier/service";
import { SupplierRepo } from "../supplier/service/repo";
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
  const productItemRepository = new ProductItemRepo();
  const supplierRepository = new SupplierRepo();
  const importRepository = new ImportRepo();
  const importDetailRepository = new ImportDetailRepo(productItemRepository);

  const userService = new UserService(userRepository);
  const cateService = new CategoryService(cateRepository);
  const brandService = new BrandService(brandRepository);
  const sizeTypeService = new SizeTypeService(sizeTypeRepository);
  const colorService = new ColorService(colorRepository);
  const sizeService = new SizeService(sizeRepository);
  const productService = new ProductService(productRepository);
  const promotionService = new PromotionService(promotionRepository);
  const productItemService = new ProductItemService(productItemRepository);
  const supplierService = new SupplierService(supplierRepository);
  const importService = new ImportService(importRepository);
  const importDetailService = new ImportDetailService(importDetailRepository);

  const controller = new HttpAdminController(
    userService,
    cateService,
    brandService,
    sizeTypeService,
    colorService,
    sizeService,
    productService,
    promotionService,
    productItemService,
    supplierService,
    importService,
    importDetailService,
  );

  return controller.getRoutes(sctx.mdlFactory);
}
