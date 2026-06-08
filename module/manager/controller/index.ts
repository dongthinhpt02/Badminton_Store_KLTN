import Elysia, { Context } from "elysia";
import { IBrandService } from "../../brand/interface";
import { ICateService } from "../../category/interface";
import { IColorService } from "../../color/interface";
import { ImportService } from "../../import/service";
import { ImportDetailService } from "../../importdetail/service";
import { IOrderService } from "../../order/interface";
import { IProductService } from "../../product/interface";
import { IProductItemService } from "../../productitem/interface";
import { ISizeService } from "../../size/interface";
import { ISizeTypeService } from "../../sizetype/interface";
import { ISupplierService } from "../../supplier/interface";
import { IUserService } from "../../user/interface";
import { successResponse } from "../../../src/shared/utils/response";
import { ErrTokenInvalid } from "../../../src/shared/utils/error";
import { MdlFactory, TokenType } from "../../../src/shared/interface";
import { AuthContext } from "../../../src/shared/middleware";
import { ICreateProductForm, IUpdateProductForm } from "../../product/model";
import {
  ICreateProductItemForm,
  IUpdateProductItemForm,
} from "../../productitem/model";
import { ICreateImportForm } from "../../import/model";
import { ICreateImportDetailForm } from "../../importdetail/model";
import { UpdateDeliveredOrderForm } from "../../order/model";
import { IStoreService } from "../../store/interface";
import { IConservationService } from "../../conservation/interface";
import { sendMessageSchema } from "../../conservation/model";

