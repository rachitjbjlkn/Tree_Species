interface Props {
  id: string
  title: string
  description: string
}

export default function SectionPlaceholder({ id, title, description }: Props) {
  return (
    <section id={id} className="py-32 px-5 bg-stone-950 border-t border-stone-800">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-playfair italic text-white mb-6">{title}</h2>
        <p className="text-stone-400 text-lg leading-relaxed">{description}</p>
      </div>
    </section>
  )
}
