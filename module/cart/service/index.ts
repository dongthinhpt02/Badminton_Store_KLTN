import appConfig from "../../../src/shared/common/config";
import { successResponse } from "../../../src/shared/utils/response";
import {
  ICartItemRepository,
  ICartItemService,
} from "../../cartitem/interface";
import { Status } from "../../cartitem/model";
import { IStoreRepository } from "../../store/interface";
import { IUserRepository } from "../../user/interface";
import { ICartRepository, ICartService } from "../interface";
import { Cart, CartWithItems } from "../model";

export class CartService implements ICartService {
  constructor(
    private readonly cartRepo: ICartRepository,
    private readonly storeRepo: IStoreRepository,
    private readonly cartItemRepo: ICartItemRepository,
    private readonly userRepo: IUserRepository,
  ) {}
  async getCartById(id: string): Promise<CartWithItems | null> {
    return await this.cartRepo.findById(id);
  }
  async getCartByUserId(userId: string): Promise<CartWithItems | null> {
    return await this.cartRepo.findByUserId(userId);
  }
  async updateCartTotals(cartId: string): Promise<Cart | null> {
    return await this.cartRepo.updateCartTotals(cartId);
  }
  //   async calculateTotalFee(userId: string): Promise<any> {
  //     const store = await this.storeRepo.findActiveByAdmin();

  //     if (!store) {
  //       throw new Error("Store active not found");
  //     }
  //     // console.log("Store active:", store);

  //     const cart = await this.cartRepo.findByUserId(userId);

  //     if (!cart) {
  //       throw new Error("Cart not found");
  //     }
  //     // console.log("Cart of user:", cart);

  //     const user = await this.userRepo.findById(userId);

  //     if (!user) {
  //       throw new Error("User not found");
  //     }

  //     // console.log("User:", user);

  //     const calculateItems = await this.cartRepo.calculateAllItems(userId);

  //     // console.log("Calculate items:", calculateItems);

  //     const body = {
  //       from_district_id: Number(store.from_district),
  //       from_ward_code: String(store.from_ward),

  //       to_district_id: Number(user.to_district),
  //       to_ward_code: String(user.to_ward),

  //       service_id: Number(appConfig.GHN.serviceId),

  //       // ❌ bỏ service_type_id đi thử
  //       // service_type_id: 2,

  //       height: Number(calculateItems.height),
  //       length: Number(calculateItems.length),
  //       weight: Number(calculateItems.weight),
  //       width: Number(calculateItems.width),

  //       insurance_value: Number(calculateItems.insurance_value) || 0,

  //       coupon: "",

  //       items: calculateItems.items,
  //     };

  //     // console.log("Request body for GHN API:", body);

  //     const baseURL =
  //       "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee";

  //     // const response = await fetch(baseURL, {
  //     //   method: "POST",
  //     //   headers: {
  //     //     "Content-Type": "application/json",
  //     //     Token: appConfig.GHN.token || "",
  //     //     ShopId: appConfig.GHN.shopId || "",
  //     //   },
  //     //   body: JSON.stringify({
  //     //     from_district_id: Number(store.from_district),
  //     //     from_ward_code: store.from_ward as string,
  //     //     to_district_id: Number(user.to_district),
  //     //     to_ward_code: user.to_ward as string,
  //     //     service_id: Number(appConfig.GHN.serviceId),
  //     //     service_type_id: null,
  //     //     height: Number(calculateItems.height),
  //     //     length: Number(calculateItems.length),
  //     //     weight: Number(calculateItems.weight),
  //     //     width: Number(calculateItems.width),
  //     //     insurance_value: Number(calculateItems.insurance_value) || 0,
  //     //     coupon: "",
  //     //     items: calculateItems.items,
  //     //   }),
  //     // });

  //     const response = await fetch(baseURL, {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Token: appConfig.GHN.token || "",
  //         ShopId: String(appConfig.GHN.shopId || ""),
  //       },
  //       body: JSON.stringify(body),
  //     });
  //     const text = await response.text();

  //     // console.log(appConfig.GHN.token);

  //     // console.log(appConfig.GHN.shopId);

  //     // console.log(appConfig.GHN.serviceId);

  //     // console.log(text);

  //     let resData;

  //     try {
  //       resData = JSON.parse(text);
  //     } catch (err) {
  //       // console.log("GHN RAW RESPONSE:", text);
  //       throw new Error("GHN response is not valid JSON");
  //     }

