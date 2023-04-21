import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import {PrismaAdapter} from "@next-auth/prisma-adapter"
import {PrismaClient} from "@prisma/client"
import Stripe from 'stripe'


const prisma = new PrismaClient()

export const options = {
    adapter: PrismaAdapter(prisma),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
        }),
    ],
    //Add another provider
    events: {
        createUser: async ({user}) => {
            const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
                apiVersion: '2022-11-15'
            })
            // Create another stripe customer
            if (user.email && user.name) {
                const customer = await stripe.customers.create({
                    email: user.email,
                    name: user.name,
                })
                // Update prisma user with stripe customer id
                await prisma.user.update({
                    where: {id: user.id},
                    data: {stripeCustomerId: customer.id}
                })
            }
        }
    }
}

export default  NextAuth(options)