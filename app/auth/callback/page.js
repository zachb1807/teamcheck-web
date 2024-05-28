import { Suspense } from 'react'
import CallbackPage from './callback.js'


export default async function Page() {
    // Fetch data directly in a Server Component
    //   const recentPosts = await getPosts()
    // Forward fetched data to your Client Component
    return <Suspense><CallbackPage redirect_uri={process.env.redirect_uri}/></Suspense>
}