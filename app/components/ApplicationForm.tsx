"use client";

import { useState, useRef } from "react";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { applicationSchema, type ApplicationFormData } from "@/lib/schemas";
import { ArrowLeft, ChevronRight, Upload } from "lucide-react";
import clsx from "clsx";

// --- Constants ---
const COUNTRIES_DATA: Record<string, string[]> = {
    "Estados Unidos": ["AL", "AK", "AZ", "AR", "CA", "CO", "CT", "DE", "FL", "GA", "HI", "ID", "IL", "IN", "IA", "KS", "KY", "LA", "ME", "MD", "MA", "MI", "MN", "MS", "MO", "MT", "NE", "NV", "NH", "NJ", "NM", "NY", "NC", "ND", "OH", "OK", "OR", "PA", "RI", "SC", "SD", "TN", "TX", "UT", "VT", "VA", "WA", "WV", "WI", "WY"],
    "Argentina": ["Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba", "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa", "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro", "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe", "Santiago del Estero", "Tierra del Fuego", "Tucumán", "CABA"],
    "México": ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Ciudad de México", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "México", "Michoacán", "Morelos", "Nayarit", "Nuevo León", "Oaxaca", "Puebla", "Querétaro", "Quintana Roo", "San Luis Potosí", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán", "Zacatecas"],
    "Colombia": ["Amazonas", "Antioquia", "Arauca", "Atlántico", "Bolívar", "Boyacá", "Caldas", "Caquetá", "Casanare", "Cauca", "Cesar", "Chocó", "Córdoba", "Cundinamarca", "Bogotá D.C.", "Guainía", "Guaviare", "Huila", "La Guajira", "Magdalena", "Meta", "Nariño", "Norte de Santander", "Putumayo", "Quindío", "Risaralda", "San Andrés y Providencia", "Santander", "Sucre", "Tolima", "Valle del Cauca", "Vaupés", "Vichada"],
    "Venezuela": ["Amazonas", "Anzoátegui", "Apure", "Aragua", "Barinas", "Bolívar", "Carabobo", "Cojedes", "Delta Amacuro", "Distrito Capital", "Falcón", "Guárico", "Lara", "Mérida", "Miranda", "Monagas", "Nueva Esparta", "Portuguesa", "Sucre", "Táchira", "Trujillo", "La Guaira", "Yaracuy", "Zulia"],
    "España": ["Álava", "Albacete", "Alicante", "Almería", "Asturias", "Ávila", "Badajoz", "Barcelona", "Burgos", "Cáceres", "Cádiz", "Cantabria", "Castellón", "Ciudad Real", "Córdoba", "Cuenca", "Gerona", "Granada", "Guadalajara", "Guipúzcoa", "Huelva", "Huesca", "Islas Baleares", "Jaén", "La Coruña", "La Rioja", "Las Palmas", "León", "Lérida", "Lugo", "Madrid", "Málaga", "Murcia", "Navarra", "Orense", "Palencia", "Pontevedra", "Salamanca", "Santa Cruz de Tenerife", "Segovia", "Sevilla", "Soria", "Tarragona", "Teruel", "Toledo", "Valencia", "Valladolid", "Vizcaya", "Zamora", "Zaragoza", "Ceuta", "Melilla"],
    "Chile": ["Arica y Parinacota", "Tarapacá", "Antofagasta", "Atacama", "Coquimbo", "Valparaíso", "Metropolitana", "O'Higgins", "Maule", "Ñuble", "Biobío", "La Araucanía", "Los Ríos", "Los Lagos", "Aysén", "Magallanes"],
    "Perú": ["Amazonas", "Áncash", "Apurímac", "Arequipa", "Ayacucho", "Cajamarca", "Callao", "Cusco", "Huancavelica", "Huánuco", "Ica", "Junín", "La Libertad", "Lambayeque", "Lima", "Loreto", "Madre de Dios", "Moquegua", "Pasco", "Piura", "Puno", "San Martín", "Tacna", "Tumbes", "Ucayali"],
    "Ecuador": ["Azuay", "Bolívar", "Cañar", "Carchi", "Chimborazo", "Cotopaxi", "El Oro", "Esmeraldas", "Galápagos", "Guayas", "Imbabura", "Loja", "Los Ríos", "Manabí", "Morona Santiago", "Napo", "Orellana", "Pastaza", "Pichincha", "Santa Elena", "Santo Domingo", "Sucumbíos", "Tungurahua", "Zamora Chinchipe"],
    "República Dominicana": ["Azua", "Baoruco", "Barahona", "Dajabón", "Distrito Nacional", "Duarte", "El Seibo", "Elías Piña", "Espaillat", "Hato Mayor", "Hermanas Mirabal", "Independencia", "La Altagracia", "La Romana", "La Vega", "María Trinidad Sánchez", "Monseñor Nouel", "Monte Cristi", "Monte Plata", "Pedernales", "Peravia", "Puerto Plata", "Samaná", "San Cristóbal", "San José de Ocoa", "San Juan", "San Pedro de Macorís", "Sánchez Ramírez", "Santiago", "Santiago Rodríguez", "Santo Domingo", "Valverde"],
};

