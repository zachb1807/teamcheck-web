// Import your Client Component
import GetStartedLayout from './get-started-layout'
import GetStartedAuthedLayout from './get-started-layout-authed'
import { cookies } from 'next/headers'

export default async function Page() {
  if (cookies().get('access_token')) {
    return <GetStartedAuthedLayout client_id={process.env.client_id} redirect_uri={process.env.redirect_uri} />
  }
  else {
    return <GetStartedLayout client_id={process.env.client_id} redirect_uri={process.env.redirect_uri} />
  }
}