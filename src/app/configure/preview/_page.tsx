// import { db } from '@/lib/db'
// import DesignPreview from './DesignPreview'
// import { notFound } from 'next/navigation'
// import { getKindeServerSession } from '@kinde-oss/kinde-auth-nextjs/server'

// type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>

// const Page = async ({ searchParams }: { searchParams: SearchParams }) => {
//     const { getUser } = getKindeServerSession()
//     const user = await getUser()

//     const { id } = await searchParams

//     if (!id || typeof id !== 'string') {
//         return notFound()
//     }

//     const configuration = await db.configuration.findUnique({
//         where: { id },
//     })

//     if (!configuration) {
//         return notFound()
//     };

//     return (
//         <div>
//             <div className='bg-red-700/15 text-red-700 p-4'>Logged in user from server side: {user?.email}</div>
//             <DesignPreview configuration={configuration} />
//         </div>
//     )
// }

// export default Page