const COUNTRIES_LIST = ["Estados Unidos", "Argentina", "Bolivia", "Chile", "Colombia", "Costa Rica", "Cuba", "Ecuador", "El Salvador", "España", "Guatemala", "Honduras", "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "Puerto Rico", "República Dominicana", "Uruguay", "Venezuela", "Otro"];

const STEPS = [
    { id: 1, title: "Perfil Personal", subtitle: "Información Básica" },
    { id: 2, title: "Negocio Principal", subtitle: "Datos de la Empresa" },
    { id: 3, title: "Negocio Secundario", subtitle: "Opcional" },
    { id: 4, title: "Estrategia", subtitle: "Fondeo y Documentos" },
];

export default function ApplicationForm() {
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [direction, setDirection] = useState(0);

    const methods = useForm<ApplicationFormData>({
        // @ts-ignore
        resolver: zodResolver(applicationSchema),
        mode: "onChange",
        defaultValues: {
            hasSecondBusiness: false,
            fundingPreferences: [],
            negativeItems: [],
            files: [],
        },
    });

    const {
        watch,
        trigger,
        handleSubmit,
        formState: { isValid },
    } = methods;

    const hasSecondBusiness = watch("hasSecondBusiness");

    const nextStep = async () => {
        let fieldsToValidate: any[] = [];
        if (currentStep === 1) fieldsToValidate = ["personalInfo", "creditScore"];
        else if (currentStep === 2) fieldsToValidate = ["businessLiquidityLevel", "business1"];
        else if (currentStep === 3) {
            if (hasSecondBusiness) fieldsToValidate = ["business2"];
        }

        const isStepValid = await trigger(fieldsToValidate as any);
        if (isStepValid) {
            setDirection(1);
            if (currentStep === 2 && !hasSecondBusiness) {
                setCurrentStep(4);
            } else {
                setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
            }
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    const prevStep = () => {
        setDirection(-1);
        if (currentStep === 4 && !hasSecondBusiness) {
            setCurrentStep(2);
        } else {
            setCurrentStep((prev) => Math.max(prev - 1, 1));
        }
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    const onSubmit = async (data: ApplicationFormData) => {
        setIsSubmitting(true);
        try {
            const response = await fetch("/api/send-application", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error();
            setSubmitSuccess(true);
            window.scrollTo({ top: 0, behavior: "smooth" });
        } catch (error) {
            console.error(error);
            alert("Error al enviar. Intenta de nuevo.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (submitSuccess) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="flex min-h-[60vh] w-full flex-col items-center justify-center text-center px-6"
            >
                <span className="text-vinotinto text-6xl mb-6">✦</span>
                <h2 className="mb-6 font-serif text-5xl md:text-6xl font-bold text-black tracking-tight">Solicitud Recibida</h2>
                <div className="h-px w-24 bg-vinotinto mb-8" />
                <p className="max-w-md text-lg text-neutral-800 font-medium leading-relaxed">
                    Tu perfil está en manos de nuestro equipo de análisis. <br />
                    Te contactaremos pronto.
                </p>
                <button
                    onClick={() => window.location.href = "/"}
                    className="mt-12 text-sm font-bold tracking-[0.2em] border-b-2 border-black pb-1 hover:text-vinotinto hover:border-vinotinto transition-all uppercase"
                >
                    Volver al Inicio
                </button>
            </motion.div>
        );
    }

    const variants = {
        enter: (direction: number) => ({ x: direction > 0 ? 50 : -50, opacity: 0 }),
        center: { zIndex: 1, x: 0, opacity: 1 },
        exit: (direction: number) => ({ zIndex: 0, x: direction < 0 ? 50 : -50, opacity: 0 }),
    };

    return (
        <div className="w-full max-w-5xl mx-auto flex flex-col md:flex-row gap-12 lg:gap-24 items-start">

            {/* Editorial Sidebar / Progress */}
            <div className="w-full md:w-64 sticky top-32 hidden md:block">
                <div className="mb-12">
                    <span className="font-serif text-5xl text-black font-bold">0{currentStep}</span>
                    <span className="text-neutral-500 text-2xl font-serif">/04</span>
                </div>

                <div className="space-y-6 border-l-2 border-neutral-200 pl-6 relative">
                    <motion.div
                        className="absolute left-[-2px] top-0 w-[2px] bg-vinotinto h-16"
                        animate={{ top: (currentStep - 1) * 88 }}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />

                    {STEPS.map((step) => (
                        <div key={step.id} className={clsx("transition-all duration-300 h-16 flex flex-col justify-center", currentStep === step.id ? "opacity-100" : "opacity-40")}>
                            <p className="text-xs font-bold tracking-widest uppercase mb-2 text-neutral-800">{step.subtitle}</p>
                            <p className={clsx("font-serif text-lg leading-tight", currentStep === step.id ? "text-vinotinto font-bold" : "text-black")}>{step.title}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Form Area */}
            <div className="w-full flex-1">
                <div className="md:hidden flex justify-between items-end mb-8 border-b-2 border-neutral-200 pb-4">
                    <div>
                        <p className="text-xs font-bold tracking-widest text-neutral-500 uppercase">Paso {currentStep}</p>
                        <h2 className="font-serif text-2xl text-black font-bold">{STEPS[currentStep - 1].title}</h2>
                    </div>
                    <span className="font-mono text-sm text-neutral-500 font-bold">{currentStep}/4</span>
                </div>

                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit as any)} className="space-y-12">
                        <AnimatePresence mode="wait" custom={direction} initial={false}>
                            <motion.div
                                key={currentStep}
                                custom={direction}
                                variants={variants}
                                initial="enter"
                                animate="center"
                                exit="exit"
                                transition={{ duration: 0.4, ease: "circOut" }}
                            >
                                {currentStep === 1 && <Step1_Personal />}
                                {currentStep === 2 && <Step2_Business1 />}
                                {currentStep === 3 && <Step3_Business2 />}
                                {currentStep === 4 && <Step4_Funding isUploading={isUploading} setIsUploading={setIsUploading} />}
                            </motion.div>
                        </AnimatePresence>

                        <div className="flex items-center justify-between pt-12 border-t border-neutral-200 mt-12">
                            <button
                                type="button"
                                onClick={prevStep}
                                disabled={currentStep === 1}
                                className={clsx(
                                    "group flex items-center gap-2 text-sm font-bold tracking-widest transition-colors uppercase",
                                    currentStep === 1 ? "opacity-0 cursor-default" : "text-neutral-700 hover:text-black"
                                )}
                            >
                                <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" /> Anterior
                            </button>

                            {currentStep === 4 ? (
                                <button
                                    type="submit"
                                    disabled={isSubmitting || isUploading}
                                    className="bg-black text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase hover:bg-vinotinto transition-colors shadow-2xl disabled:opacity-50"
                                >
                                    {isSubmitting ? "Enviando..." : isUploading ? "Subiendo..." : "Finalizar Aplicación"}
                                </button>
                            ) : (
                                <button
                                    type="button"
                                    onClick={nextStep}
                                    className="bg-black text-white px-10 py-4 text-xs font-bold tracking-[0.2em] uppercase group hover:bg-vinotinto transition-colors flex items-center gap-3 shadow-2xl"
                                >
                                    Siguiente <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                </button>
                            )}
                        </div>
                    </form>
                </FormProvider>
            </div>
        </div>
    );
}

// --- High Contrast Components ---

function MinimalSelect({ label, register, name, error, options, placeholder = "Seleccionar", half = false }: any) {
    return (
        <div className={clsx("flex flex-col gap-3 group relative", half ? "col-span-1" : "col-span-1 md:col-span-full")}>
            <label className={clsx("text-xs font-bold uppercase tracking-[0.15em] transition-colors", error ? "text-red-600" : "text-neutral-700 group-focus-within:text-vinotinto")}>
                {label}
            </label>
            <div className="relative">
                <select
                    {...register(name)}
                    className={clsx(
                        "w-full bg-transparent border-b-2 border-neutral-300 py-3 text-lg font-medium text-black transition-all appearance-none rounded-none cursor-pointer focus:border-vinotinto focus:outline-none placeholder:text-neutral-500",
                        error && "border-red-400"
                    )}
                >
                    <option value="" disabled hidden>{placeholder}</option>
                    {options.map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                    ))}
                </select>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-black">
                    <ChevronRight className="rotate-90 w-4 h-4" />
                </div>
            </div>
            {error && <span className="absolute -bottom-6 left-0 text-[11px] font-bold text-red-600">{error.message}</span>}
        </div>
    );
}

function MinimalInput({ label, register, name, error, type = "text", placeholder = "", half = false }: any) {
    return (
        <div className={clsx("flex flex-col gap-3 group relative", half ? "col-span-1" : "col-span-1 md:col-span-full")}>
            <label className={clsx("text-xs font-bold uppercase tracking-[0.15em] transition-colors", error ? "text-red-600" : "text-neutral-700 group-focus-within:text-vinotinto")}>
                {label}
            </label>
            <input
                {...register(name)}
                type={type}
                placeholder={placeholder}
                className={clsx(
                    "w-full bg-transparent border-b-2 border-neutral-300 py-3 text-lg font-medium text-black transition-all placeholder:text-neutral-400 focus:border-vinotinto focus:outline-none rounded-none",
                    error && "border-red-400"
                )}
            />
            {error && <span className="absolute -bottom-6 left-0 text-[11px] font-bold text-red-600">{error.message}</span>}
        </div>
    );
}

function SectionTitle({ title }: { title: string }) {
    return (
        <h3 className="font-serif text-3xl font-bold text-black mb-10 mt-4 relative inline-block">
            {title}
            <span className="block h-1.5 w-16 bg-vinotinto mt-4" />
        </h3>
    );
}

function Step1_Personal() {
    const { register, watch, formState: { errors } } = useFormContext<ApplicationFormData>();
    const selectedCountry = watch("personalInfo.address.country");

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionTitle title="Tu Perfil Crediticio" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-8 mb-20">
                <MinimalInput label="Transunion" name="creditScore.transunion" register={register} error={errors.creditScore?.transunion} placeholder="720" half />
                <MinimalInput label="Experian" name="creditScore.experian" register={register} error={errors.creditScore?.experian} placeholder="750" half />
                <MinimalInput label="Equifax" name="creditScore.equifax" register={register} error={errors.creditScore?.equifax} placeholder="700" half />
            </div>

            <SectionTitle title="Datos Personales" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-12">
                <MinimalInput label="Nombre Completo" name="personalInfo.fullName" register={register} error={errors.personalInfo?.fullName} />
                <MinimalInput label="Fecha de Nacimiento" name="personalInfo.dob" type="date" register={register} error={errors.personalInfo?.dob} />
                <MinimalInput label="Email Privado" name="personalInfo.email" type="email" register={register} error={errors.personalInfo?.email} />
                <MinimalInput label="Teléfono Celular" name="personalInfo.phone" type="tel" register={register} error={errors.personalInfo?.phone} />

                <div className="md:col-span-2 space-y-4 mt-2">
                    <label className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-700 block">¿Dominio del Inglés?</label>
                    <div className="flex flex-wrap gap-8">
                        {["Si", "No", "Me comunico un Poco"].map((opt) => (
                            <label key={opt} className="flex items-center gap-3 cursor-pointer group">
                                <div className="relative flex items-center justify-center w-6 h-6 rounded-full border-2 border-neutral-400 group-hover:border-vinotinto transition-colors">
                                    <input type="radio" value={opt} {...register("personalInfo.language")} className="peer appearance-none w-full h-full absolute inset-0 cursor-pointer" />
                                    <div className="w-3 h-3 bg-vinotinto rounded-full opacity-0 peer-checked:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-base font-medium text-black">{opt}</span>
                            </label>
                        ))}
                    </div>
                    {errors.personalInfo?.language && <span className="text-xs font-bold text-red-600">{errors.personalInfo.language.message}</span>}
                </div>

                <div className="md:col-span-2 pt-8">
                    <p className="text-sm font-bold uppercase tracking-[0.15em] text-black mb-8 border-b border-neutral-200 pb-2">Dirección Residencial</p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10">
                        <div className="md:col-span-2">
                            <MinimalSelect label="País de Residencia" name="personalInfo.address.country" register={register} error={errors.personalInfo?.address?.country} options={COUNTRIES_LIST} placeholder="Selecciona un País" />
                        </div>
                        <MinimalInput label="Calle y Número (Address)" name="personalInfo.address.street" register={register} error={errors.personalInfo?.address?.street} />
                        <MinimalInput label="Ciudad" name="personalInfo.address.city" register={register} error={errors.personalInfo?.address?.city} />

                        {selectedCountry && COUNTRIES_DATA[selectedCountry] ? (
                            <MinimalSelect label={selectedCountry === "Estados Unidos" ? "Estado" : "Estado / Provincia / Dpto"} name="personalInfo.address.state" register={register} error={errors.personalInfo?.address?.state} options={COUNTRIES_DATA[selectedCountry]} />
                        ) : (
                            <MinimalInput label="Estado / Provincia" name="personalInfo.address.state" register={register} error={errors.personalInfo?.address?.state} />
                        )}

                        <MinimalInput label="Código Postal" name="personalInfo.address.postalCode" register={register} error={errors.personalInfo?.address?.postalCode} />
                    </div>
                </div>

                <MinimalInput label="SSN (Social Security)" name="personalInfo.ssn" register={register} error={errors.personalInfo?.ssn} />
                <MinimalInput label="Ingreso Personal Anual" name="personalInfo.annualIncome" register={register} error={errors.personalInfo?.annualIncome} placeholder="$100,000" />

                <div className="md:col-span-2 space-y-3 mt-6">
                    <label className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-700">Relaciones Bancarias Personales</label>
                    <textarea
                        {...register("personalInfo.bankRelationships")}
                        className="w-full bg-neutral-100 border-b-2 border-neutral-300 p-5 text-base font-medium text-black focus:outline-none focus:border-vinotinto focus:bg-white transition-all resize-y min-h-[100px] placeholder:text-neutral-500"
                        placeholder="Lista tus bancos actuales (Checking, Savings, Investments)..."
                    />
                </div>
                <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-700">Tarjetas de Crédito Personales</label>
                    <textarea
                        {...register("personalInfo.creditCards")}
                        className="w-full bg-neutral-100 border-b-2 border-neutral-300 p-5 text-base font-medium text-black focus:outline-none focus:border-vinotinto focus:bg-white transition-all resize-y min-h-[100px] placeholder:text-neutral-500"
                        placeholder="Detalla tus tarjetas, límites y % de uso..."
                    />
                </div>
            </div>

            <SectionTitle title="Sitio de Monitoreo" />
            <div className="bg-neutral-100 p-8 rounded-none border-l-4 border-vinotinto">
                <p className="text-sm text-black mb-8 font-bold tracking-wide">Proveedores Aceptados: <span className="font-normal text-neutral-600">IdentityIQ, SmartCredit, MyscoreIQ, MyFreeScoreNow</span></p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <MinimalSelect label="Sitio Web" name="personalInfo.monitoringLogin.site" register={register} error={errors.personalInfo?.monitoringLogin?.site} options={["IdentityIQ", "SmartCredit", "MyscoreIQ", "MyFreeScoreNow"]} placeholder="Selecciona..." half />
                    <MinimalInput label="Usuario" name="personalInfo.monitoringLogin.username" register={register} error={errors.personalInfo?.monitoringLogin?.username} half />
                    <MinimalInput label="Contraseña" name="personalInfo.monitoringLogin.password" register={register} error={errors.personalInfo?.monitoringLogin?.password} type="password" half />
                </div>
            </div>
        </div>
    );
}

function Step2_Business1() {
    const { register, watch, formState: { errors } } = useFormContext<ApplicationFormData>();
    const selectedCountry = watch("business1.physicalAddress") ? "Estados Unidos" : ""; // Assuming US for business for now or could add another selector if needed, sticking to input for flexibility but labels updated.

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionTitle title="Liquidez Empresarial" />
            <div className="mb-12 space-y-6">
                <p className="text-lg font-medium text-black max-w-2xl">¿Cuál sería tu capacidad de depósito inmediata si te lo pidiéramos para una institución bancaria?</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {["Menos de $5000", "$5000 - $10000", "$10000 - $30000"].map((level) => (
                        <label key={level} className="relative cursor-pointer group">
                            <input type="radio" value={level} {...register("businessLiquidityLevel")} className="peer sr-only" />
                            <div className="py-5 px-4 border-2 border-neutral-300 text-center peer-checked:border-vinotinto peer-checked:bg-vinotinto peer-checked:text-white transition-all hover:border-vinotinto">
                                <span className="text-base font-bold text-black peer-checked:text-white">{level}</span>
                            </div>
                        </label>
                    ))}
                </div>
                {errors.businessLiquidityLevel && <span className="text-xs font-bold text-red-600">{errors.businessLiquidityLevel.message}</span>}
            </div>

            <SectionTitle title="Detalles del Negocio Principal" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-12">
                <div className="flex flex-col gap-3 relative">
                    <label className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-700">Estructura Legal</label>
                    <select {...register("business1.type")} className="w-full bg-transparent border-b-2 border-neutral-300 py-3 text-lg font-medium text-black focus:outline-none focus:border-vinotinto appearance-none rounded-none cursor-pointer">
                        <option value="LLC">LLC</option>
                        <option value="Corp">Corp (C-Corp / S-Corp)</option>
                        <option value="Sole Proprietorship">Sole Proprietorship</option>
                    </select>
                    <div className="absolute right-0 bottom-4 pointer-events-none text-black text-xs">▼</div>
                </div>
                <MinimalInput label="EIN Number" name="business1.ein" register={register} error={errors.business1?.ein} />
                <MinimalInput label="Nombre Legal del Negocio" name="business1.name" register={register} error={errors.business1?.name} />
                <MinimalInput label="Sitio Web" name="business1.website" register={register} error={errors.business1?.website} placeholder="www.tuempresa.com" />
                <MinimalInput label="Email Corporativo" name="business1.email" type="email" register={register} error={errors.business1?.email} />
                <MinimalInput label="Teléfono de Contacto" name="business1.phone" register={register} error={errors.business1?.phone} />
                <MinimalInput label="Fecha de Formación" name="business1.formationDate" type="date" register={register} error={errors.business1?.formationDate} />
                <MinimalInput label="Industria" name="business1.industry" register={register} error={errors.business1?.industry} placeholder="Ej: Real Estate, Salud..." />
                <MinimalInput label="% Propiedad" name="business1.ownershipPercentage" register={register} error={errors.business1?.ownershipPercentage} placeholder="100%" />
                <MinimalInput label="Ingreso Anual Bruto" name="business1.annualRevenue" register={register} error={errors.business1?.annualRevenue} />

                <div className="md:col-span-2 pt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    <MinimalInput label="Dirección Física (EIN)" name="business1.physicalAddress" register={register} error={errors.business1?.physicalAddress} />
                    <MinimalInput label="Dirección Correspondencia" name="business1.mailingAddress" register={register} error={errors.business1?.mailingAddress} />
                </div>

                <div className="md:col-span-2 space-y-3 mt-4">
                    <label className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-700">Relaciones Bancarias (Negocio)</label>
                    <textarea
                        {...register("business1.bankRelationships")}
                        className="w-full bg-neutral-100 border-b-2 border-neutral-300 p-5 text-base font-medium text-black focus:outline-none focus:border-vinotinto focus:bg-white transition-all resize-y min-h-[100px] placeholder:text-neutral-500"
                        placeholder="Chase, Bank of America, saldos promedio..."
                    />
                </div>
                <div className="md:col-span-2 space-y-3">
                    <label className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-700">Crédito Comercial Existente</label>
                    <textarea
                        {...register("business1.existingCredit")}
                        className="w-full bg-neutral-100 border-b-2 border-neutral-300 p-5 text-base font-medium text-black focus:outline-none focus:border-vinotinto focus:bg-white transition-all resize-y min-h-[100px] placeholder:text-neutral-500"
                        placeholder="Tarjetas de negocio, préstamos vigentes..."
                    />
                </div>
            </div>

            <div className="mt-12 py-8 border-t-2 border-neutral-200 flex items-center justify-between">
                <span className="text-lg font-bold text-black">¿Tienes una segunda empresa?</span>
                <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" {...register("hasSecondBusiness")} className="sr-only peer" />
                    <div className="w-14 h-8 bg-neutral-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[4px] after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-vinotinto"></div>
                </label>
            </div>
        </div>
    );
}

function Step3_Business2() {
    const { register } = useFormContext<ApplicationFormData>();

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionTitle title="Negocio Secundario (Opcional)" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-12 mb-12">
                <MinimalInput label="Nombre del Negocio" name="business2.name" register={register} />
                <MinimalInput label="EIN Number" name="business2.ein" register={register} />
                <MinimalInput label="Email" name="business2.email" register={register} />
                <MinimalInput label="Teléfono" name="business2.phone" register={register} />
                <MinimalInput label="Industria" name="business2.industry" register={register} />
                <div className="md:col-span-2">
                    <MinimalInput label="Dirección Física" name="business2.physicalAddress" register={register} />
                </div>
            </div>
        </div>
    );
}

function Step4_Funding({ isUploading, setIsUploading }: { isUploading: boolean, setIsUploading: (v: boolean) => void }) {
    const { register, formState: { errors }, setValue, getValues, watch } = useFormContext<ApplicationFormData>();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const preferences = ["Tarjetas 0% Interés", "Línea de Crédito", "Préstamo a Término"];
    const negativeItems = [
        "Cuentas en Cobranza", "Pagos Atrasados", "Manutención Pendiente",
        "Bancarrotas", "Deudas Castigadas (Charge-offs)"
    ];

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <SectionTitle title="Tu Meta de Fondeo" />
            <div className="mb-12">
                <MinimalInput label="¿Cuánto capital necesitas?" name="fundingGoal" placeholder="$250,000" register={register} error={errors.fundingGoal} />
            </div>

            <div className="mb-14 grid grid-cols-1 md:grid-cols-2 gap-16">
                <div>
                    <p className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-700 mb-6">Tipo de Financiamiento Preferido</p>
                    <div className="space-y-5">
                        {preferences.map((pref) => (
                            <label key={pref} className="flex items-center gap-5 cursor-pointer group">
                                <div className="relative flex items-center justify-center w-6 h-6 border-2 border-neutral-400 group-hover:border-vinotinto transition-colors">
                                    <input type="checkbox" value={pref} {...register("fundingPreferences")} className="peer appearance-none w-full h-full absolute inset-0 cursor-pointer" />
                                    <div className="w-3.5 h-3.5 bg-vinotinto opacity-0 peer-checked:opacity-100 transition-opacity" />
                                </div>
                                <span className="text-lg font-medium group-hover:text-black text-neutral-700 transition-colors">{pref}</span>
                            </label>
                        ))}
                    </div>
                    {errors.fundingPreferences && <span className="text-xs text-red-600 mt-2 block font-bold">{errors.fundingPreferences.message}</span>}
                </div>

                <div>
                    <label className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-700 mb-6 block">Declaración de Negativos</label>
                    <div className="bg-neutral-100 p-8 border-l-4 border-neutral-300">
                        <p className="text-sm text-neutral-600 mb-4 font-bold">Selecciona si posees alguno (Sé honesto):</p>
                        <div className="space-y-4">
                            {negativeItems.map((item) => (
                                <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                    <input type="checkbox" value={item} {...register("negativeItems")} className="w-5 h-5 accent-vinotinto" />
                                    <span className="text-sm font-bold text-neutral-700">{item}</span>
                                </label>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mb-16">
                <label className="text-xs font-bold uppercase tracking-[0.15em] text-neutral-700 mb-4 block">Propósito del Capital</label>
                <textarea
                    {...register("fundingPurpose")}
                    className="w-full bg-transparent border-b-2 border-neutral-300 py-6 text-2xl font-serif text-black placeholder:text-neutral-400 focus:border-vinotinto focus:outline-none transition-all min-h-[120px]"
                    placeholder="Describe brevemente en qué invertirás los fondos..."
                />
                {errors.fundingPurpose && <span className="text-xs text-red-600 font-bold">{errors.fundingPurpose.message}</span>}
            </div>

            <SectionTitle title="Documentación" />
            <div className="border-2 border-dashed border-neutral-300 p-8 md:p-12 text-center hover:bg-neutral-50 transition-colors rounded-lg">
                <Upload size={40} className="mx-auto text-neutral-400 mb-6" />
                <p className="font-serif text-2xl text-black mb-3 font-bold">Subir Archivos Requeridos</p>
                <p className="text-sm text-neutral-600 font-medium max-w-md mx-auto leading-relaxed mb-6">
                    Reporte de Crédito, EIN, Licencia de Conducir, Artículos de Organización.
                </p>

                <div className="flex flex-col items-center gap-4">
                    <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        disabled={isUploading}
                        className="bg-black text-white px-6 py-3 text-xs font-bold tracking-[0.15em] uppercase hover:bg-vinotinto transition-colors shadow-lg rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isUploading ? "Subiendo..." : "Seleccionar Archivos"}
                    </button>
                    <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        className="hidden"
                        onChange={async (e) => {
                            if (!e.target.files?.length) return;
                            const files = Array.from(e.target.files);

                            setIsUploading(true);

                            for (const file of files) {
                                try {
                                    // 1. Upload to Blob
                                    const response = await fetch(`/api/upload?filename=${file.name}`, {
                                        method: 'POST',
                                        body: file,
                                    });

                                    if (!response.ok) throw new Error('Upload failed');

                                    const newBlob = await response.json();

                                    // 2. Add URL to form state
                                    const currentFiles = getValues("files") || [];
                                    setValue("files", [...currentFiles, { name: file.name, url: newBlob.url }]);

                                } catch (error) {
                                    console.error("Upload error:", error);
                                    alert(`Error subiendo ${file.name}`);
                                }
                            }
                            setIsUploading(false);
                            if (fileInputRef.current) fileInputRef.current.value = "";
                        }}
                    />
                    <p className="text-[10px] text-neutral-400 font-bold uppercase tracking-wider">Máx 4.5MB por archivo</p>
                </div>

                {/* File List Preview */}
                {watch("files") && (watch("files")?.length ?? 0) > 0 && (
                    <div className="mt-8 text-left space-y-2 border-t border-neutral-200 pt-6">
                        <p className="text-xs font-bold uppercase text-neutral-500 mb-4">Archivos Adjuntos:</p>
                        {watch("files")?.map((f: any, i: number) => (
                            <div key={i} className="flex items-center justify-between bg-white border border-neutral-200 p-3 rounded shadow-sm">
                                <span className="text-sm font-medium text-black truncate">{f.name}</span>
                                <a href={f.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-vinotinto uppercase tracking-wider hover:underline">Ver</a>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
