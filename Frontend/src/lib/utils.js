import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Hàm này giúp kết hợp các class Tailwind và xử lý các xung đột
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
