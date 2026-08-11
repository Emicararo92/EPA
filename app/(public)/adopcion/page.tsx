import { getPublishedAnimals } from "@/lib/actions/animals/getPublishedAnimals";
import AdoptionForm from "@/components/public/adoption/AdoptionForm";

type AdoptionPageProps = {
  searchParams: Promise<{
    animal?: string;
  }>;
};

export default async function AdoptionPage({
  searchParams,
}: AdoptionPageProps) {
  const animals = await getPublishedAnimals();
  const params = await searchParams;

  const animalId = params.animal ?? "";

  return (
    <main>
      <AdoptionForm animals={animals} initialAnimalId={animalId} />
    </main>
  );
}
