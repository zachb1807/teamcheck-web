// Import your Client Component
import GetStartedLayout from './get-started-layout'

 
export default async function Page() {

  return <GetStartedLayout client_id={process.env.client_id} redirect_uri={process.env.redirect_uri}/>
}