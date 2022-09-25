import { SessionProvider } from "next-auth/react";
import { AppProps } from "next/app";
import type { Session } from "next-auth";
import "styles/tailwind.css";
import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { config } from "@/lib/reactQueryConfig";

const App = ({
  Component,
  pageProps,
}: AppProps<{ session?: Session | null }>) => {
  const [queryClient] = useState(() => new QueryClient(config));

  return (
    <SessionProvider session={pageProps.session}>
      <QueryClientProvider client={queryClient}>
        <div className="container mx-auto">
          <Component {...pageProps} />
        </div>
      </QueryClientProvider>
    </SessionProvider>
  );
};

export default App;
