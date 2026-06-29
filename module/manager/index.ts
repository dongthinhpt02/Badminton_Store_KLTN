import { ServiceContext } from "../../src/shared/interface";
import { BrandService } from "../brand/service";
import { BrandRepo } from "../brand/service/repo";
import { CategoryService } from "../category/service";
import { CategoryRepo } from "../category/service/repo";
import { ColorService } from "../color/service";
import { ColorRepo } from "../color/service/repo";
import { ImagekitService } from "../imagekit/service";
import { ImportService } from "../import/service";
import { ImportRepo } from "../import/service/repo";
import { ImportDetailService } from "../importdetail/service";
import { ImportDetailRepo } from "../importdetail/service/repo";
import { OrderService } from "../order/service";
import { OrderRepo } from "../order/service/repo";
import { ProductService } from "../product/service";
import { ProductRepo } from "../product/service/repo";
import { ProductItemService } from "../productitem/service";
import { ProductItemRepo } from "../productitem/service/repo";
import { SizeService } from "../size/service";
import { SizeRepo } from "../size/service/repo";
import { SizeTypeService } from "../sizetype/service";
import { SizeTypeRepo } from "../sizetype/service/repo";
import { StoreService } from "../store/service";
import { StoreRepo } from "../store/service/repo";
import { SupplierService } from "../supplier/service";
import { SupplierRepo } from "../supplier/service/repo";
import { UserService } from "../user/service";
import { UserRepo } from "../user/service/repo";
import { HttpManagerController } from "./controller";

export function setupManagerModule(sctx: ServiceContext) {
  const userRepo = new UserRepo();
  const brandRepo = new BrandRepo();
  const cateRepo = new CategoryRepo();
  const sizeRepo = new SizeRepo();
  const sizeTypeRepo = new SizeTypeRepo();
  const colorRepo = new ColorRepo();
  const productRepo = new ProductRepo();
  const productItemRepo = new ProductItemRepo();
  const orderRepo = new OrderRepo();
  const supplierRepo = new SupplierRepo();
  const importRepo = new ImportRepo();
  const importDetailRepo = new ImportDetailRepo(productItemRepo);
  const storeRepo = new StoreRepo();

  const imagekitService = new ImagekitService();
  const userService = new UserService(userRepo);
  const brandService = new BrandService(brandRepo);
  const cateService = new CategoryService(cateRepo);
  const sizeService = new SizeService(sizeRepo);
  const sizeTypeService = new SizeTypeService(sizeTypeRepo);
  const colorService = new ColorService(colorRepo);
  const productService = new ProductService(productRepo);
  const productItemService = new ProductItemService(productItemRepo);
  const orderService = new OrderService(orderRepo);
  const supplierService = new SupplierService(supplierRepo);
  const importService = new ImportService(importRepo);
  const importDetailService = new ImportDetailService(importDetailRepo);
  const storeService = new StoreService(storeRepo);

  const controller = new HttpManagerController(
    userService,
    brandService,
    cateService,
    sizeService,
    sizeTypeService,
    colorService,
    productService,
    productItemService,
    orderService,
    supplierService,
    importService,
    importDetailService,
    storeService,
  );

  return controller.getRoutes(sctx.mdlFactory);
}
