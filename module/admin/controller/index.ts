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
  ) {}
  // ********************* user ********************* //
  async signupAdmin(ctx: Context) {
    const form = ctx.body as ISignupForm;
    const data = await this.userService.signupAdmin(form);
    return successResponse(data, ctx);
  }
  async signupManager(ctx: Context) {
    const form = ctx.body as ISignupForm;
    const data = await this.userService.signupManager(form);
    return successResponse(data, ctx);
  }
  async renewTokenAdmin(ctx: AuthContext) {
    const token = ctx.token;
    if (ctx.decoded.type !== TokenType.RefreshToken)
      throw ErrTokenInvalid.withLog("Not the expected token");

    const data = await this.userService.renewTokenAdmin(token);

    return successResponse(data, ctx);
  }

  // ********************* category ********************* //
  async insertCate(ctx: Context) {
    const form = ctx.body as ICreateCateForm;
    const data = await this.cateService.create(form);
    return successResponse(data, ctx);
  }
  async updateCate(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateCateForm;
    const data = await this.cateService.update(id, form);
    return successResponse(data, ctx);
  }
  async deleteCate(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.cateService.delete(id);
    return successResponse(data, ctx);
  }
  async restoreCate(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.cateService.restore(id);
    return successResponse(data, ctx);
  }
  async getAllCateActive(ctx: Context) {
    const data = await this.cateService.getAllCateActive();
    return successResponse(data, ctx);
  }
  async getAllCateInactive(ctx: Context) {
    const data = await this.cateService.getAllCateInactive();
    return successResponse(data, ctx);
  }
  async getAllCate(ctx: Context) {
    const data = await this.cateService.getAllCate();
    return successResponse(data, ctx);
  }
  async getCateByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.cateService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  async getCateByNameAdmin(ctx: Context) {
    const nameCate = ctx.query.nameCate;
    const data = await this.cateService.getByNameAdmin(nameCate);
    return successResponse(data, ctx);
  }

  // ********************* brand ********************* //
  async insertBrand(ctx: Context) {
    const form = ctx.body as ICreateBrandForm;
    const data = await this.brandService.create(form);
    return successResponse(data, ctx);
  }
  async updateBrand(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateCateForm;
    const data = await this.brandService.update(id, form);
    return successResponse(data, ctx);
  }
  async deleteBrand(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.brandService.delete(id);
    return successResponse(data, ctx);
  }
  async restoreBrand(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.brandService.restore(id);
    return successResponse(data, ctx);
  }
  async getAllBrandActive(ctx: Context) {
    const data = await this.brandService.getAllBrandActive();
    return successResponse(data, ctx);
  }
  async getAllBrandInactive(ctx: Context) {
    const data = await this.brandService.getAllBrandInactive();
    return successResponse(data, ctx);
  }
  async getAllBrand(ctx: Context) {
    const data = await this.brandService.getAllBrand();
    return successResponse(data, ctx);
  }
  async getBrandByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.brandService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  async getBrandByNameAdmin(ctx: Context) {
    const nameBrand = ctx.query.nameBrand;
    const data = await this.brandService.getByNameAdmin(nameBrand);
    return successResponse(data, ctx);
  }
  // ********************* size type ********************* //
  async insertSizeType(ctx: Context) {
    const form = ctx.body as ICreateSizeTypeForm;
    const data = await this.sizeTypeService.create(form);
    return successResponse(data, ctx);
  }
  async updateSizeType(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateCateForm;
    const data = await this.sizeTypeService.update(id, form);
    return successResponse(data, ctx);
  }
  async deleteSizeType(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeTypeService.delete(id);
    return successResponse(data, ctx);
  }
  async restoreSizeType(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeTypeService.restore(id);
    return successResponse(data, ctx);
  }
  async getAllSizeTypeActive(ctx: Context) {
    const data = await this.sizeTypeService.getAllActive();
    return successResponse(data, ctx);
  }
  async getAllSizeTypeInactive(ctx: Context) {
    const data = await this.sizeTypeService.getAllInactive();
    return successResponse(data, ctx);
  }
  async getAllSizeType(ctx: Context) {
    const data = await this.sizeTypeService.getAll();
    return successResponse(data, ctx);
  }
  async getSizeTypeByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeTypeService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  async getSizeTypeByNameAdmin(ctx: Context) {
    const nameSizeType = ctx.query.nameSizeType;
    const data = await this.sizeTypeService.getByNameAdmin(nameSizeType);
    return successResponse(data, ctx);
  }
  // ********************* color ********************* //
  async insertColor(ctx: Context) {
    const form = ctx.body as ICreateColorForm;
    const data = await this.colorService.create(form);
    return successResponse(data, ctx);
  }
  async updateColor(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateColorForm;
    const data = await this.colorService.update(id, form);
    return successResponse(data, ctx);
  }
  async deleteColor(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.colorService.delete(id);
    return successResponse(data, ctx);
  }
  async restoreColor(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.colorService.restore(id);
    return successResponse(data, ctx);
  }
  async getAllColorActive(ctx: Context) {
    const data = await this.colorService.getAllActive();
    return successResponse(data, ctx);
  }
  async getAllColorInactive(ctx: Context) {
    const data = await this.colorService.getAllInactive();
  }
  async getAllColor(ctx: Context) {
    const data = await this.colorService.getAll();
    return successResponse(data, ctx);
  }
  async getColorByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.colorService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  async getColorByNameAdmin(ctx: Context) {
    const nameColor = ctx.query.nameColor;
    const data = await this.colorService.getByNameAdmin(nameColor);
    return successResponse(data, ctx);
  }
  // ********************* size ********************* //
  async insertSize(ctx: Context) {
    const form = ctx.body as ICreateSizeForm;
    const data = await this.sizeServuce.create(form);
    return successResponse(data, ctx);
  }
  async updateSize(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateSizeForm;
    const data = await this.sizeServuce.update(id, form);
    return successResponse(data, ctx);
  }
  async deleteSize(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeServuce.delete(id);
    return successResponse(data, ctx);
  }
  async restoreSize(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeServuce.restore(id);
    return successResponse(data, ctx);
  }
  async getAllSizeActive(ctx: Context) {
    const data = await this.sizeServuce.getAllActive();
    return successResponse(data, ctx);
  }
  async getAllSizeInactive(ctx: Context) {
    const data = await this.sizeServuce.getAllInactive();
    return successResponse(data, ctx);
  }
  async getAllSize(ctx: Context) {
    const data = await this.sizeServuce.getAll();
    return successResponse(data, ctx);
  }
  async getSizeByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.sizeServuce.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  async getSizeByNameAdmin(ctx: Context) {
    const nameSize = ctx.query.nameSize;
    const data = await this.sizeServuce.getByNameAdmin(nameSize);
    return successResponse(data, ctx);
  }
  async getSizeBySizeTypeIdAdmin(ctx: Context) {
    const sizeTypeId = ctx.query.sizeTypeId;
    const data = await this.sizeServuce.getSizeBySizeTypeIdAdmin(sizeTypeId);
    return successResponse(data, ctx);
  }
  async getSizeBySizeTypeNameAdmin(ctx: Context) {
    const nameSizeType = ctx.query.nameSizeType;
    const data =
      await this.sizeServuce.getSizeBySizeTypeNameAdmin(nameSizeType);
    return successResponse(data, ctx);
  }
  // ********************* product ********************* //
  async insertProduct(ctx: Context) {
    const form = ctx.body as ICreateProductForm;
    const data = await this.productService.create(form);
    return successResponse(data, ctx);
  }
  async updateProduct(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdateProductForm;
    const data = await this.productService.update(id, form);
    return successResponse(data, ctx);
  }
  async deleteProduct(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productService.delete(id);
    return successResponse(data, ctx);
  }
  async restoreProduct(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productService.restore(id);
    return successResponse(data, ctx);
  }
  async getAllProductActive(ctx: Context) {
    const data = await this.productService.getAllProductActive();
    return successResponse(data, ctx);
  }
  async getAllProductInactive(ctx: Context) {
    const data = await this.productService.getAllProductInactive();
    return successResponse(data, ctx);
  }
  async getAllProduct(ctx: Context) {
    const data = await this.productService.getAllProduct();
    return successResponse(data, ctx);
  }
  async getProductByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.productService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  async getProductByNameAdmin(ctx: Context) {
    const nameProduct = ctx.query.nameProduct;
    const data = await this.productService.getByNameAdmin(nameProduct);
    return successResponse(data, ctx);
  }
  // ********************* promotion ********************* //
  async insertPromotion(ctx: Context) {
    const form = ctx.body as ICreatePromotionForm;
    const data = await this.promotionService.create(form);
    return successResponse(data, ctx);
  }
  async updatePromotion(ctx: Context) {
    const id = ctx.query.id;
    const form = ctx.body as IUpdatePromotionForm;
    const data = await this.promotionService.update(id, form);
    return successResponse(data, ctx);
  }
  async deletePromotion(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.promotionService.delete(id);
    return successResponse(data, ctx);
  }
  async restorePromotion(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.promotionService.restore(id);
    return successResponse(data, ctx);
  }
  async getAllPromotionActive(ctx: Context) {
    const data = await this.promotionService.getAllPromotionActive();
    return successResponse(data, ctx);
  }
  async getAllPromotionInactive(ctx: Context) {
    const data = await this.promotionService.getAllPromotionInactive();
    return successResponse(data, ctx);
  }
  async getAllPromotion(ctx: Context) {
    const data = await this.promotionService.getAllPromotion();
    return successResponse(data, ctx);
  }
  async getPromotionByIdAdmin(ctx: Context) {
    const id = ctx.query.id;
    const data = await this.promotionService.getByIdAdmin(id);
    return successResponse(data, ctx);
  }
  async getPromotionByNameAdmin(ctx: Context) {
    const codePromotion = ctx.query.codePromotion;
    const data = await this.promotionService.getByNameAdmin(codePromotion);
    return successResponse(data, ctx);
  }
  getRoutes(mdlFactory: MdlFactory) {
    const module = new Elysia({ prefix: "/admin" })
      .post("/signup", this.signupAdmin.bind(this))

      .derive(mdlFactory.auth)
      .post("/signup-manager", this.signupManager.bind(this))
      .get("/renew", this.renewTokenAdmin.bind(this));
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
