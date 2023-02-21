/* eslint-disable @typescript-eslint/no-shadow */
import { AppProps } from "next/app"
import { useMemo , useEffect, useState} from "react"
import { createOvermind, createOvermindSSR, rehydrate } from "overmind";
import {Provider } from "overmind-react"
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { appWithTranslation } from 'next-i18next';
import { useRouter } from "next/router";
import {config } from "../services/store/config"


function MyApp ({ Component, pageProps }:AppProps) {
  const getDirection = (locale:string) => { 
    if(locale === "ar") { 
      return "rtl";
    }
    return "ltr"
  }
  const {locale} = useRouter()
  const [mutations , setMutations] = useState([]);
  const [queryClient] = useState(() => new QueryClient());
  const overmind = useMemo(() => {
    let overmind
    if (typeof window !== 'undefined') {
      overmind = createOvermind(config)
      rehydrate(overmind.state, mutations)

      // @ts-ignore
      overmind.actions.NextConfig.add.changePage(mutations)
    } else {
      overmind = createOvermindSSR(config)
      rehydrate(overmind.state, mutations)
    }
    return overmind  
  }, [mutations])
  useEffect(()=>{
    setMutations( pageProps.mutations || [])
  },[pageProps.mutations])
  useEffect(() => {
      // @ts-ignore
    overmind.actions.NextConfig.add.changePage(pageProps.mutations || [])
    rehydrate(overmind.state, mutations)
    rehydrate(overmind.state, mutations)
  }, [pageProps.mutations])
  return (
      <Provider value={overmind}>
        <QueryClientProvider client={queryClient}>
        <Component {...pageProps}  dir = {getDirection(locale || "ar")}/>
        <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </Provider>
    )  
}
export default appWithTranslation(MyApp);