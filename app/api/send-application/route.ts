
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import { db } from '@/lib/db';
import { applications } from '@/lib/db/schema';

const transporter = nodemailer.createTransport({
    host: process.env.BREVO_SMTP_HOST || 'smtp-relay.brevo.com',
    port: Number(process.env.BREVO_SMTP_PORT) || 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: process.env.BREVO_SMTP_USER,
        pass: process.env.BREVO_SMTP_PASS,
    },
});

export async function POST(request: Request) {
    try {
        const data = await request.json();

        // 1. Save to Database (Vercel Postgres)
        await db.insert(applications).values({
            personalInfo: data.personalInfo,
            businessInfo: {
                business1: data.business1,
                business2: data.business2,
                liquidity: data.businessLiquidityLevel
            },
            files: data.files || [],
            status: 'pending'
        });

        // 2. Format Email
        const { personalInfo, creditScore, business1, business2, fundingGoal, fundingPreferences, fundingPurpose, negativeItems, files } = data;

        const emailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
             body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
             h1 { color: #5d0418; font-size: 24px; border-bottom: 2px solid #5d0418; padding-bottom: 10px; }
             h2 { background: #f4f4f4; padding: 10px; font-size: 18px; margin-top: 30px; border-left: 5px solid #5d0418; }
             .item { margin-bottom: 10px; }
             .label { font-weight: bold; color: #666; font-size: 12px; text-transform: uppercase; }
             .value { font-size: 16px; color: #000; }
             .highlight { color: #5d0418; font-weight: bold; }
             .grid { display: table; width: 100%; }
             .col { display: table-cell; width: 50%; padding-right: 20px; vertical-align: top; }
             .file-link { display: inline-block; background: #eee; padding: 5px 10px; border-radius: 4px; text-decoration: none; color: #5d0418; font-weight: bold; margin-right: 5px; margin-bottom: 5px; font-size: 12px; }
          </style>
        </head>
        <body>
            <h1>Nueva Solicitud: ${personalInfo.fullName}</h1>
            <p><strong>Fecha:</strong> ${new Date().toLocaleDateString()}</p>
            <p><strong>Monto Solicitado:</strong> <span class="highlight">${fundingGoal}</span></p>
            
            <h2>1. Información Personal y Crédito</h2>
            <div class="grid">
               <div class="col">
                  <div class="item"><div class="label">Nombre</div><div class="value">${personalInfo.fullName}</div></div>
                  <div class="item"><div class="label">Email</div><div class="value">${personalInfo.email}</div></div>
                  <div class="item"><div class="label">Teléfono</div><div class="value">${personalInfo.phone}</div></div>
                  <div class="item"><div class="label">Idioma</div><div class="value">${personalInfo.language}</div></div>
               </div>
               <div class="col">
                  <div class="item"><div class="label">Score Transunion</div><div class="value highlight">${creditScore.transunion}</div></div>
                  <div class="item"><div class="label">Score Experian</div><div class="value highlight">${creditScore.experian}</div></div>
                  <div class="item"><div class="label">Score Equifax</div><div class="value highlight">${creditScore.equifax}</div></div>
               </div>
            </div>
            
            <div class="item" style="margin-top:20px;">
                <div class="label">Relaciones Bancarias</div>
                <div class="value">${personalInfo.bankRelationships}</div>
            </div>
            
            <div class="item">
                <div class="label">Tarjetas Personales</div>
                <div class="value">${personalInfo.creditCards}</div>
            </div>

            <div class="item">
                <div class="label">Ingreso Anual</div>
                <div class="value">${personalInfo.annualIncome}</div>
            </div>

            <div class="item" style="background:#fff3cd; padding:10px; margin-top:10px;">
                <div class="label">Monitoreo</div>
                <div class="value">
                   Site: ${personalInfo.monitoringLogin.site}<br/>
                   User: ${personalInfo.monitoringLogin.username}<br/>
                   Pass: ${personalInfo.monitoringLogin.password}
                </div>
            </div>

            <h2>2. Negocio Principal (${business1.name})</h2>
            <div class="grid">
               <div class="col">
                  <div class="item"><div class="label">Tipo</div><div class="value">${business1.type}</div></div>
                  <div class="item"><div class="label">Industria</div><div class="value">${business1.industry}</div></div>
                  <div class="item"><div class="label">EIN</div><div class="value">${business1.ein}</div></div>
               </div>
               <div class="col">
                  <div class="item"><div class="label">Ingreso Anual</div><div class="value">${business1.annualRevenue}</div></div>
                  <div class="item"><div class="label">% Propiedad</div><div class="value">${business1.ownershipPercentage}</div></div>
                  <div class="item"><div class="label">Fecha Formación</div><div class="value">${business1.formationDate}</div></div>
               </div>
            </div>
            <div class="item">
                 <div class="label">Relaciones Bancarias Negocio</div>
                 <div class="value">${business1.bankRelationships}</div>
            </div>

            ${data.hasSecondBusiness && business2 ? `
                <h2>3. Negocio Secundario (${business2.name})</h2>
                <p>EIN: ${business2.ein} | Industria: ${business2.industry}</p>
            ` : ''}

            <h2>4. Financiamiento</h2>
            <div class="item"><div class="label">Preferencias</div><div class="value">${fundingPreferences.join(", ")}</div></div>
            <div class="item"><div class="label">Propósito</div><div class="value">${fundingPurpose}</div></div>
            
            ${negativeItems && negativeItems.length > 0 ? `
                <div style="background:#ffebee; padding:15px; border:1px solid #ffcdd2; margin-top:20px;">
                    <strong style="color:#c62828;">⚠️ ALERTAS / NEGATIVOS DECLARADOS:</strong>
                    <ul>
                        ${negativeItems.map((item: string) => `<li>${item}</li>`).join("")}
                    </ul>
                </div>
            ` : ''}
            
            ${files && files.length > 0 ? `
                <h2>5. Archivos Adjuntos</h2>
                <div>
                    ${files.map((f: any) => `<a href="${f.url}" class="file-link" target="_blank">${f.name}</a>`).join("")}
                </div>
            ` : ''}

            <p style="margin-top:40px; font-size:12px; color:#999; text-align:center;">
                Enviado desde MarianaBolivar.com (vía Brevo)
            </p>
        </body>
      </html>
    `;

        // 3. Send Email using Nodemailer (Brevo)
        await transporter.sendMail({
            from: `"Mariana Bolivar Servicios" <noreply@marianabolivar.com>`,
            to: process.env.ADMIN_EMAIL || 'Business@marianabolivar.com',
            subject: `Nueva Aplicación: ${personalInfo.fullName} - $${fundingGoal}`,
            html: emailHtml,
        });

        return NextResponse.json({ success: true });

    } catch (error) {
        console.error("Submission error:", error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
