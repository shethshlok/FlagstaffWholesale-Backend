import { Column, Entity } from "typeorm"
import {
  // alias the core entity to not cause a naming conflict
  Customer as MedusaCustomer,
} from "@medusajs/medusa"

@Entity()
export class Customer extends MedusaCustomer {
  @Column()
  licenseNumber: string;

  @Column({ default: false }) // Example: Setting default value to true
  activated: boolean;
}