import React from 'react'
import { PageHeader } from '../_comps/pageHeader'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Table,TableBody,TableHead, TableHeader, TableRow } from '@/components/ui/table'

const page = () => {
  return (
    <>
    <div className='flex justify-between items-center gap-4'>
   <PageHeader>Products</PageHeader>
   <Button asChild>
    <Link href="/admin/products/new">Add Product</Link>
   </Button>
   </div>
   <ProductTable/>
   </>
  )
}

function ProductTable(){
    return(
     <Table> 
        <TableHeader>
            <TableRow>
                <TableHead className='w-0'>
                    <span className="sr-only">Available for Purchase</span>
                </TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Orders</TableHead>
                <TableHead className='w-0'>
                    <span className="sr-only">Actions </span>
                </TableHead>
                </TableRow>
        </TableHeader>
        <TableBody></TableBody>
    </Table>
    )
}

export default page
