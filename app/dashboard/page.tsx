import {PrismaClient} from "@prisma/client";
import {getServerSession} from "next-auth/next";
import {authOptions} from "@/pages/api/auth/[...nextauth]";
import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import {prisma} from '@/util/prisma'


export const revalidate = 0

const fetchOrders = async () => {
    const user = await getServerSession(authOptions)
    if(!user){
        return null
    }
    //Find to find orders to this user
    const orders = await prisma.order.findMany({
        where: {
            userId: user?.user?.id, status: 'complete'
        },
        include: {
            products: true,
        },
    })
    return orders

}

export default async function Dashboard(){
    const orders = await fetchOrders()
    if(orders === null)
        return <div>You need to be logged</div>
    if(orders.length === 0){
        return <div><h1>No orders placed</h1></div>
    }
    return(
        <div >
            {orders.length === 0 ? <h1>No orders</h1> : <h1>Your orders</h1>}
            <div className={'font-medium'}>
                {orders.map((order) =>(
                    <div key={order.id} className={'rounded-lg p-8 my-12 bg-base-200'}>
                        <h2>Order reference: {order.id}</h2>
                        <p className={'text-xs py-2'}>
                            Status: <span className={`${order.status === 'complete' ? 'bg-teal-500' : 'bg-orange-500'} text-white py-1 rounded-md px-2 mx-2 text-sm`}>{order.status}</span>
                        </p>
                        <p className={'text-xs'}>Time: {new Date(order.createdDate).toString()}</p>

                        <div className={'lg:flex text-sm items-center gap-8'}>
                            {order.products.map((product) => (
                                <div className={'py-2 '} key={product.id}>
                                    <h2 className={'py-2'}>{product.name}</h2>
                                    <div className={'flex  gap-4  items-center'}>
                                        <Image
                                            src={product.image!}
                                            width={36} height={36}
                                            priority={true}
                                            className={'w-auto'}
                                            alt={product.name}/>
                                        <p>{formatPrice(product.unit_amount)}</p>
                                        <p>Quantity: {product.quantity}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

        </div>
    )
}