import '../styles/globals.css'
import {SessionProvider} from "next-auth/react"
// adding session provider to persist the login state
function MyApp({ Component, pageProps :{ session,...pageProps} }) {
  return <SessionProvider session={session}>
    <Component {...pageProps} />
  </SessionProvider>
}

export default MyApp
