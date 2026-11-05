import Image from "next/image";
import StatCount from "@/components/stat-count";

const classroomPhotos = [
  "Amazon training · Batch 3",
  "Amazon training · Batch 2",
  "Daraz training · Batch 6",
  "Digital Empire classroom group"
];

export const metadata = {
  title: "About Digital Empire Skills University",
  description: "Learn about Digital Empire Skills University, our practical training in Karachi and our vision for Pakistan’s learners.",
  alternates: { canonical: "/about" },
};

const priorities = [
  {
    title: "Our Vision",
    text: "Our vision is to help Pakistan’s youth build a future with greater independence. We help aspiring entrepreneurs and e-commerce sellers gain the knowledge, guidance and practical experience to start their own journeys.",
  },
  {
    title: "Empowering Women",
    text: "We’re committed to helping women develop skills they can use to work from home, offer services online and build businesses. These skills can open opportunities to earn in PKR or foreign currencies, on terms that fit their values and circumstances.",
  },
  {
    title: "Learning by Doing",
    text: "We believe learning should be practical, honest and grounded in real work. We teach through guided practice and clear expectations in a supportive environment. Every learner’s path is different, and consistent practice can open new opportunities.",
  },
];

export default function About() {
  return (
    <>
      <section className="bg-[#081c40] bg-gradient-to-br from-[#081c40] to-[#143d75] px-5 py-16 text-center sm:py-24">
        <div className="container mx-auto max-w-4xl">
          <span className="inline-flex rounded-full border border-[#f2cc76]/40 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#f2cc76]">About Us</span>
          <h1 className="my-5 text-4xl leading-tight sm:text-6xl" style={{ color: "#fff" }}>
            About Digital Empire Skills University
          </h1>
          <p className="text-lg font-semibold sm:text-2xl" style={{ color: "#f2cc76" }}>
            Learn Skills. Build Independence. Create Your Future.
          </p>
          <p className="mx-auto mt-5 max-w-xl" style={{ color: "#dce8fb" }}>
            Every big journey begins with one decision: the decision to learn and take the first step.
          </p>
        </div>
      </section>

      <section className="bg-[#f5f8fc] py-12 text-center sm:py-16" aria-labelledby="classroom-title">
        <div className="container">
          <span className="eyebrow">Our Classroom</span>
          <h2 id="classroom-title" className="my-3 text-3xl sm:text-5xl">
            <span className="text-[#124391]"><StatCount value={1000} finalLabel="1,000+" startValue={1} /></span> Learners Trained
          </h2>
          <p className="mx-auto max-w-xl">Meet the learners building practical e-commerce skills in our Karachi classrooms.</p>
          <ul className="mt-8 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {classroomPhotos.map((caption, index) => (
              <li key={caption} className="overflow-hidden rounded-2xl border border-[#dce6f4] bg-white shadow-sm">
                <Image src={`/images/classroom-${index + 1}.jpg`} alt={`Group photo: ${caption}`} width={900} height={[600, 600, 754, 675][index]} sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw" className="aspect-[4/3] w-full object-cover object-center" />
                <p className="px-3 py-3 text-sm font-semibold">{caption}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="container py-14 sm:py-20" aria-labelledby="about-story">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 id="about-story" className="mb-4 text-3xl sm:text-4xl">Our Story</h2>
          <p className="leading-relaxed">
            At Digital Empire Skills University, we help people turn that decision into practical action. At our Saddar and Gulshan-e-Iqbal campuses in Karachi, learners get hands-on training in e-commerce, digital marketing and online business so they can build useful skills, practise with confidence and explore new opportunities.
          </p>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {priorities.map(({ title, text }, index) => (
            <article key={title} className="rounded-3xl border border-[#dce6f4] bg-[#f5f8fc] p-6 shadow-sm sm:p-8">
              <span className="text-sm font-bold tracking-widest text-[#8a5b10]" aria-hidden="true">0{index + 1}</span>
              <h3 className="my-3 text-2xl">{title}</h3>
              <p className="leading-relaxed">{text}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 grid items-center gap-6 rounded-3xl border border-[#e0e8f4] bg-white p-6 shadow-sm sm:p-10 md:grid-cols-[1fr_2fr]">
          <div>
            <strong className="block text-5xl text-[#124391]">1,000+</strong>
            <span className="font-semibold">Learners trained</span>
          </div>
          <div>
            <h2 className="mb-3 text-2xl">A Community That Grows Together</h2>
            <p className="leading-relaxed">
              Over the years, more than 1,000 learners have trained with us and begun pursuing their goals. Their progress inspires us to make practical learning more accessible and help Pakistani talent reach opportunities in a global economy.
            </p>
            <p className="mt-3 leading-relaxed">Our aim is to create a place where people can learn, practise, support one another and build with confidence.</p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl bg-[#081c40] px-6 py-10 text-center sm:px-12">
          <h2 className="mx-auto max-w-3xl text-2xl sm:text-3xl" style={{ color: "#fff" }}>
            Your future can start with a skill and a decision to take that first step.
          </h2>
          <p className="mt-5 font-semibold" style={{ color: "#f2cc76" }}>Digital Empire Skills University</p>
          <p className="mt-2" style={{ color: "#dce8fb" }}>Practical Skills. Real Possibilities. A More Independent Future.</p>
        </div>
      </section>
    </>
  );
}
