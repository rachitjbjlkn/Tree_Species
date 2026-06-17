interface Props {
  id: string
  title: string
  description: string
}

export default function SectionPlaceholder({ id, title, description }: Props) {
  return (
    <section id={id} className="py-20 sm:py-32 px-5 sm:px-10 bg-stone-950 border-t border-stone-800">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-playfair italic text-white mb-4 sm:mb-6">{title}</h2>
        <p className="text-stone-400 text-sm sm:text-lg leading-relaxed px-2 sm:px-0">{description}</p>
      </div>
    </section>
  )
}
