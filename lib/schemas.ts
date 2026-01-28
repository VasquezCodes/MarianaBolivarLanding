import { z } from "zod";

export const applicationSchema = z.object({
    // --- Paso 1: Información Personal y Crediticia ---
    creditScore: z.object({
        transunion: z.string().min(1, "Requerido"),
        experian: z.string().min(1, "Requerido"),
        equifax: z.string().min(1, "Requerido"),
    }),

    personalInfo: z.object({
        email: z.string().email("Email inválido"),
        language: z.enum(["Si", "No", "Me comunico un Poco"]),
        fullName: z.string().min(2, "Nombre requerido"),
        phone: z.string().min(10, "Teléfono requerido"),
        address: z.object({
            street: z.string().min(1, "Calle requerida"),
            city: z.string().min(1, "Ciudad requerida"),
            state: z.string().min(1, "Estado requerido"),
            country: z.string().min(1, "País requerido"),
            postalCode: z.string().min(1, "Código postal requerido"),
        }),
        dob: z.string().min(1, "Fecha de nacimiento requerida"), // YYYY-MM-DD
        ssn: z.string().min(1, "SSN requerido"),
        annualIncome: z.string().min(1, "Ingreso requerido"),
        bankRelationships: z.string().min(1, "Relaciones bancarias requeridas"),
        creditCards: z.string().min(1, "Información de tarjetas requerida"),
        monitoringLogin: z.object({
            site: z.string().min(1, "Sitio requerido"),
            username: z.string().min(1, "Usuario requerido"),
            password: z.string().min(1, "Contraseña requerida"),
        }),
    }),

    // --- Paso 2: Negocio Principal ---
    businessLiquidityLevel: z.enum(["Menos de $5000", "$5000 - $10000", "$10000 - $30000"]),

    business1: z.object({
        type: z.enum(["LLC", "Corp"]),
        ein: z.string().min(1, "EIN requerido"),
        name: z.string().min(1, "Nombre de negocio requerido"),
        website: z.string().optional(), // Puede no tener
        email: z.string().email("Email de negocio inválido"),
        phone: z.string().min(1, "Teléfono de negocio requerido"),
        formationDate: z.string().min(1, "Fecha de formación requerida"),
        physicalAddress: z.string().min(1, "Dirección física requerida"),
        mailingAddress: z.string().min(1, "Dirección de correspondencia requerida"),
        industry: z.string().min(1, "Industria requerida"),
        ownershipPercentage: z.string().min(1, "Porcentaje requerido"),
        annualRevenue: z.string().min(1, "Ingreso anual requerido"),
        bankRelationships: z.string().min(1, "Relaciones bancarias requeridas"),
        existingCredit: z.string().optional(),
    }),

    // --- Paso 3: Negocio Secundario (Opcional) ---
    hasSecondBusiness: z.boolean().default(false),
    business2: z.object({
        ein: z.string().optional(),
        name: z.string().optional(),
        email: z.string().optional(),
        phone: z.string().optional(),
        formationDate: z.string().optional(),
        physicalAddress: z.string().optional(),
        mailingAddress: z.string().optional(),
        industry: z.string().optional(),
        bankRelationships: z.string().optional(),
        existingCredit: z.string().optional(),
    }).optional(),

    // --- Paso 4: Financiamiento y Documentos ---
    fundingGoal: z.string().min(1, "Monto requerido"),
    fundingPreferences: z.array(z.string()).min(1, "Seleccione al menos una preferencia"),
    fundingPurpose: z.string().min(10, "Por favor detalle el propósito"),

    // Checklist de Negativos (CheckBoxes: Si marcó = tiene el negativo)
    negativeItems: z.array(z.string()).optional(), // "Bancarrotas", "Pagos atrasados", etc.

    // Archivos (URLs returned from Vercel Blob)
    files: z.array(z.object({
        name: z.string(),
        url: z.string()
    })).optional(),
});

export type ApplicationFormData = z.infer<typeof applicationSchema>;
