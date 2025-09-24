import { z } from "zod";

const todayStart = () => {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
};

const fileListValidator = (
  files: File[] | FileList | null | undefined,
  allowEmpty = true
): boolean => {
  if (!files) return allowEmpty;

  const arr = Array.isArray(files) ? files : Array.from(files);

  if (arr.length === 0) return allowEmpty;
  if (arr.length > 3) return false;
  for (let i = 0; i < arr.length; i++) {
    if (!arr[i].type.startsWith("image/")) return false;
  }
  return true;
};

const customPeakSchema = z
  .object({
    start_date: z.string().min(1, "Tanggal mulai wajib diisi"),
    end_date: z.string().min(1, "Tanggal akhir wajib diisi"),
    type: z.enum(["nominal", "percentage"]).default("nominal"),
    value: z.coerce.number().nonnegative("Nilai tidak boleh negatif"),
  })
  .superRefine((obj, ctx) => {
    const s = new Date(obj.start_date);
    const e = new Date(obj.end_date);

    if (isNaN(s.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Start date tidak valid",
        path: ["start_date"],
      });
    }
    if (isNaN(e.getTime())) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "End date tidak valid",
        path: ["end_date"],
      });
    }

    if (!isNaN(s.getTime()) && !isNaN(e.getTime())) {
      const startDay = new Date(s.setHours(0, 0, 0, 0));
      const endDay = new Date(e.setHours(0, 0, 0, 0));

      if (startDay > endDay) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Start date harus sebelum atau sama dengan end date",
          path: ["end_date"],
        });
      }

      if (startDay < todayStart()) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Start date tidak boleh di masa lalu",
          path: ["start_date"],
        });
      }

      if (obj.type === "percentage" && obj.value > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Persentase tidak boleh lebih dari 100",
          path: ["value"],
        });
      }
    }
  });

export const createRoomSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),

  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(255, "Description must be at most 255 characters"),

  base_price: z.coerce
    .number()
    .int("Base price must be an integer")
    .nonnegative("Base price must be non-negative"),

  capacity: z.coerce
    .number()
    .int("Capacity must be an integer")
    .nonnegative("Capacity must be non-negative"),

  total_rooms: z.coerce
    .number()
    .int("Total rooms must be an integer")
    .nonnegative("Total rooms must be non-negative"),

  custom_peaks: z.array(customPeakSchema).optional().default([]),

  images: z
    .any()
    .refine((v) => fileListValidator(v as FileList | null | undefined, false), {
      message: "Minimal 1 gambar, maksimal 3 file",
    }),

  existingImages: z.array(z.string().url()).optional().default([]),
});

export const editRoomSchema = z.object({
  id: z.string(),
  property_id: z.string(),
  name: z.string().min(1, "Room name is required"),
  description: z.string().min(1, "Description is required"),
  base_price: z.number().nonnegative(),
  capacity: z.number().nonnegative(),
  total_rooms: z.number().nonnegative(),
  image: z.array(z.instanceof(File)),
  oldImages: z.array(z.string()).optional(),
  weekend_peak: z
    .object({
      type: z.enum(["percentage", "nominal"]),
      value: z.number().nonnegative(),
    })
    .optional(),
  custom_peaks: z
    .array(
      z.object({
        start_date: z.string(),
        end_date: z.string(),
        type: z.enum(["percentage", "nominal"]),
        value: z.number().nonnegative(),
      })
    )
    .optional(),
});

export type CreateRoomFormValues = z.infer<typeof createRoomSchema>;
export type EditRoomFormValues = z.infer<typeof editRoomSchema>;
