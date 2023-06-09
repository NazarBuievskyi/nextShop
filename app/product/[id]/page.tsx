import Image from "next/image";
import {SearchParamsType} from "@/types/SearchParams";
import formatPrice from "@/util/PriceFormat";
import AddCard from "@/app/product/[id]/AddCard";

export default async function Product({searchParams}: SearchParamsType) {
    return (
        <div className={'flex flex-col 2xl:flex-row 2xl:items-start items-center justify-between gap-16'}>
            <Image
                src={searchParams.image}
                alt={searchParams.name}
                width={400}
                height={400}
                priority={true}
                className={'w-full rounded-lg h-full'}
            />
            <div className={'font-medium '}>
                <h1 className={'text-2xl font-medium py-2 '}>{searchParams.name}</h1>
                <p className={'py-2'}>{searchParams.description}</p>
                <p className={'py-2'}>{searchParams.features}</p>
                <div className={'flex gap-2'}>
                    <p className={'font-bold text-primary '}>{searchParams.unit_amount && formatPrice(searchParams.unit_amount)}</p>
                </div>
                <AddCard {...searchParams}/>

            </div>
        </div>
    )
}