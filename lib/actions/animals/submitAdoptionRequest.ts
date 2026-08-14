"use server";

import { createAdminClient } from "../../../lib/supabase/admin";
import { sendAdoptionEmail } from "@/lib/mail/sendAdoptionEmail";

type AdoptionResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

export async function submitAdoptionRequest(
  formData: FormData,
): Promise<AdoptionResult> {
  try {
    const supabase = createAdminClient();

    // ==========================================
    // DATOS DEL FORMULARIO
    // ==========================================

    const animalId = String(formData.get("animal_id") || "").trim();

    const nombre = String(formData.get("nombre") || "").trim();

    const apellido = String(formData.get("apellido") || "").trim();

    const email = String(formData.get("email") || "").trim();

    const telefono = String(formData.get("telefono") || "").trim();

    const ciudad = String(formData.get("ciudad") || "").trim();

    const tipoVivienda = String(formData.get("tipo_vivienda") || "").trim();

    const tienePatioValue = String(formData.get("tiene_patio") || "").trim();

    const alquilaValue = String(formData.get("alquila") || "").trim();

    const tieneHijosValue = String(formData.get("tiene_hijos") || "").trim();

    const otrasMascotasValue = String(
      formData.get("otras_mascotas") || "",
    ).trim();

    const detalleMascotas = String(
      formData.get("detalle_mascotas") || "",
    ).trim();

    const experiencia = String(formData.get("experiencia") || "").trim();

    const motivoAdopcion = String(formData.get("motivo_adopcion") || "").trim();

    // ==========================================
    // VALIDACIONES
    // ==========================================

    if (!animalId) {
      return {
        success: false,
        error: "Seleccioná un animal.",
      };
    }

    if (!nombre) {
      return {
        success: false,
        error: "El nombre es obligatorio.",
      };
    }

    if (!apellido) {
      return {
        success: false,
        error: "El apellido es obligatorio.",
      };
    }

    if (!email) {
      return {
        success: false,
        error: "El email es obligatorio.",
      };
    }

    if (!telefono) {
      return {
        success: false,
        error: "El teléfono es obligatorio.",
      };
    }

    if (!ciudad) {
      return {
        success: false,
        error: "La ciudad es obligatoria.",
      };
    }

    if (!tipoVivienda) {
      return {
        success: false,
        error: "Seleccioná el tipo de vivienda.",
      };
    }

    if (!tienePatioValue) {
      return {
        success: false,
        error: "Indicá si tenés patio.",
      };
    }

    if (!experiencia) {
      return {
        success: false,
        error: "Contanos sobre tu experiencia con animales.",
      };
    }

    if (!motivoAdopcion) {
      return {
        success: false,
        error: "Contanos por qué querés adoptar.",
      };
    }

    // ==========================================
    // CONVERTIR VALORES A BOOLEAN
    // ==========================================

    const tienePatio =
      tienePatioValue === "Si" ? true : tienePatioValue === "No" ? false : null;

    const alquila =
      alquilaValue === "Si" ? true : alquilaValue === "No" ? false : null;

    const tieneHijos =
      tieneHijosValue === "Si" ? true : tieneHijosValue === "No" ? false : null;

    const otrasMascotas =
      otrasMascotasValue === "Si"
        ? true
        : otrasMascotasValue === "No"
          ? false
          : null;

    // ==========================================
    // VERIFICAR ANIMAL
    // ==========================================

    const { data: animal, error: animalError } = await supabase
      .from("animals")
      .select("id, nombre, especie, raza, estado")
      .eq("id", animalId)
      .single();

    if (animalError || !animal) {
      console.error("GET ANIMAL ERROR:", animalError);

      return {
        success: false,
        error: "El animal seleccionado no existe.",
      };
    }

    // ==========================================
    // VERIFICAR DISPONIBILIDAD
    // ==========================================

    if (animal.estado !== "Disponible") {
      return {
        success: false,
        error: "Este animal ya no se encuentra disponible para adopción.",
      };
    }

    // ==========================================
    // GUARDAR SOLICITUD
    // ==========================================

    const createdAt = new Date().toISOString();

    const { error: insertError } = await supabase
      .from("adoption_requests")
      .insert({
        animal_id: animal.id,

        nombre,
        apellido,
        email,
        telefono,
        ciudad,

        tipo_vivienda: tipoVivienda,

        tiene_patio: tienePatio,
        alquila,
        tiene_hijos: tieneHijos,
        otras_mascotas: otrasMascotas,

        detalle_mascotas: detalleMascotas || null,

        experiencia,

        motivo_adopcion: motivoAdopcion,
      });

    if (insertError) {
      console.error("CREATE ADOPTION REQUEST ERROR:", insertError);

      return {
        success: false,
        error:
          insertError.message || "No se pudo guardar la solicitud de adopción.",
      };
    }

    console.log("ADOPTION REQUEST SAVED:", animal.nombre, nombre, apellido);

    // ==========================================
    // ENVIAR EMAIL
    // ==========================================

    try {
      await sendAdoptionEmail({
        animal: {
          nombre: animal.nombre,
          especie: animal.especie ?? "",
          raza: animal.raza ?? "",
        },

        nombre,
        apellido,
        email,
        telefono,
        ciudad,

        tipoVivienda,

        tienePatio:
          tienePatio === true
            ? "Sí"
            : tienePatio === false
              ? "No"
              : "No especificado",

        alquila:
          alquila === true
            ? "Sí"
            : alquila === false
              ? "No"
              : "No especificado",

        tieneHijos:
          tieneHijos === true
            ? "Sí"
            : tieneHijos === false
              ? "No"
              : "No especificado",

        otrasMascotas:
          otrasMascotas === true
            ? "Sí"
            : otrasMascotas === false
              ? "No"
              : "No especificado",

        detalleMascotas: detalleMascotas || "",

        experiencia: experiencia || "",

        motivoAdopcion: motivoAdopcion || "",

        createdAt,

        adoptionRequestId: "",
      });

      console.log("ADOPTION EMAIL SENT");
    } catch (emailError) {
      /*
       * La solicitud ya fue guardada.
       *
       * Si Resend falla, no mostramos error
       * al usuario ni eliminamos la solicitud.
       */

      console.error("ADOPTION EMAIL ERROR:", emailError);
    }

    // ==========================================
    // TODO OK
    // ==========================================

    return {
      success: true,
    };
  } catch (error) {
    console.error("SUBMIT ADOPTION REQUEST ERROR:", error);

    return {
      success: false,
      error: "Ocurrió un error al enviar la solicitud.",
    };
  }
}
