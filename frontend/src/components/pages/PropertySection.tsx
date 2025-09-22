import { PropertyTypeNav } from "@/components/layouts/property/property-type-nav";
import { FilterSection } from "@/components/layouts/property/filter-section";
import { PropertyGrid } from "@/components/layouts/property/property-grid";
import { fetchAllProperties } from "@/services/property.services";

const ITEMS_PER_PAGE = 8;

export default async function PropertySection({
  category,
  name,
  page,
}: {
  category?: string;
  name?: string;
  page: number;
}) {
  const { properties, total } = await fetchAllProperties({
    property_category: category,
    name,
    page,
    limit: ITEMS_PER_PAGE,
  });

  return (
    <section
      className="min-h-screen bg-gray-50 overflow-x-hidden"
      id="properties">
      <PropertyTypeNav activeCategory={category ?? ""} />
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-6 py-4 sm:py-6">
        <FilterSection />
        <PropertyGrid
          data={properties}
          total={total}
          page={page}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </section>
  );
}
