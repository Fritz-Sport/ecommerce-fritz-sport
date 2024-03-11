import { client } from "@/sanity/lib/client"
import { groq } from "next-sanity"

import { SanityProduct } from "@/config/inventory"
import { siteConfig } from "@/config/site"
import { seedSanityData } from "@/lib/seed"
import { cn } from "@/lib/utils"
import Footer from "@/components/Footer/Footer"
import { SiteHeader } from "@/components/Header/site-header"
import { ProductFilters } from "@/components/product-filters"
import { ProductGrid } from "@/components/product-grid"
import { ProductSort } from "@/components/product-sort"

interface Props {
  searchParams: {
    date?: string
    price?: string
    color?: string
    category?: string
    size?: string
    genero?: string
    search?: string
    sku?: string
  }
}

export default async function Page({ searchParams }: Props) {
  const {
    date = "desc",
    price,
    color,
    category,
    size,
    search,
    genero,
    sku,
  } = searchParams
  const priceOrder = price ? `| order(price ${price})` : ""
  const dateOrder = date ? `| order(_createAt ${date})` : ""

  const order = `${priceOrder}${dateOrder}`

  const productFilter = `_type == "product"`
  const colorFilter = color ? `&& "${color}" in colors` : ""
  const categoryFilter = category ? `&& "${category}" in categories` : ""
  const sizeFilter = size ? `&& "${size}" in sizes` : ""
  const generoFilter = genero ? `&& genero match "${genero}"` : ""

  const searchFilter = search
    ? `&& name match "${search}" || sku match "${search}"|| genero match "${search}"`
    : ""

  const filter = `*[${productFilter}${colorFilter}${categoryFilter}${sizeFilter}${searchFilter}${generoFilter}]`

  // await seedSanityData()
  const products = await client.fetch<SanityProduct[]>(groq`${filter} ${order} {
    _id,
    _createdAt,
    name,
    sku,
    images,
    currency,
    price,
    description,
    genero,
    "slug":slug.current
  }`)

  return (
    <div>
      <SiteHeader />

      {/* <div className="px-4 pt-20 text-center">
        <h1 className="text-4xl font-extrabold tracking-normal">{siteConfig.name}</h1>
        <p className="mx-auto mt-4 max-w-3xl text-base">{siteConfig.description}</p>
      </div> */}
      <div>
        <main className="mx-auto max-w-6xl px-6">
          <div className="mt-5 flex items-center justify-between border-b border-gray-200 pb-4 dark:border-gray-800">
            <h1 className="text-xl font-bold tracking-tight sm:text-2xl">
              {products.length} <span className="ml-2">Productos</span>{" "}
              {products.length === 1 ? "" : "s"}
            </h1>
            {/* Product Sort */}
            <ProductSort></ProductSort>
          </div>

          <section
            aria-labelledby="products-heading"
            className="flex pb-24 pt-6"
          >
            <h2 id="products-heading" className="sr-only">
              Products
            </h2>
            <div
              className={cn(
                "grid grid-cols-1 gap-x-8 gap-y-10",
                products.length > 0
                  ? "lg:grid-cols-4"
                  : "lg:grid-cols-[1fr_3fr]"
              )}
            >
              <div className="hidden lg:block">{/* Product filters */}</div>
              {/* Product filters */}
              <ProductFilters />
            </div>
            <ProductGrid products={products} />
            {/* Product grid */}
          </section>
        </main>
      </div>
      <Footer />
    </div>
  )
}
