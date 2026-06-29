import Elysia, { Context } from "elysia";
import { AuthContext } from "../../../src/shared/middleware";
import { successResponse } from "../../../src/shared/utils/response";
import { ICateService } from "../../category/interface";
import { ICreateCateForm, IUpdateCateForm } from "../../category/model";
import { MdlFactory, TokenType } from "../../../src/shared/interface";
import { IUserService } from "../../user/interface";
import { ISignupForm } from "../../user/model";
import { ErrTokenInvalid } from "../../../src/shared/utils/error";
import { IBrandService } from "../../brand/interface";
import { ICreateBrandForm } from "../../brand/model";
import { ISizeTypeService } from "../../sizetype/interface";
import { ICreateSizeTypeForm } from "../../sizetype/model";
import { IColorService } from "../../color/interface";
import { ICreateColorForm, IUpdateColorForm } from "../../color/model";
import { ISizeService } from "../../size/interface";
import { ICreateSizeForm, IUpdateSizeForm } from "../../size/model";
import { IProductService } from "../../product/interface";
import { ICreateProductForm, IUpdateProductForm } from "../../product/model";
import { IPromotionService } from "../../promotion/interface";
import {
  ICreatePromotionForm,
  IUpdatePromotionForm,
} from "../../promotion/model";
import { IProductItemService } from "../../productitem/interface";
import {
  ICreateProductItemForm,
  IUpdateProductItemForm,
} from "../../productitem/model";
import { ISupplierService } from "../../supplier/interface";
import { ICreateSupplierForm, IUpdateSupplierForm } from "../../supplier/model";
import { IImportService } from "../../import/interface";
import { ICreateImportForm } from "../../import/model";
import { IImportDetailService } from "../../importdetail/inteface";
import { ICreateImportDetailForm } from "../../importdetail/model";
import { IPaymentService } from "../../payment/interface";
import { ICreatePaymentForm, IUpdatePaymentForm } from "../../payment/model";
import { IStoreService } from "../../store/interface";
import { ICreateStoreForm, IUpdateStoreForm } from "../../store/model";
import { IOrderService } from "../../order/interface";
import { ISendbirdService } from "../../sendbird/interface";

