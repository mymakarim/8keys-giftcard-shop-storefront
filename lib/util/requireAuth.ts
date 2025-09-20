import { retrieveCustomerServer } from "../data/customer-actions";
import { redirect } from "next/navigation";

export async function requireAuth(redirectTo: string = "/auth") {
  const customer = await retrieveCustomerServer().catch(() => null);
  if (!customer) {
    redirect(redirectTo);
  }
  return customer;
} 