export default function ContactForm() {
  return (
    <form action="https://formspree.io/f/xnnbbqay" method="POST" className="space-y-4" target="_blank">
      <label className="block">Nombre
        <input name="nombre" required className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block">Email
        <input name="email" type="email" required className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block">Teléfono (opcional)
        <input name="telefono" className="mt-1 w-full rounded border p-2" />
      </label>
      <label className="block">Mensaje
        <textarea name="mensaje" rows={4} required className="mt-1 w-full rounded border p-2" />
      </label>

      <label className="inline-flex items-center gap-2 text-sm">
        <input type="checkbox" name="privacidad" value="aceptada" required />
        Acepto la <a href="/privacidad" target="_blank" rel="noreferrer" className="underline">política de privacidad</a>.
      </label>

      {/* Honeypot anti-spam */}
      <input type="text" name="_gotcha" style={{ display: "none" }} />

      <button type="submit" className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700">
        Enviar
      </button>
    </form>
  );
}
