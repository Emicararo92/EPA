type AdoptionEmailData = {
  adoptionRequestId: string;
  createdAt: string;
  animal: {
    nombre: string;
    especie: string | null;
    raza: string | null;
  };
  nombre: string;
  apellido: string;
  email: string;
  telefono: string;
  ciudad: string;
  tipoVivienda: string;
  tienePatio: string;
  alquila: string;
  tieneHijos: string;
  otrasMascotas: string;
  detalleMascotas: string;
  experiencia: string;
  motivoAdopcion: string;
};

function escapeHtml(value: string | null | undefined) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function sendAdoptionEmail(data: AdoptionEmailData) {
  const resendApiKey = process.env.RESEND_API_KEY;

  if (!resendApiKey) {
    console.error("RESEND_API_KEY no está configurada.");
    return {
      success: false,
      error: "RESEND_API_KEY no configurada.",
    };
  }

  const fromEmail =
    process.env.RESEND_FROM_EMAIL || "EPA <onboarding@resend.dev>";

  const toEmail = process.env.ADOPTION_EMAIL_TO || "emicararo92@gmail.com";

  const animalNombre = escapeHtml(data.animal.nombre);
  const animalEspecie = escapeHtml(data.animal.especie || "-");
  const animalRaza = escapeHtml(data.animal.raza || "-");

  const nombre = escapeHtml(data.nombre);
  const apellido = escapeHtml(data.apellido);
  const email = escapeHtml(data.email);
  const telefono = escapeHtml(data.telefono);
  const ciudad = escapeHtml(data.ciudad);

  const tipoVivienda = escapeHtml(data.tipoVivienda);
  const tienePatio = escapeHtml(data.tienePatio || "No especificado");
  const alquila = escapeHtml(data.alquila || "No especificado");
  const tieneHijos = escapeHtml(data.tieneHijos || "No especificado");

  const otrasMascotas = escapeHtml(data.otrasMascotas || "No especificado");

  const detalleMascotas = escapeHtml(data.detalleMascotas);
  const experiencia = escapeHtml(data.experiencia);
  const motivoAdopcion = escapeHtml(data.motivoAdopcion);

  const createdAt = new Date(data.createdAt).toLocaleString("es-AR");

  const emailHtml = `
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Nueva solicitud de adopción</title>
</head>

<body
  style="
    margin: 0;
    padding: 0;
    background: #f7f4ef;
    font-family: Arial, Helvetica, sans-serif;
    color: #333333;
  "
>
  <div
    style="
      max-width: 680px;
      margin: 40px auto;
      background: #ffffff;
      border-radius: 16px;
      overflow: hidden;
      border: 1px solid #e8e2da;
    "
  >

    <!-- HEADER -->

    <div
      style="
        padding: 32px;
        background: #f3eee7;
        text-align: center;
      "
    >
      <h1
        style="
          margin: 0 0 8px;
          font-size: 28px;
          color: #5b4636;
        "
      >
        Nueva solicitud de adopción
      </h1>

      <p
        style="
          margin: 0;
          color: #806f60;
          font-size: 15px;
        "
      >
        Alguien quiere darle un hogar a ${animalNombre}.
      </p>
    </div>

    <!-- CONTENIDO -->

    <div style="padding: 32px;">

      <!-- ANIMAL -->

      <div
        style="
          margin-bottom: 28px;
          padding: 20px;
          background: #faf8f5;
          border-radius: 12px;
        "
      >
        <h2
          style="
            margin: 0 0 14px;
            font-size: 18px;
            color: #5b4636;
          "
        >
          Animal
        </h2>

        <p style="margin: 6px 0;">
          <strong>Nombre:</strong> ${animalNombre}
        </p>

        <p style="margin: 6px 0;">
          <strong>Especie:</strong> ${animalEspecie}
        </p>

        <p style="margin: 6px 0;">
          <strong>Raza:</strong> ${animalRaza}
        </p>
      </div>

      <!-- ADOPTANTE -->

      <h2
        style="
          margin: 0 0 18px;
          font-size: 18px;
          color: #5b4636;
        "
      >
        Datos del adoptante
      </h2>

      <p style="margin: 8px 0;">
        <strong>Nombre:</strong>
        ${nombre} ${apellido}
      </p>

      <p style="margin: 8px 0;">
        <strong>Email:</strong>
        ${email}
      </p>

      <p style="margin: 8px 0;">
        <strong>Teléfono:</strong>
        ${telefono}
      </p>

      <p style="margin: 8px 0;">
        <strong>Ciudad:</strong>
        ${ciudad}
      </p>

      <hr
        style="
          border: 0;
          border-top: 1px solid #eeeeee;
          margin: 28px 0;
        "
      />

      <!-- HOGAR -->

      <h2
        style="
          margin: 0 0 18px;
          font-size: 18px;
          color: #5b4636;
        "
      >
        Hogar
      </h2>

      <p style="margin: 8px 0;">
        <strong>Tipo de vivienda:</strong>
        ${tipoVivienda}
      </p>

      <p style="margin: 8px 0;">
        <strong>¿Tiene patio?:</strong>
        ${tienePatio}
      </p>

      <p style="margin: 8px 0;">
        <strong>¿Alquila?:</strong>
        ${alquila}
      </p>

      <p style="margin: 8px 0;">
        <strong>¿Tiene hijos?:</strong>
        ${tieneHijos}
      </p>

      <hr
        style="
          border: 0;
          border-top: 1px solid #eeeeee;
          margin: 28px 0;
        "
      />

      <!-- OTROS ANIMALES -->

      <h2
        style="
          margin: 0 0 18px;
          font-size: 18px;
          color: #5b4636;
        "
      >
        Otros animales
      </h2>

      <p style="margin: 8px 0;">
        <strong>¿Tiene otros animales?:</strong>
        ${otrasMascotas}
      </p>

      ${
        detalleMascotas
          ? `
            <p
              style="
                margin: 12px 0 0;
                line-height: 1.7;
                white-space: pre-line;
              "
            >
              ${detalleMascotas}
            </p>
          `
          : ""
      }

      <!-- EXPERIENCIA -->

      <h2
        style="
          margin: 28px 0 18px;
          font-size: 18px;
          color: #5b4636;
        "
      >
        Experiencia
      </h2>

      <p
        style="
          margin: 0;
          line-height: 1.7;
          white-space: pre-line;
        "
      >
        ${experiencia}
      </p>

      <!-- MOTIVO -->

      <h2
        style="
          margin: 28px 0 18px;
          font-size: 18px;
          color: #5b4636;
        "
      >
        Motivo de adopción
      </h2>

      <p
        style="
          margin: 0;
          line-height: 1.7;
          white-space: pre-line;
        "
      >
        ${motivoAdopcion}
      </p>

      <!-- FECHA -->

      <div
        style="
          margin-top: 32px;
          padding: 16px;
          background: #f8f4ee;
          border-radius: 10px;
          font-size: 13px;
          color: #76695f;
        "
      >
        Solicitud registrada el ${createdAt}
      </div>

    </div>

    <!-- FOOTER -->

    <div
      style="
        padding: 24px 32px;
        background: #faf8f5;
        text-align: center;
        color: #8a7b6d;
        font-size: 13px;
      "
    >
      EPA · Adopción responsable
    </div>

  </div>
</body>
</html>
`;

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [toEmail],
        reply_to: data.email,
        subject: `Nueva solicitud de adopción - ${data.animal.nombre}`,
        html: emailHtml,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();

      console.error("RESEND ERROR:", errorText);

      return {
        success: false,
        error: errorText,
      };
    }

    const result = await response.json();

    console.log("RESEND EMAIL SENT:", result);

    return {
      success: true,
    };
  } catch (error) {
    console.error("RESEND FETCH ERROR:", error);

    return {
      success: false,
      error: "No se pudo conectar con Resend.",
    };
  }
}
