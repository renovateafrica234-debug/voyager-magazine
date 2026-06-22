// app/about/page.tsx
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-voyager-dark pb-28">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center gap-2 text-voyager-text-muted text-sm mb-8 hover:text-voyager-cream">
          <ArrowLeft className="w-4 h-4" />
          Back
        </Link>

        <h1 className="font-serif text-3xl text-voyager-cream mb-6">About WhiteLion Voyage</h1>

        <div className="prose prose-invert prose-gold max-w-none">
          <p className="text-voyager-text-secondary leading-relaxed">
            WhiteLion Voyage is a digital publishing house dedicated to the art of African storytelling. 
            Founded in 2024, we believe that the continent's narratives deserve the same editorial rigor 
            and visual sophistication as any global publication.
          </p>

          <h2 className="text-voyager-cream text-xl font-serif mt-8 mb-4">Our Mission</h2>
          <p className="text-voyager-text-secondary leading-relaxed">
            To document, preserve, and elevate the stories of Africa — from the ancient wisdom of Ifá 
            to the cutting-edge architecture of Kigali. We are not interested in poverty porn or 
            safari clichés. We are interested in complexity, beauty, and truth.
          </p>

          <h2 className="text-voyager-cream text-xl font-serif mt-8 mb-4">The Team</h2>
          <p className="text-voyager-text-secondary leading-relaxed">
            Our editors are based in Lagos, Nairobi, Accra, and London. Our photographers are African. 
            Our writers are African. Our perspective is unapologetically so.
          </p>

          <h2 className="text-voyager-cream text-xl font-serif mt-8 mb-4">Contact</h2>
          <p className="text-voyager-text-secondary leading-relaxed">
            For editorial inquiries: hello@whitelionvoyage.com<br />
            For partnerships: partnerships@whitelionvoyage.com<br />
            For press: press@whitelionvoyage.com
          </p>
        </div>
      </div>
    </main>
  );
}