export class HttpAdminController {
  constructor(
    private readonly userService: IUserService,
    private readonly cateService: ICateService,
    private readonly brandService: IBrandService,
    private readonly sizeTypeService: ISizeTypeService,
    private readonly colorService: IColorService,
    private readonly sizeServuce: ISizeService,
    private readonly productService: IProductService,
    private readonly promotionService: IPromotionService,
    private readonly productItemService: IProductItemService,
    private readonly supplierService: ISupplierService,
    private readonly importService: IImportService,
    private readonly importDetailService: IImportDetailService,
    private readonly paymentService: IPaymentService,
    private readonly storeService: IStoreService,
    private readonly orderService: IOrderService,
    private readonly sendbirdService: ISendbirdService,
  ) {}
  // ********************* user ********************* //
  private async signupAdmin(ctx: Context) {
    const form = ctx.body as ISignupForm;
    const data = await this.userService.signupAdmin(form);
    return successResponse(data, ctx);
  }
  private async signupManager(ctx: Context) {
    const form = ctx.body as ISignupForm;
    const data = await this.userService.signupManager(form);
    return successResponse(data, ctx);
  }
  private async renewTokenAdmin(ctx: AuthContext) {
    const token = ctx.token;
    if (ctx.decoded.type !== TokenType.RefreshToken)
      throw ErrTokenInvalid.withLog("Not the expected token");

    const data = await this.userService.renewTokenAdmin(token);

    return successResponse(data, ctx);
  }
  private async getAllUser(ctx: Context) {
    const data = await this.userService.getAllUserAdmin();
    return successResponse(data, ctx);
  }
  private async getAllUserActiveAdmin(ctx: Context) {
    const data = await this.userService.getAllUserActiveAdmin();
    return successResponse(data, ctx);
  }
  private async getAllUserInactiveAdmin(ctx: Context) {
    const data = await this.userService.getAllUserInactiveAdmin();
    return successResponse(data, ctx);
  }
  private async getAllManager(ctx: Context) {
    const data = await this.userService.getAllManager();
    return successResponse(data, ctx);
  }
  private async getAllManagerActive(ctx: Context) {
    const data = await this.userService.getAllManagerActiveAdmin();
    return successResponse(data, ctx);
  }
  private async getAllManagerInactive(ctx: Context) {
    const data = await this.userService.getAllManagerInactiveAdmin();
    return successResponse(data, ctx);
  }
  private async getAllUserAndManager(ctx: Context) {
    const data = await this.userService.getAllUserAndManagerAdmin();
    return successResponse(data, ctx);
  }
  private async lockUser(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.userService.lockUser(id);
    return successResponse(data, ctx);
  }
  private async unlockUser(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.userService.unlockUser(id);
    return successResponse(data, ctx);
  }
  private async getUserById(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.userService.getProfile(id);
    return successResponse(data, ctx);
  }
  // ********************* category ********************* //
  private async insertCate(ctx: Context) {
    const form = ctx.body as ICreateCateForm;
    const data = await this.cateService.create(form);
    return successResponse(data, ctx);
  }
  private async updateCate(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateCateForm;
    const data = await this.cateService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deleteCate(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.cateService.delete(id);
    return successResponse(data, ctx);
  }
  private async restoreCate(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.cateService.restore(id);
    return successResponse(data, ctx);
  }
  private async getAllCateActive(ctx: Context) {
    const data = await this.cateService.getAllCateActive();
    return successResponse(data, ctx);
  }
  private async getAllCateInactive(ctx: Context) {
    const data = await this.cateService.getAllCateInactive();
    return successResponse(data, ctx);
  }
  private async getAllCate(ctx: Context) {
    const data = await this.cateService.getAllCate();
    return successResponse(data, ctx);
  }
  private async getCateByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.cateService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getCateByNameAdmin(ctx: Context) {
    const nameCate = ctx.query.nameCate;
    const data = await this.cateService.getByNameAdmin(nameCate);
    return successResponse(data, ctx);
  }

  // ********************* brand ********************* //
  private async insertBrand(ctx: Context) {
    const form = ctx.body as ICreateBrandForm;
    const data = await this.brandService.create(form);
    return successResponse(data, ctx);
  }
  private async updateBrand(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateCateForm;
    const data = await this.brandService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deleteBrand(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.brandService.delete(id);
    return successResponse(data, ctx);
  }
  private async restoreBrand(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.brandService.restore(id);
    return successResponse(data, ctx);
  }
  private async getAllBrandActive(ctx: Context) {
    const data = await this.brandService.getAllBrandActive();
    return successResponse(data, ctx);
  }
  private async getAllBrandInactive(ctx: Context) {
    const data = await this.brandService.getAllBrandInactive();
    return successResponse(data, ctx);
  }
  private async getAllBrand(ctx: Context) {
    const data = await this.brandService.getAllBrand();
    return successResponse(data, ctx);
  }
  private async getBrandByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.brandService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getBrandByNameAdmin(ctx: Context) {
    const nameBrand = ctx.query.nameBrand;
    const data = await this.brandService.getByNameAdmin(nameBrand);
    return successResponse(data, ctx);
  }
  // ********************* size type ********************* //
  private async insertSizeType(ctx: Context) {
    const form = ctx.body as ICreateSizeTypeForm;
    const data = await this.sizeTypeService.create(form);
    return successResponse(data, ctx);
  }
  private async updateSizeType(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateCateForm;
    const data = await this.sizeTypeService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deleteSizeType(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeTypeService.delete(id);
    return successResponse(data, ctx);
  }
  private async restoreSizeType(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeTypeService.restore(id);
    return successResponse(data, ctx);
  }
  private async getAllSizeTypeActive(ctx: Context) {
    const data = await this.sizeTypeService.getAllActive();
    return successResponse(data, ctx);
  }
  private async getAllSizeTypeInactive(ctx: Context) {
    const data = await this.sizeTypeService.getAllInactive();
    return successResponse(data, ctx);
  }
  private async getAllSizeType(ctx: Context) {
    const data = await this.sizeTypeService.getAll();
    return successResponse(data, ctx);
  }
  private async getSizeTypeByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeTypeService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getSizeTypeByNameAdmin(ctx: Context) {
    const nameSizeType = ctx.query.nameSizeType;
    const data = await this.sizeTypeService.getByNameAdmin(nameSizeType);
    return successResponse(data, ctx);
  }
  // ********************* color ********************* //
  private async insertColor(ctx: Context) {
    const form = ctx.body as ICreateColorForm;
    const data = await this.colorService.create(form);
    return successResponse(data, ctx);
  }
  private async updateColor(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateColorForm;
    const data = await this.colorService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deleteColor(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.colorService.delete(id);
    return successResponse(data, ctx);
  }
  private async restoreColor(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.colorService.restore(id);
    return successResponse(data, ctx);
  }
  private async getAllColorActive(ctx: Context) {
    const data = await this.colorService.getAllActive();
    return successResponse(data, ctx);
  }
  private async getAllColorInactive(ctx: Context) {
    const data = await this.colorService.getAllInactive();
  }
  private async getAllColor(ctx: Context) {
    const data = await this.colorService.getAll();
    return successResponse(data, ctx);
  }
  private async getColorByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.colorService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getColorByNameAdmin(ctx: Context) {
    const nameColor = ctx.query.nameColor;
    const data = await this.colorService.getByNameAdmin(nameColor);
    return successResponse(data, ctx);
  }
  // ********************* size ********************* //
  private async insertSize(ctx: Context) {
    const form = ctx.body as ICreateSizeForm;
    const data = await this.sizeServuce.create(form);
    return successResponse(data, ctx);
  }
  private async updateSize(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateSizeForm;
    const data = await this.sizeServuce.update(id, form);
    return successResponse(data, ctx);
  }
  private async deleteSize(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeServuce.delete(id);
    return successResponse(data, ctx);
  }
  private async restoreSize(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeServuce.restore(id);
    return successResponse(data, ctx);
  }
  private async getAllSizeActive(ctx: Context) {
    const data = await this.sizeServuce.getAllActive();
    return successResponse(data, ctx);
  }
  private async getAllSizeInactive(ctx: Context) {
    const data = await this.sizeServuce.getAllInactive();
    return successResponse(data, ctx);
  }
  private async getAllSize(ctx: Context) {
    const data = await this.sizeServuce.getAll();
    return successResponse(data, ctx);
  }
  private async getSizeByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeServuce.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getSizeByNameAdmin(ctx: Context) {
    const nameSize = ctx.query.nameSize;
    const data = await this.sizeServuce.getByNameAdmin(nameSize);
    return successResponse(data, ctx);
  }
  private async getSizeBySizeTypeIdAdmin(ctx: Context) {
    const sizeTypeId = ctx.query.sizeTypeId;
    const data = await this.sizeServuce.getSizeBySizeTypeIdAdmin(sizeTypeId);
    return successResponse(data, ctx);
  }
  private async getSizeBySizeTypeNameAdmin(ctx: Context) {
    const nameSizeType = ctx.query.nameSizeType;
    const data =
      await this.sizeServuce.getSizeBySizeTypeNameAdmin(nameSizeType);
    return successResponse(data, ctx);
  }
  private async getSizeAndNameSizeType(ctx: Context) {
    const data = await this.sizeServuce.getSizeAndNameSizeType();
    return successResponse(data, ctx);
  }
  // ********************* product ********************* //
  private async insertProduct(ctx: Context) {
    const form = ctx.body as ICreateProductForm;
    const data = await this.productService.create(form);
    return successResponse(data, ctx);
  }
  private async updateProduct(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateProductForm;
    const data = await this.productService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deleteProduct(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productService.delete(id);
    return successResponse(data, ctx);
  }
  private async restoreProduct(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productService.restore(id);
    return successResponse(data, ctx);
  }
  private async getAllProductActive(ctx: Context) {
    const data = await this.productService.getAllProductActive();
    return successResponse(data, ctx);
  }
  private async getAllProductInactive(ctx: Context) {
    const data = await this.productService.getAllProductInactive();
    return successResponse(data, ctx);
  }
  private async getAllProduct(ctx: Context) {
    const data = await this.productService.getAllProduct();
    return successResponse(data, ctx);
  }
  private async getProductByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getProductByNameAdmin(ctx: Context) {
    const nameProduct = ctx.query.nameProduct;
    const data = await this.productService.getByNameAdmin(nameProduct);
    return successResponse(data, ctx);
  }
  // ********************* promotion ********************* //
  private async insertPromotion(ctx: Context) {
    const form = ctx.body as ICreatePromotionForm;
    const data = await this.promotionService.create(form);
    return successResponse(data, ctx);
  }
  private async updatePromotion(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdatePromotionForm;
    const data = await this.promotionService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deletePromotion(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.promotionService.delete(id);
    return successResponse(data, ctx);
  }
  private async restorePromotion(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.promotionService.restore(id);
    return successResponse(data, ctx);
  }
  private async getAllPromotionActive(ctx: Context) {
    const data = await this.promotionService.getAllPromotionActive();
    return successResponse(data, ctx);
  }
  private async getAllPromotionInactive(ctx: Context) {
    const data = await this.promotionService.getAllPromotionInactive();
    return successResponse(data, ctx);
  }
  private async getAllPromotion(ctx: Context) {
    const data = await this.promotionService.getAllPromotion();
    return successResponse(data, ctx);
  }
  private async getPromotionByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.promotionService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getPromotionByNameAdmin(ctx: Context) {
    const codePromotion = ctx.query.codePromotion;
    const data = await this.promotionService.getByNameAdmin(codePromotion);
    return successResponse(data, ctx);
  }
  // ********************* productItem ********************* //
  private async insertProductItem(ctx: Context) {
    const form = ctx.body as ICreateProductItemForm;
    const data = await this.productItemService.create(form);
    return successResponse(data, ctx);
  }
  private async updateProductItem(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateProductItemForm;
    const data = await this.productItemService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deleteProductItem(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productItemService.delete(id);
    return successResponse(data, ctx);
  }
  private async restoreProductItem(ctx: Context) {
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
  private async getAllProductItemActive(ctx: Context) {
    const data = await this.productItemService.getAllProductItemActive();
    return successResponse(data, ctx);
  }
  private async getAllProductItemInactive(ctx: Context) {
    const data = await this.productItemService.getAllProductItemInactive();
    return successResponse(data, ctx);
  }
  private async getAllProductItem(ctx: Context) {
    const data = await this.productItemService.getAllProductItem();
    return successResponse(data, ctx);
  }
  private async getAllProductItemByBrandId(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productItemService.getAllProductItemByBrandId(id);
    return successResponse(data, ctx);
  }
  private async getAllProductItemByCateId(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productItemService.getAllProductItemByCateId(id);
    return successResponse(data, ctx);
  }
  private async getAllProductItemByProductId(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productItemService.getAllProductItemByProductId(id);
    return successResponse(data, ctx);
  }
  private async getAllProductItemBySizeId(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productItemService.getAllProductItemBySizeId(id);
    return successResponse(data, ctx);
  }
  private async getAllProductItemByColorId(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productItemService.getAllProductItemByColorId(id);
    return successResponse(data, ctx);
  }
  private async addPromotionToProductItem(ctx: Context) {
    const id = ctx.query.id;
    const promotionId = ctx.query.promotionId;

    const data = await this.productItemService.addPromotionToProductItem(
      id,
      promotionId,
    );

    return successResponse(data, ctx);
  }
  private async deletePromotionFromProductItem(ctx: Context) {
    const id = ctx.query.id;
    const data =
      await this.productItemService.deletePromotionFromProductItem(id);
    return successResponse(data, ctx);
  }
  // ********************* supplier ********************* //
  private async insertSupplier(ctx: Context) {
    const form = ctx.body as ICreateSupplierForm;
    const data = await this.supplierService.create(form);
    return successResponse(data, ctx);
  }
  private async updateSupplier(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateSupplierForm;
    const data = await this.supplierService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deleteSupplier(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.supplierService.delete(id);
    return successResponse(data, ctx);
  }
  private async restoreSupplier(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.supplierService.restore(id);
    return successResponse(data, ctx);
  }
  private async getAllSupplier(ctx: Context) {
    const data = await this.supplierService.getAll();
    return successResponse(data, ctx);
  }
  private async getAllSupplierActive(ctx: Context) {
    const data = await this.supplierService.getAllActive();
    return successResponse(data, ctx);
  }
  private async getAllSupplierInactive(ctx: Context) {
    const data = await this.supplierService.getAllInactive();
    return successResponse(data, ctx);
  }
  private async getSupplierByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.supplierService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getSupplierByNameAdmin(ctx: Context) {
    const nameSupplier = ctx.query.nameSupplier;
    const data = await this.supplierService.getByNameAdmin(nameSupplier);
    return successResponse(data, ctx);
  }
  // ********************* import ********************* //
  private async insertImport(ctx: Context) {
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
    const startDate = ctx.query.startDate;
    const endDate = ctx.query.endDate;
    const data = await this.importService.getByTimeRange(startDate, endDate);
    return successResponse(data, ctx);
  }
  private async getImportBySupplierId(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.importService.getBySupplierId(id);
    return successResponse(data, ctx);
  }
  // ********************* importdetail ********************* //
  private async insertImportDetail(ctx: Context) {
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
    const id = ctx.query.importId;
    const data = await this.importDetailService.getByImportId(id);
    return successResponse(data, ctx);
  }
  private async getImportDetailByProductId(ctx: Context) {
    const id = ctx.query.productItemId;
    const data = await this.importDetailService.getByProductItemId(id);
    return successResponse(data, ctx);
  }
  // ********************* payment ********************* //
  private async insertPayment(ctx: Context) {
    const form = ctx.body as ICreatePaymentForm;
    const data = await this.paymentService.create(form);
    return successResponse(data, ctx);
  }
  private async updatePayment(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdatePaymentForm;
    const data = await this.paymentService.update(id, form);
    return successResponse(data, ctx);
  }
  private async deletePayment(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.paymentService.delete(id);
    return successResponse(data, ctx);
  }
  private async restorePayment(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.paymentService.restore(id);
    return successResponse(data, ctx);
  }
  private async getPaymentByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.paymentService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getPaymentByNameAdmin(ctx: Context) {
    const namePayment = ctx.query.namePayment;
    const data = await this.paymentService.getByNameAdmin(namePayment);
    return successResponse(data, ctx);
  }
  private async getAllPaymentActive(ctx: Context) {
    const data = await this.paymentService.getAllPaymentActive();
    return successResponse(data, ctx);
  }
  private async getAllPaymentInactive(ctx: Context) {
    const data = await this.paymentService.getAllPaymentInactive();
    return successResponse(data, ctx);
  }
  private async getAllPayment(ctx: Context) {
    const data = await this.paymentService.getAllPayment();
    return successResponse(data, ctx);
  }
  // ********************* store ********************* //
  private async insertStore(ctx: Context) {
    const form = ctx.body as ICreateStoreForm;
    const data = await this.storeService.create(form);
    return successResponse(data, ctx);
  }
  private async updateStore(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateStoreForm;
    const data = await this.storeService.update(id, form);
    return successResponse(data, ctx);
  }
  private async activeStore(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.storeService.active(id);
    return successResponse(data, ctx);
  }
  private async getStoreByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.storeService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  private async getActiveStoreByAdmin(ctx: Context) {
    const data = await this.storeService.getActiveByAdmin();
    return successResponse(data, ctx);
  }
  private async getInactiveStoreByAdmin(ctx: Context) {
    const data = await this.storeService.getInactiveByAdmin();
    return successResponse(data, ctx);
  }
  private async getAllStoreByAdmin(ctx: Context) {
    const data = await this.storeService.getAll();
    return successResponse(data, ctx);
  }
  // ********************* order ********************* //
  private async getAllOrder(ctx: Context) {
    const data = await this.orderService.getAllOrder();
    return successResponse(data, ctx);
  }
  private async getOrderDetailByOrderId(ctx: Context) {
    const orderId = ctx.query.orderId;
    console.log(orderId);
    const data = await this.orderService.getOrderDetail(orderId);
    return successResponse(data, ctx);
  }
  private async getAllOrderProcessing(ctx: Context) {
    const data = await this.orderService.getAllOrderProcessing();
    return successResponse(data, ctx);
  }
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
  private async getAllOrderProcssinByTime(ctx: Context) {
    const startDate = ctx.query.startDate;
    const endDate = ctx.query.endDate;
    const data = await this.orderService.getAllOrderProcessingByTime(
      startDate,
      endDate,
    );
    return successResponse(data, ctx);
  }
  private async getAllOrderDeliveredByTime(ctx: Context) {
    const startDate = ctx.query.startDate;
    const endDate = ctx.query.endDate;
    const data = await this.orderService.getAllOrderDeliveredByTime(
      startDate,
      endDate,
    );
    return successResponse(data, ctx);
  }
  private async getAllOrderCompletedByTime(ctx: Context) {
    const startDate = ctx.query.startDate;
    const endDate = ctx.query.endDate;
    const data = await this.orderService.getAllOrderCompletedByTime(
      startDate,
      endDate,
    );
    return successResponse(data, ctx);
  }
  private async getAllOrderCancelledByTime(ctx: Context) {
    const startDate = ctx.query.startDate;
    const endDate = ctx.query.endDate;
    const data = await this.orderService.getAllOrderCancelledByTime(
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
    const userId = ctx.query.userId;
    const data = await this.orderService.getAllOrderByUserId(userId);
    return successResponse(data, ctx);
  }
  private async CancelledOrderAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.orderService.CancelledOrderAdmin(id);
    return successResponse(data, ctx);
  }
  private async TakeOrderDeliveredAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.orderService.TakeOrderDeliveredAdmin(id);
    return successResponse(data, ctx);
  }
  // ********************* statistic ********************* //
  private async getStatistic(ctx: Context) {
    const data = await this.orderService.generalStatistic();
    return successResponse(data, ctx);
  }
  private async statisticByStatus(ctx: Context) {
    const data = await this.orderService.statisticByStatus();
    return successResponse(data, ctx);
  }
  private async statisticByTime(ctx: Context) {
    const data = await this.orderService.statisticByTime();
    return successResponse(data, ctx);
  }
  private async getTopSellingProductItem(ctx: Context) {
    const data = await this.orderService.getTopSellingProductItem();
    return successResponse(data, ctx);
  }
  private async getBrandStatistics(ctx: Context) {
    const data = await this.orderService.getBrandStatistics();
    return successResponse(data, ctx);
  }
  private async getCategoryStatistics(ctx: Context) {
    const data = await this.orderService.getCategoryStatistics();
    return successResponse(data, ctx);
  }
  // ********************* sendbird ********************* //
  private async getAllGroupChannels(ctx: Context) {
    const data = await this.sendbirdService.getAllGroupChannels();
    return successResponse(data, ctx);
  }
  private async getMessagesFromGroupChannel(ctx: Context) {
    const channelUrl = ctx.query.channelUrl;
    const data =
      await this.sendbirdService.getMessagesFromGroupChannel(channelUrl);
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const module = new Elysia({ prefix: "/admin" })
      .post("/signup", this.signupAdmin.bind(this))

      .derive(mdlFactory.auth)
      .post("/signup-manager", this.signupManager.bind(this))
      .get("/renew", this.renewTokenAdmin.bind(this))

      .get("/user", this.getAllUser.bind(this))
      .get("/user/active", this.getAllUserActiveAdmin.bind(this))
      .get("/user/inactive", this.getAllUserInactiveAdmin.bind(this))
      .get("/manager", this.getAllManager.bind(this))
      .get("/manager/active", this.getAllManagerActive.bind(this))
      .get("/manager/inactive", this.getAllManagerInactive.bind(this))
      .get("/user-and-manager", this.getAllUserAndManager.bind(this))
      .put("/lock-user", this.lockUser.bind(this))
      .put("/restore-user", this.unlockUser.bind(this));
    const cateRoutes = new Elysia({ prefix: "/cate" })
      .derive(mdlFactory.auth)
      .get("", this.getAllCate.bind(this))
      .get("/active", this.getAllCateActive.bind(this))
      .get("/inactive", this.getAllCateInactive.bind(this))
      .get("/search/id", this.getCateByIdAdmin.bind(this))
      .get("/search/name", this.getCateByNameAdmin.bind(this))
      .post("/create", this.insertCate.bind(this))
      .put("/update", this.updateCate.bind(this))
      .put("/delete", this.deleteCate.bind(this))
      .put("/restore", this.restoreCate.bind(this));
    // .get("/search/userid", this.getUserById.bind(this));
    const brandRoutes = new Elysia({ prefix: "/brand" })
      .derive(mdlFactory.auth)
      .get("", this.getAllBrand.bind(this))
      .get("/active", this.getAllBrandActive.bind(this))
      .get("/inactive", this.getAllBrandInactive.bind(this))
      .get("/search/id", this.getBrandByIdAdmin.bind(this))
      .get("/search/name", this.getBrandByNameAdmin.bind(this))
      .post("/create", this.insertBrand.bind(this))
      .put("/update", this.updateBrand.bind(this))
      .put("/delete", this.deleteBrand.bind(this))
      .put("/restore", this.restoreBrand.bind(this));

    const sizeTypeRoutes = new Elysia({ prefix: "/sizetype" })
      .derive(mdlFactory.auth)
      .get("", this.getAllSizeType.bind(this))
      .get("/active", this.getAllSizeTypeActive.bind(this))
      .get("/inactive", this.getAllSizeTypeInactive.bind(this))
      .get("/search/id", this.getSizeTypeByIdAdmin.bind(this))
      .get("/search/name", this.getSizeTypeByNameAdmin.bind(this))
      .post("/create", this.insertSizeType.bind(this))
      .put("/update", this.updateSizeType.bind(this))
      .put("/delete", this.deleteSizeType.bind(this))
      .put("/restore", this.restoreSizeType.bind(this));

    const colorRoutes = new Elysia({ prefix: "/color" })
      .derive(mdlFactory.auth)
      .get("", this.getAllColor.bind(this))
      .get("/active", this.getAllColorActive.bind(this))
      .get("/inactive", this.getAllColorInactive.bind(this))
      .get("/search/id", this.getColorByIdAdmin.bind(this))
      .get("/search/name", this.getColorByNameAdmin.bind(this))
      .post("/create", this.insertColor.bind(this))
      .put("/update", this.updateColor.bind(this))
      .put("/delete", this.deleteColor.bind(this))
      .put("/restore", this.restoreColor.bind(this));

    const sizeRoutes = new Elysia({ prefix: "/size" })
      .derive(mdlFactory.auth)
      .get("", this.getAllSize.bind(this))
      .get("/active", this.getAllSizeActive.bind(this))
      .get("/inactive", this.getAllSizeInactive.bind(this))
      .get("/search/id", this.getSizeByIdAdmin.bind(this))
      .get("/search/name", this.getSizeByNameAdmin.bind(this))
      .get("/sizetypename", this.getSizeAndNameSizeType.bind(this))
      .post("/create", this.insertSize.bind(this))
      .put("/update", this.updateSize.bind(this))
      .put("/delete", this.deleteSize.bind(this))
      .put("/restore", this.restoreSize.bind(this))
      .get("/search/sizetypeid", this.getSizeBySizeTypeIdAdmin.bind(this))
      .get("/search/sizetypename", this.getSizeBySizeTypeNameAdmin.bind(this));

    const productRoutes = new Elysia({ prefix: "/product" })
      .derive(mdlFactory.auth)
      .get("", this.getAllProduct.bind(this))
      .get("/active", this.getAllProductActive.bind(this))
      .get("/inactive", this.getAllProductInactive.bind(this))
      .get("/search/id", this.getProductByIdAdmin.bind(this))
      .get("/search/name", this.getProductByNameAdmin.bind(this))
      .post("/create", this.insertProduct.bind(this))
      .put("/update", this.updateProduct.bind(this))
      .put("/delete", this.deleteProduct.bind(this))
      .put("/restore", this.restoreProduct.bind(this));

    const promotionRoutes = new Elysia({ prefix: "/promotion" })
      .derive(mdlFactory.auth)
      .get("", this.getAllPromotion.bind(this))
      .get("/active", this.getAllPromotionActive.bind(this))
      .get("/inactive", this.getAllPromotionInactive.bind(this))
      .get("/search/id", this.getPromotionByIdAdmin.bind(this))
      .get("/search/name", this.getPromotionByNameAdmin.bind(this))
      .post("/create", this.insertPromotion.bind(this))
      .put("/update", this.updatePromotion.bind(this))
      .put("/delete", this.deletePromotion.bind(this))
      .put("/restore", this.restorePromotion.bind(this));

    const productItemRoutes = new Elysia({ prefix: "/productitem" })
      .derive(mdlFactory.auth)
      .get("", this.getAllProductItem.bind(this))
      .get("/active", this.getAllProductItemActive.bind(this))
      .get("/inactive", this.getAllProductItemInactive.bind(this))
      .get("/search/id", this.getProductItemByIdAdmin.bind(this))
      .get("/search/name", this.getProductItemByNameAdmin.bind(this))
      .post("/create", this.insertProductItem.bind(this))
      .put("/update", this.updateProductItem.bind(this))
      .put("/delete", this.deleteProductItem.bind(this))
      .put("/restore", this.restoreProductItem.bind(this))
      .get("/search/product", this.getAllProductItemByProductId.bind(this))
      .get("/search/size", this.getAllProductItemBySizeId.bind(this))
      .get("/search/color", this.getAllProductItemByColorId.bind(this))
      .get("/search/cate", this.getAllProductItemByCateId.bind(this))
      .get("/search/brand", this.getAllProductItemByBrandId.bind(this))
      .put("/add-promotion", this.addPromotionToProductItem.bind(this))
      .put("/delete-promotion", this.deletePromotionFromProductItem.bind(this));

    const supplierRoutes = new Elysia({ prefix: "/supplier" })
      .derive(mdlFactory.auth)
      .get("", this.getAllSupplier.bind(this))
      .get("/active", this.getAllSupplierActive.bind(this))
      .get("/inactive", this.getAllSupplierInactive.bind(this))
      .get("/search/id", this.getSupplierByIdAdmin.bind(this))
      .get("/search/name", this.getSupplierByNameAdmin.bind(this))
      .post("/create", this.insertSupplier.bind(this))
      .put("/update", this.updateSupplier.bind(this))
      .put("/delete", this.deleteSupplier.bind(this))
      .put("/restore", this.restoreSupplier.bind(this));

    const importRoutes = new Elysia({ prefix: "/import" })
      .derive(mdlFactory.auth)
      .post("/create", this.insertImport.bind(this))
      .get("", this.getAllImport.bind(this))
      .get("/search/id", this.getImportById.bind(this))
      .get("/search/title", this.getImportByTitle.bind(this))
      .get("/search/time-range", this.getImportByTimeRange.bind(this))
      .get("/search/supplier", this.getImportBySupplierId.bind(this));

    const importDetailRoutes = new Elysia({ prefix: "/import/import-detail" })
      .derive(mdlFactory.auth)
      .post("/create", this.insertImportDetail.bind(this))
      .get("", this.getAllImportDetail.bind(this))
      .get("/search/id", this.getImportDetailById.bind(this))
      .get("/search/productitem-id", this.getImportDetailByProductId.bind(this))
      .get("/search/import-id", this.getImportDetailByImportId.bind(this));

    const paymentRoutes = new Elysia({ prefix: "/payment" })
      .derive(mdlFactory.auth)
      .get("", this.getAllPayment.bind(this))
      .get("/active", this.getAllPaymentActive.bind(this))
      .get("/inactive", this.getAllPaymentInactive.bind(this))
      .get("/search/id", this.getPaymentByIdAdmin.bind(this))
      .get("/search/name", this.getPaymentByNameAdmin.bind(this))
      .post("/create", this.insertPayment.bind(this))
      .put("/update", this.updatePayment.bind(this))
      .put("/delete", this.deletePayment.bind(this))
      .put("/restore", this.restorePayment.bind(this));

    const storeRoutes = new Elysia({ prefix: "/store" })
      .derive(mdlFactory.auth)
      .get("", this.getAllStoreByAdmin.bind(this))
      .get("/active", this.getActiveStoreByAdmin.bind(this))
      .get("/inactive", this.getInactiveStoreByAdmin.bind(this))
      .get("/search/id", this.getStoreByIdAdmin.bind(this))
      .post("/create", this.insertStore.bind(this))
      .put("/update", this.updateStore.bind(this))
      .put("/active", this.activeStore.bind(this));
    const orderRoutes = new Elysia({ prefix: "/order" })
      .derive(mdlFactory.auth)
      .get("", this.getAllOrder.bind(this))
      .get("/search/id", this.getOrderByOrderId.bind(this))
      .get("/order-detail", this.getOrderDetailByOrderId.bind(this))
      .get("/all-order-processing", this.getAllOrderProcessing.bind(this))
      .get("/all-order-delivered", this.getAllOrderDelivered.bind(this))
      .get("/all-order-completed", this.getAllOrderCompleted.bind(this))
      .get("/all-order-cancelled", this.getAllOrderCancelled.bind(this))
      .get("/order-created/time", this.getAllOrderProcssinByTime.bind(this))
      .get("/order-delivered/time", this.getAllOrderDeliveredByTime.bind(this))
      .get("/order-completed/time", this.getAllOrderCompletedByTime.bind(this))
      .get("/order-cancelled/time", this.getAllOrderCancelledByTime.bind(this))
      .get("/search-by-userid", this.getAllOrderByUserId.bind(this))
      .put("/cancel-order", this.CancelledOrderAdmin.bind(this))
      .put("/take-delivered", this.TakeOrderDeliveredAdmin.bind(this));
    const statisticRoutes = new Elysia({ prefix: "/statistic" })
      .derive(mdlFactory.auth)
      .get("/general-statistic", this.getStatistic.bind(this))
      .get("/by-status", this.statisticByStatus.bind(this))
      .get("/by-time", this.statisticByTime.bind(this))
      .get("/top-selling", this.getTopSellingProductItem.bind(this))
      .get("/by-brand", this.getBrandStatistics.bind(this))
      .get("/by-cate", this.getCategoryStatistics.bind(this));

    const sendbirdRoutes = new Elysia({ prefix: "/sendbird" })
      .derive(mdlFactory.auth)
      .get("/get-all-group-channels", this.getAllGroupChannels.bind(this))
      .get(
        "/get-messages-from-group-channel",
        this.getMessagesFromGroupChannel.bind(this),
      );

    module.use(sendbirdRoutes);
    module.use(statisticRoutes);
    module.use(orderRoutes);
    module.use(storeRoutes);
    module.use(paymentRoutes);
    module.use(importDetailRoutes);
    module.use(importRoutes);
    module.use(supplierRoutes);
    module.use(productItemRoutes);
    module.use(promotionRoutes);
    module.use(productRoutes);
    module.use(sizeRoutes);
    module.use(colorRoutes);
    module.use(sizeTypeRoutes);
    module.use(brandRoutes);
    module.use(cateRoutes);

    return module;
  }
}
