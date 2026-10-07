import PageLayout from "@/components/layout/PageLayout";
import ContactForm from "./ContactForm";

export const metadata = { title: "Contact — SoloBuildAI" };

export default function ContactPage() {
  return (
    <PageLayout>
      <section className="py-16 bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-xl">
            <span className="text-xs font-semibold tracking-widest uppercase text-blue-600 block mb-4">Contact</span>
            <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 leading-tight tracking-tight mb-4">
              Get in touch.
            </h1>
            <p className="text-slate-500 text-base leading-relaxed">
              Whether you&apos;re interested in a demo, have a custom AI project in mind, or just want
              to understand how SoloBuildAI could work for your organization — we&apos;d love to hear from you.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-14">
            <div className="lg:col-span-1">
              <h2 className="text-base font-semibold text-slate-900 mb-6">Other ways to connect</h2>
              <div className="space-y-5">
                {[
                  { title: "Request a demo", desc: "See SoloBuildAI in action with a focused 30-minute walkthrough.", href: "/demo", cta: "Book demo" },
                  { title: "Custom AI enquiry", desc: "Have a specific operational problem? Tell us what you need.", href: "/solutions/custom", cta: "Submit enquiry" },
                  { title: "Careers", desc: "Interested in joining SoloBuildAI? See what we're building.", href: "/company/careers", cta: "View careers" },
                ].map((item) => (
                  <div key={item.title} className="bg-slate-50 border border-slate-200 rounded-xl p-5">
                    <h3 className="text-sm font-semibold text-slate-900 mb-1">{item.title}</h3>
                    <p className="text-xs text-slate-500 mb-3 leading-relaxed">{item.desc}</p>
                    <a href={item.href} className="text-xs font-medium text-blue-600 hover:text-blue-700 transition-colors">
                      {item.cta} →
                    </a>
                  </div>
                ))}
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8">
                <h2 className="text-lg font-semibold text-slate-900 mb-2">Send us a message</h2>
                <p className="text-sm text-slate-500 mb-8">We aim to respond within one business day.</p>
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}
