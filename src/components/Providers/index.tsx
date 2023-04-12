import fetchJson from "@/lib/fetchJson";
import { SWRConfig } from "swr";
import { SessionProvider } from "next-auth/react";

interface Props {
  session: any;
  children: JSX.Element;
}

export default function Providers(props: Props) {
  return (
    <SessionProvider session={props.session}>
      <SWRConfig
        value={{
          fetcher: fetchJson,
          onError: (err) => {
            console.error(err);
          },
        }}
      >
        {props.children}
      </SWRConfig>
    </SessionProvider>
  );
}
