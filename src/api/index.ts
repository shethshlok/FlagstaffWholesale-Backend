import { registerOverriddenValidators } from "@medusajs/medusa";
import {
   AdminPostCustomersCustomerReq as MedusaAdminPostCustomersCustomerReq,
} from "@medusajs/medusa/dist/api/routes/admin/customers/update-customer";
import {
   StorePostCustomersReq as MedusaStorePostCustomersReq,
  } from "@medusajs/medusa/dist/api/routes/store/customers/create-customer";
import { IsString } from "class-validator";

class AdminPostCustomersCustomerReq extends MedusaAdminPostCustomersCustomerReq {
   @IsString()
   licenseNumber: string;
}

class StorePostCustomersReq extends MedusaStorePostCustomersReq {
   @IsString()
   licenseNumber: string;
}

registerOverriddenValidators(AdminPostCustomersCustomerReq);
registerOverriddenValidators(StorePostCustomersReq);
