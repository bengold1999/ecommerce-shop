import db from '@/db/db'
import { notFound } from 'next/navigation'
import React from 'react'
import Stripe from 'stripe'
import { CheckoutForm } from './_comps/CheckOutForm'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: '2024-06-20', 
});

const page = async ({ params: { id } }: { params: { id: string } }) =>  {
    const product = await db.product.findUnique({ where: { id } })

    if (!product) return notFound()

    const minimumChargeAmount = 50
    if (product.priceInCents < minimumChargeAmount) {
        console.error(`Product price is too low. Minimum charge amount is $${minimumChargeAmount / 100}.`);
        return (
            <div>
                <p>Sorry, the product price is too low to process a payment.</p>
            </div>
        );
    }

    try {
        const paymentIntent = await stripe.paymentIntents.create({
            amount: product.priceInCents,
            currency: "usd",
            metadata: { product_id: product.id },
        });

        if (!paymentIntent.client_secret) {
            throw new Error("Stripe failed to create a payment intent")
        }

        return (
            <CheckoutForm product={product} clientSecret={paymentIntent.client_secret}/>
        )
    } catch (error) {
        console.error("Error creating payment intent:", error)
        return (
            <div>
                <p>There was an issue processing your payment. Please try again later.</p>
            </div>
        )
    }
}

export default page