  //     const shippingFee = resData.data.total;

  //     const totalCartOrder = cart.totalPrice + shippingFee;

  //     return {
  //       totalCart: cart.totalPrice,
  //       shippingFee,
  //       totalCartOrder,
  //     };
  //   }
  async calculateTotalFee(userId: string): Promise<any> {
    // =========================
    // STORE ACTIVE
    // =========================
    const store = await this.storeRepo.findActiveByAdmin();

    if (!store) {
      throw new Error("Store active not found");
    }

    // console.log("Store active:", store);

    // =========================
    // CART
    // =========================
    const cart = await this.cartRepo.findByUserId(userId);

    if (!cart) {
      throw new Error("Cart not found");
    }

    // console.log("Cart of user:", cart);

    // =========================
    // USER
    // =========================
    const user = await this.userRepo.findById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    const tickItems = cart.items.filter((item) => item.status === Status.TICK);

    if (tickItems.length === 0) {
      return {
        totalCart: 0,
        shippingFee: 0,
        totalCartOrder: 0,
      };
    }
    // =========================
    // CALCULATE ITEMS
    // =========================
    const calculateItems = await this.cartRepo.calculateAllItems(userId);

    // console.log("Calculate items:", calculateItems);

    // =========================
    // GET AVAILABLE SERVICES
    // =========================
    const serviceResponse = await fetch(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/available-services",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Token: appConfig.GHN.token || "",
        },
        body: JSON.stringify({
          shop_id: Number(appConfig.GHN.shopId),

          from_district: Number(store.from_district),

          to_district: Number(user.to_district),
        }),
      },
    );

    const serviceText = await serviceResponse.text();

    // console.log("AVAILABLE SERVICES RAW:", serviceText);

    let serviceData;

    try {
      serviceData = JSON.parse(serviceText);
    } catch (err) {
      // console.log("SERVICE RAW ERROR:", serviceText);

      throw new Error("GHN available-services response invalid");
    }

    // =========================
    // CHECK SERVICES
    // =========================
    if (
      !serviceData.data ||
      !Array.isArray(serviceData.data) ||
      serviceData.data.length === 0
    ) {
      // console.log("SERVICE ERROR:", serviceData);

      throw new Error(
        serviceData.message || "Không tìm thấy dịch vụ vận chuyển",
      );
    }

    // console.log("AVAILABLE SERVICES:", serviceData.data);

    // lấy service đầu tiên
    const serviceId = serviceData.data[0].service_id;

    // console.log("SERVICE ID:", serviceId);

    // =========================
    // REQUEST BODY
    // =========================
    const body = {
      from_district_id: Number(store.from_district),

      from_ward_code: String(store.from_ward),

      to_district_id: Number(user.to_district),

      to_ward_code: String(user.to_ward),

      service_id: Number(serviceId),

      height: Number(calculateItems.height),

      length: Number(calculateItems.length),

      weight: Number(calculateItems.weight),

      width: Number(calculateItems.width),

      insurance_value: Number(calculateItems.insurance_value) || 0,

      coupon: "",

      items: calculateItems.items,
    };

    // console.log("REQUEST BODY GHN:", body);

    // =========================
    // CALCULATE FEE
    // =========================
    const feeResponse = await fetch(
      "https://dev-online-gateway.ghn.vn/shiip/public-api/v2/shipping-order/fee",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",

          Token: appConfig.GHN.token || "",

          ShopId: String(appConfig.GHN.shopId || ""),
        },
        body: JSON.stringify(body),
      },
    );

    const feeText = await feeResponse.text();

    // console.log("GHN FEE RESPONSE:", feeText);

    let feeData;

    try {
      feeData = JSON.parse(feeText);
    } catch (err) {
      // console.log("FEE RAW ERROR:", feeText);

      throw new Error("GHN fee response invalid");
    }

    // =========================
    // CHECK FEE DATA
    // =========================
    if (!feeData.data) {
      // console.log("GHN FEE ERROR:", feeData);

      throw new Error(feeData.message || "Không tính được phí ship");
    }

    // =========================
    // SHIPPING FEE
    // =========================
    const shippingFee = feeData.data.total;

    const totalCartOrder = cart.totalPrice + shippingFee;

    // =========================
    // RETURN
    // =========================
    return {
      totalCart: cart.totalPrice,

      shippingFee,

      totalCartOrder,
    };
  }
}