export class HttpManagerController {
  constructor(
    private readonly userService: IUserService,
    private readonly brandService: IBrandService,
    private readonly cateService: ICateService,
    private readonly sizeService: ISizeService,
    private readonly sizeTypeService: ISizeTypeService,
    private readonly colorService: IColorService,
    private readonly productService: IProductService,
    private readonly productItemService: IProductItemService,
    private readonly orderService: IOrderService,
    private readonly supplierService: ISupplierService,
    private readonly importService: ImportService,
    private readonly importDetailService: ImportDetailService,
    private readonly storeService: IStoreService,
    private readonly conservationService: IConservationService,
  ) {}
  // ********************* user ********************* //
  private async getAllUserActive(ctx: Context) {
    const data = await this.userService.getAllUserActiveAdmin();
    return successResponse(data, ctx);
  }
  private async renewTokenManager(ctx: AuthContext) {
    const token = ctx.token;
    if (ctx.decoded.type !== TokenType.RefreshToken)
      throw ErrTokenInvalid.withLog("Not the expected token");

    const data = await this.userService.renewTokenManager(token);
    return successResponse(data, ctx);
  }
  // ********************* brand ********************* //
  private async getAllAcitveBrand(ctx: Context) {
    const data = await this.brandService.getAllBrandActive();
    return successResponse(data, ctx);
  }
  // ********************* category ********************* //
  private async getAllAcitveCate(ctx: Context) {
    const data = await this.cateService.getAllCateActive();
    return successResponse(data, ctx);
  }
  // ********************* size & sizetype ********************* //
  private async getAllActiveSizeType(ctx: Context) {
    const data = await this.sizeTypeService.getAllActive();
    return successResponse(data, ctx);
  }
  private async getAllAcitveSize(ctx: Context) {
    const data = await this.sizeService.getAllActive();
    return successResponse(data, ctx);
  }
  // ********************* color ********************* //
  private async getAllAcitveColor(ctx: Context) {
    const data = await this.colorService.getAllActive();
    return successResponse(data, ctx);
  }
  // ********************* product ********************* //
  private async createProduct(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const form = ctx.body as ICreateProductForm;
    const data = await this.productService.create(form);
    return successResponse(data, ctx);
  }
  private async updateProduct(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const id = ctx.query.id;
    const form = ctx.body as IUpdateProductForm;
    const data = await this.productService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deleteProduct(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const id = ctx.query.id;
    const data = await this.productService.delete(id);
    return successResponse(data, ctx);
  }
  private async restoreProduct(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const id = ctx.query.id;
    const data = await this.productService.restore(id);
    return successResponse(data, ctx);
  }
  private async getProductByIdAdmin(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const id = ctx.query.id;
    const data = await this.productService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getProductByNameAdmin(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const nameProduct = ctx.query.nameProduct;
    const data = await this.productService.getByNameAdmin(nameProduct);
    return successResponse(data, ctx);
  }
  private async getAllActiveProduct(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const data = await this.productService.getAllProductActive();
    return successResponse(data, ctx);
  }
  private async getAllInactiveProduct(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const data = await this.productService.getAllProductInactive();
    return successResponse(data, ctx);
  }
  private async getAllProduct(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const data = await this.productService.getAllProduct();
    return successResponse(data, ctx);
  }
  // ********************* productItem ********************* //
  private async createProductitem(ctx: Context) {
    const form = ctx.body as ICreateProductItemForm;
    const data = await this.productItemService.create(form);
    return successResponse(data, ctx);
  }
  private async updateProductItem(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const id = ctx.query.id;
    const form = ctx.body as IUpdateProductItemForm;
    const data = await this.productItemService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deleteProductItem(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const id = ctx.query.id;
    const data = await this.productItemService.delete(id);
    return successResponse(data, ctx);
  }
  private async restoreProductItem(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const id = ctx.query.id;
    const data = await this.productItemService.restore(id);
    return successResponse(data, ctx);
  }
  private async getProductItemByIdAdmin(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const id = ctx.query.id;
    const data = await this.productItemService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getProductItemByNameAdmin(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const nameProductItem = ctx.query.nameProductItem;
    const data = await this.productItemService.getByNameAdmin(nameProductItem);
    return successResponse(data, ctx);
  }
  private async getAllActiveProductItem(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const data = await this.productItemService.getAllProductItemActive();
    return successResponse(data, ctx);
  }
  private async getAllInactiveProductItem(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const data = await this.productItemService.getAllProductItemInactive();
    return successResponse(data, ctx);
  }
  private async getAllProductItem(ctx: Context) {
    // Replace 'any' with the actual type of 'ctx'
    const data = await this.productItemService.getAllProductItem();
    return successResponse(data, ctx);
  }
  // ********************* supplier ********************* //
  private async getAllSupplier(ctx: Context) {
    const data = await this.supplierService.getAllActive();
    return successResponse(data, ctx);
  }
  // ********************* import ********************* //
  private async createImport(ctx: Context) {
    const form = ctx.body as ICreateImportForm;
    const data = await this.importService.create(form);
    return successResponse(data, ctx);
  }
  private async getImportById(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.importService.getById(id);
    return successResponse(data, ctx);
  }
  private async getAllImport(ctx: Context) {
    const data = await this.importService.getAll();
    return successResponse(data, ctx);
  }
  private async getImportByTitle(ctx: Context) {
    const title = ctx.query.title;
    const data = await this.importService.getByTitle(title);
    return successResponse(data, ctx);
  }
  private async getImportByTimeRange(ctx: Context) {
    const { startDate, endDate } = ctx.query;

    // Validate dạng yyyy-mm-dd bằng regex
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return {
        statusCode: 400,
        message: "Invalid date format (yyyy-mm-dd)",
      };
    }
    const data = await this.importService.getByTimeRange(startDate, endDate);
    return successResponse(data, ctx);
  }

  private async getImportBySupplierId(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.importService.getBySupplierId(id);
    return successResponse(data, ctx);
  }
  // ********************* importDetail ********************* //
  private async createImportDetail(ctx: Context) {
    const form = ctx.body as ICreateImportDetailForm;
    const data = await this.importDetailService.create(form);
    return successResponse(data, ctx);
  }
  private async getImportDetailById(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.importDetailService.getById(id);
    return successResponse(data, ctx);
  }
  private async getAllImportDetail(ctx: Context) {
    const data = await this.importDetailService.getAll();
    return successResponse(data, ctx);
  }
  private async getImportDetailByImportId(ctx: Context) {
    const importId = ctx.query.importId;
    const data = await this.importDetailService.getByImportId(importId);
    return successResponse(data, ctx);
  }
  // ********************* order ********************* //
  private async getAllOrder(ctx: Context) {
    const data = await this.orderService.getAllOrder();
    return successResponse(data, ctx);
  }
  private async getOrderDetail(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.orderService.getOrderDetail(id);
    return successResponse(data, ctx);
  }
  private async getAllOrderProcessing(ctx: Context) {
    const data = await this.orderService.getAllOrderProcessing();
    return successResponse(data, ctx);
  }
  // private async getAllOrderShipped(ctx: Context) {
  //     const data = await this.orderService.getAllOrderShipped();
  //     return successResponse(data, ctx);
  // }
  private async getAllOrderDelivered(ctx: Context) {
    const data = await this.orderService.getAllOrderDelivered();
    return successResponse(data, ctx);
  }
  private async getAllOrderCompleted(ctx: Context) {
    const data = await this.orderService.getAllOrderCompleted();
    return successResponse(data, ctx);
  }
  private async getAllOrderCancelled(ctx: Context) {
    const data = await this.orderService.getAllOrderCancelled();
    return successResponse(data, ctx);
  }
  private async getAllOrderCreatedBetweenTime(ctx: Context) {
    const { startDate, endDate } = ctx.query;

    // Validate dạng yyyy-mm-dd bằng regex
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return {
        statusCode: 400,
        message: "Invalid date format (yyyy-mm-dd)",
      };
    }

    const data = await this.orderService.getAllOrderProcessingByTime(
      startDate,
      endDate,
    );

    return successResponse(data, ctx);
  }
  private async getAllOrderDeliveredBetweenTime(ctx: Context) {
    const { startDate, endDate } = ctx.query;

    // Validate dạng yyyy-mm-dd bằng regex
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return {
        statusCode: 400,
        message: "Invalid date format (yyyy-mm-dd)",
      };
    }

    const data = await this.orderService.getAllOrderDeliveredByTime(
      startDate,
      endDate,
    );

    return successResponse(data, ctx);
  }
  private async getAllOrderCompletedBetweenTime(ctx: Context) {
    const { startDate, endDate } = ctx.query;

    // Validate dạng yyyy-mm-dd bằng regex
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(startDate) || !dateRegex.test(endDate)) {
      return {
        statusCode: 400,
        message: "Invalid date format (yyyy-mm-dd)",
      };
    }

    const data = await this.orderService.getAllOrderCompletedByTime(
      startDate,
      endDate,
    );

    return successResponse(data, ctx);
  }
  private async getOrderByOrderId(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.orderService.getOrderByOrderId(id);
    return successResponse(data, ctx);
  }
  private async getAllOrderByUserId(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.orderService.getAllOrderByUserId(id);
    return successResponse(data, ctx);
  }
  private async takeOrderToDelivered(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.orderService.TakeOrderDeliveredAdmin(id);
    return successResponse(data, ctx);
  }
  // ********************* store ********************* //
  private async getStore(ctx: Context) {
    const data = await this.storeService.getActiveByAdmin();
    return successResponse(data, ctx);
  }
  // ********************* conservation ********************* //
  private async getAllConservationByManagerId(ctx: AuthContext) {
    const userId = ctx.decoded.sub;
    const data =
      await this.conservationService.getConversationByManagerId(userId);
    return successResponse(data, ctx);
  }
  private async getAllWaitingConservation(ctx: Context) {
    const data = await this.conservationService.getAllWaitingConversations();
    return successResponse(data, ctx);
  }
  private async assignManager(ctx: AuthContext) {
    const conservationId = ctx.query.conservationId;
    const managerId = ctx.decoded.sub;
    const data = await this.conservationService.assignManager(
      conservationId,
      managerId,
    );

    console.log("Assigned manager controller:", data);
    return successResponse(data, ctx);
  }
  private async sendMessageByManager(ctx: AuthContext) {
    const senderId = ctx.decoded.sub;
    const conservationId = ctx.query.conservationId;

    const form = sendMessageSchema.parse(ctx.body);

    const data = await this.conservationService.sendMessage(
      conservationId,
      senderId,
      "manager",
      form.content,
    );

    return successResponse(data, ctx);
  }

