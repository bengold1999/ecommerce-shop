"use client"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { formatCurrency } from '@/lib/formatters'
import { Button } from '@/components/ui/button'
import { addProduct } from '@/app/admin/_actions/products'
const ProductForm = () => {
    const [priceInCents, setPriceInCents] = useState()
    return (
        <form action={addProduct} className='space-y-8'>
            <div className='space-y-2'>
                <Label htmlFor='name'>Product Name</Label>
                <Input type='text' id='name' name='name' required />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='name'>Price In Cents</Label>
                <Input type='number' id='priceInCents' name='priceInCents' required value={priceInCents} onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)} />
            </div>
            <div className='text-muted-foreground'>
                {formatCurrency((priceInCents || 0)/100)}
            </div>
            <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Input type='text' id='description' name='description' required />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='file'>File</Label>
                <Input type='file' id='file' name='file' required />
            </div>
            <div className='space-y-2'>
                <Label htmlFor='image'>Image</Label>
                <Input type='file' id='image' name='image' required />
            </div>
            <Button type='submit'>Save</Button>
        </form>
    )
}

export default ProductForm
