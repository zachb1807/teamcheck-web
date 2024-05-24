// Import your Client Component
import GetStartedLayout from './get-started-layout'
 
// async function getPosts() {
//   const res = await fetch('https://...')
//   const posts = await res.json()
//   return posts
// }
 
export default async function Page() {
  // Fetch data directly in a Server Component
//   const recentPosts = await getPosts()
  // Forward fetched data to your Client Component
  return <GetStartedLayout client_id={process.env.client_id} redirect_uri={process.env.redirect_uri}/>
}