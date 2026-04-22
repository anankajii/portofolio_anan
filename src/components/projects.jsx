export default function Projects() {
  return (
    <section id="projects" className="py-32 text-center">
      <h2 className="text-3xl font-bold">Projects</h2>

      <div className="flex justify-center gap-6 mt-10">
        <div className="bg-slate-900 p-5 rounded-xl hover:-translate-y-2 transition">
          <h3>POS UMKM</h3>
          <p>Sistem kasir modern</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl hover:-translate-y-2 transition">
          <h3>Sistem TK</h3>
          <p>Monitoring siswa</p>
        </div>

        <div className="bg-slate-900 p-5 rounded-xl hover:-translate-y-2 transition">
          <h3>Kampung Adat</h3>
          <p>Website budaya</p>
        </div>
      </div>
    </section>
  )
}