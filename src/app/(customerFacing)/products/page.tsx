import { ProductCard, ProductCardSkeleton } from '@/components/ProductCard'
import db from '@/db/db'
import React, { Suspense } from 'react'

const page = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    <Suspense
      fallback={
        <>
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </>
      }
    >
      <ProductsSuspense />
    </Suspense>
  </div>
  )
}

export default page

function getProducts(){
    return db.product.findMany({
        where: { isAvailableForPurchase: true },
        orderBy: { name: "asc" },})
}

async function ProductsSuspense() {
  const products = await getProducts()
  return products.map((product) => <ProductCard key={product.id} {...product} />)
}
