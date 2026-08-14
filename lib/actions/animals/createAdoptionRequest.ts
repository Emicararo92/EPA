"use server";

import { createClient } from "@/lib/supabase/server";
import { sendAdoptionEmail } from "../../mail/sendAdoptionEmail";

type AdoptionResult =
  | {
      success: true;
    }
  | {
      success: false;
      error: string;
    };

function getBooleanValue(value: string) {
  if (value === "Si") return true;
  if (value === "No") return false;

  return null;
}

export async function createAdoptionRequest(
  formData: FormData,
): Promise<AdoptionResult> {
  try {
    const supabase = await createClient();

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
    // CONVERTIR A BOOLEANOS
    // ==========================================

    const tienePatio = getBooleanValue(tienePatioValue);

    const alquila = getBooleanValue(alquilaValue);

    const tieneHijos = getBooleanValue(tieneHijosValue);

    const otrasMascotas = getBooleanValue(otrasMascotasValue);

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

    if (animal.estado !== "Disponible") {
      return {
        success: false,
        error: "Este animal ya no se encuentra disponible para adopción.",
      };
    }

    // ==========================================
    // GUARDAR SOLICITUD
    // ==========================================

    const { data: adoptionRequest, error: insertError } = await supabase
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
      })
      .select("id, created_at")
      .single();

    if (insertError || !adoptionRequest) {
      console.error("CREATE ADOPTION REQUEST ERROR:", insertError);

      return {
        success: false,
        error:
          insertError?.message ||
          "No se pudo guardar la solicitud de adopción.",
      };
    }

    // ==========================================
    // ENVIAR EMAIL
    // ==========================================

    const emailResult = await sendAdoptionEmail({
      adoptionRequestId: adoptionRequest.id,
      createdAt: adoptionRequest.created_at,

      animal: {
        nombre: animal.nombre,
        especie: animal.especie,
        raza: animal.raza,
      },

      nombre,
      apellido,
      email,
      telefono,
      ciudad,

      tipoVivienda,
      tienePatio: tienePatioValue,
      alquila: alquilaValue,
      tieneHijos: tieneHijosValue,

      otrasMascotas: otrasMascotasValue,
      detalleMascotas,

      experiencia,
      motivoAdopcion,
    });

    // ==========================================
    // IMPORTANTE
    // ==========================================

    if (!emailResult.success) {
      console.error("ADOPTION EMAIL ERROR:", emailResult.error);

      // La solicitud YA está guardada.
      // No la eliminamos si falla el email.
    }

    return {
      success: true,
    };
  } catch (error) {
    console.error("ADOPTION REQUEST ERROR:", error);

    return {
      success: false,
      error: "Ocurrió un error al enviar la solicitud.",
    };
  }
}
