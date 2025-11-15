export default function SolicitudForm() {
  return (
    <form action="https://formspree.io/f/mjkeevbq" method="POST" className="space-y-4" target="_blank">
      <label className="block">Entidad
        <input name="entidad" required className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block">CIF
        <input name="cif" required className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block">Persona de contacto
        <input name="contacto" required className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block">Email
        <input name="email" type="email" required className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block">Teléfono
        <input name="telefono" className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block">Frecuencia
        <select name="frecuencia" required className="mt-1 w-full rounded border p-2">
          <option value="">Selecciona…</option>
          <option>Mensual</option><option>Trimestral</option><option>Anual</option>
        </select>
      </label>
      <label className="block">Observaciones
        <textarea name="observaciones" rows={3} className="mt-1 w-full rounded border p-2" />
      </label>

      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" name="privacidad" value="aceptada" required />
        Acepto la <a href="/privacidad" target="_blank" rel="noreferrer" className="underline">política de privacidad</a>.
      </label>

      <input type="text" name="_gotcha" style={{ display: "none" }} />

      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Enviar solicitud
      </button>
    </form>
  );
}