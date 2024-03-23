import { registerOverriddenValidators } from "@medusajs/medusa";
import {
   AdminPostCustomersCustomerReq as MedusaAdminPostCustomersCustomerReq,
} from "@medusajs/medusa/dist/api/routes/admin/customers/update-customer";
import { IsString } from "class-validator";

class AdminPostCustomersCustomerReq extends MedusaAdminPostCustomersCustomerReq {
   @IsString()
   licenseNumber: string;
}

registerOverriddenValidators(AdminPostCustomersCustomerReq);
