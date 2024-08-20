"use client"
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { formatCurrency } from '@/lib/formatters'
import { Textarea } from "@/components/ui/textarea"

import { Button } from '@/components/ui/button'
import { addProduct } from '@/app/admin/_actions/products'
import { useFormState, useFormStatus } from 'react-dom'
const ProductForm = () => {
    const [err, action] = useFormState(addProduct, {})
    const [priceInCents, setPriceInCents] = useState()
    return (
        <form action={action} className='space-y-8'>
            <div className='space-y-2'>
                <Label htmlFor='name'>Product Name</Label>
                <Input type='text' id='name' name='name' required />
                {err.name && <div className='text-destructive'>{err.name}</div>}
            </div>
            <div className='space-y-2'>
                <Label htmlFor='name'>Price In Cents</Label>
                <Input type='number' id='priceInCents' name='priceInCents' required value={priceInCents} onChange={(e) => setPriceInCents(Number(e.target.value) || undefined)} />
            </div>
            <div className='text-muted-foreground'>
                {formatCurrency((priceInCents || 0) / 100)}
            </div>
            {err.priceInCents && <div className='text-destructive'>{err.priceInCents}</div>}

            <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea id='description' name='description' required />
                {err.description && <div className='text-destructive'>{err.description}</div>}

            </div>

            <div className='space-y-2'>
                <Label htmlFor='file'>File</Label>
                <Input type='file' id='file' name='file' required />
                {err.file && <div className='text-destructive'>{err.file}</div>}

            </div>
            <div className='space-y-2'>
                <Label htmlFor='image'>Image</Label>
                <Input type='file' id='image' name='image' required />
                {err.image && <div className='text-destructive'>{err.image}</div>}

            </div>
            <SubmitButton />
        </form>
    )
}

function SubmitButton() {
    const { pending } = useFormStatus()
    return (
        <Button type='submit' disabled={pending}>{pending ? 'Saving...' : 'Save'}</Button>
    )
}

export default ProductForm
