import Image from "next/image";
import formatPrice from "@/util/PriceFormat";
import {ProductType} from "@/types/ProductType";
import Link from "next/link";


export default function Product({
                                    id,
                                    name,
                                    unit_amount,
                                    image,
                                    description,
                                    currency,
                                    metadata,
                                }: ProductType) {
    const {features} = metadata
    return (
        <div className={'text-gray-700'}>
            <Link href={{
                pathname: `/product/${id}`,
                query: {name, image, unit_amount, id, features, description}}}>
                <Image
                    src={image}
                    alt={name}
                    width={600}
                    height={600}
                    className={'w-full h-72 object-cover rounded-lg'}/>
            </Link>

            <div className={'font-medium py-2'}>
                <h1 >{name}</h1>
                <h2 className={'text-sm text-teal-700'}>
                    {unit_amount !== null ? formatPrice(unit_amount) : 'N/A'}
                </h2>
            </div>
        </div>
    )
}