  getRoutes(mdlFactory: MdlFactory) {
    const module = new Elysia({ prefix: "/manager" })
      .derive(mdlFactory.auth)
      .get("/renew", this.renewTokenManager.bind(this))
      .get("/get-all-user", this.getAllUserActive.bind(this));
    const brandRoutes = new Elysia({ prefix: "/brand" }).get(
      "",
      this.getAllAcitveBrand.bind(this),
    );
    const cateRoutes = new Elysia({ prefix: "/cate" }).get(
      "",
      this.getAllAcitveCate.bind(this),
    );
    const sizeRoutes = new Elysia({ prefix: "/size" }).get(
      "",
      this.getAllAcitveSize.bind(this),
    );
    const sizeTypeRoutes = new Elysia({ prefix: "/sizetype" }).get(
      "",
      this.getAllActiveSizeType.bind(this),
    );
    const colorRoutes = new Elysia({ prefix: "/color" }).get(
      "",
      this.getAllAcitveColor.bind(this),
    );
    const productRoutes = new Elysia({ prefix: "/product" })
      .get("", this.getAllProduct.bind(this))
      .get("/active", this.getAllActiveProduct.bind(this))
      .get("/inactive", this.getAllInactiveProduct.bind(this))
      .get("/search/id", this.getProductByIdAdmin.bind(this))
      .get("/search/name", this.getProductByNameAdmin.bind(this))
      .post("/create", this.createProduct.bind(this))
      .put("/update", this.updateProduct.bind(this))
      .put("/delete", this.deleteProduct.bind(this))
      .put("/restore", this.restoreProduct.bind(this));
    const productItemRoutes = new Elysia({ prefix: "/productitem" })
      .get("", this.getAllProductItem.bind(this))
      .get("/active", this.getAllActiveProductItem.bind(this))
      .get("/inactive", this.getAllInactiveProductItem.bind(this))
      .get("/search/id", this.getProductItemByIdAdmin.bind(this))
      .get("/search/name", this.getProductItemByNameAdmin.bind(this))
      .post("/create", this.createProductitem.bind(this))
      .put("/update", this.updateProductItem.bind(this))
      .put("/delete", this.deleteProductItem.bind(this))
      .put("/restore", this.restoreProductItem.bind(this));
    const order = new Elysia({ prefix: "/order" })
      .get("/all-order", this.getAllOrder.bind(this))
      .get("/detail-order", this.getOrderDetail.bind(this))
      .get("/all-order-processing", this.getAllOrderProcessing.bind(this))
      .get("/all-order-delivered", this.getAllOrderDelivered.bind(this))
      .get("/all-order-completed", this.getAllOrderCompleted.bind(this))
      .get("/all-order-cancelled", this.getAllOrderCancelled.bind(this))
      .get("/order-created/time", this.getAllOrderCreatedBetweenTime.bind(this))
      .get(
        "/order-delivered/time",
        this.getAllOrderDeliveredBetweenTime.bind(this),
      )
      .get(
        "/order-completed/time",
        this.getAllOrderCompletedBetweenTime.bind(this),
      )
      .get("/order-id", this.getOrderByOrderId.bind(this))
      .get("/user-id", this.getAllOrderByUserId.bind(this))
      .put("/take-delivered", this.takeOrderToDelivered.bind(this));

    const supplierRoutes = new Elysia({ prefix: "/supplier" }).get(
      "",
      this.getAllSupplier.bind(this),
    );
    const importRoutes = new Elysia({ prefix: "/import" })
      .derive(mdlFactory.auth)
      .post("/create", this.createImport.bind(this))
      .get("", this.getAllImport.bind(this))
      .get("/search/id", this.getImportById.bind(this))
      .get("/search/title", this.getImportByTitle.bind(this))
      .get("/search/time-range", this.getImportByTimeRange.bind(this));
    const importDetailRoutes = new Elysia({ prefix: "/import/import-detail" })
      .derive(mdlFactory.auth)
      .post("/create", this.createImportDetail.bind(this))
      .get("", this.getAllImportDetail.bind(this))
      .get("/search/id", this.getImportDetailById.bind(this))
      .get("/search/import-id", this.getImportDetailByImportId.bind(this));
    const storeRoutes = new Elysia({ prefix: "/store" }).get(
      "",
      this.getStore.bind(this),
    );
    const conservationRoutes = new Elysia({ prefix: "/conservation" })
      .derive(mdlFactory.auth)
      .get("/by-manager-id", this.getAllConservationByManagerId.bind(this))
      .get("/waiting", this.getAllWaitingConservation.bind(this))
      .post("/assign-manager", this.assignManager.bind(this))
      .post("/send-message", this.sendMessageByManager.bind(this));

    module.use(conservationRoutes);
    module.use(storeRoutes);
    module.use(importRoutes);
    module.use(importDetailRoutes);
    module.use(supplierRoutes);
    module.use(order);
    module.use(sizeRoutes);
    module.use(sizeTypeRoutes);
    module.use(colorRoutes);
    module.use(cateRoutes);
    module.use(productRoutes);
    module.use(productItemRoutes);
    module.use(brandRoutes);
    return module;
  }
}
