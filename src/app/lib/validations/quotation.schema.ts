import { z } from "zod";

const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

export const quotationItemSchema = z.object({
  id: z.string().min(1, "Item id is required"),
  title: z
    .string()
    .trim()
    .min(1, "Service name is required"),
  description: z
    .string()
    .trim()
    .min(1, "Service description is required"),
  rate: z
    .number()
    .min(0, "Amount cannot be negative").gt(0,"Please enter amount")
});

export const quotationSchema = z
  .object({
    companyType: z.enum(["rankkit-media", "rankkit-studio", "both"]),
    salesPersonName: z.enum(["rhea", "babita"]),

    companyName: z.string().trim().min(1, "Company name is required"),
    companyAddress: z.string().trim().min(1, "Company address is required"),
    companyPhone: z.string().trim().min(1, "Company phone is required"),
    companyEmail: z
      .string()
      .trim()
      .email("Company email must be valid"),

    clientName: z.string().trim().min(1, "Client name is required"),
    clientAddress: z.string().trim().optional(),
    clientPhone: z
      .string()
      .trim()
      .optional(),
    clientEmail: z
      .string()
      .trim()
      .optional(),

    quotationNumber: z.string().optional(),
    quotationDate: z
      .string()
      .regex(dateRegex, "Please select Quotation date."),
    validTill: z
      .string()
      .regex(dateRegex, "Please select Valid till date."),

    items: z
      .array(quotationItemSchema)
      .min(1, "At least one service is required"),


  })
  .refine(
    (data) => new Date(data.validTill) >= new Date(data.quotationDate),
    {
      message: "Valid till date cannot be before quotation date",
      path: ["validTill"],
    }
  );

export type QuotationFormValues = z.infer<typeof quotationSchema>;