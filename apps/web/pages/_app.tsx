import React from 'react';
import { AppProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';

import { useApollo } from '../graphql/apollo';

export default function App({ Component, pageProps }: AppProps) {
	// For Apollo Client
	const client = useApollo(pageProps.initialApolloState);

	// For React JSS
	// useEffect(() => {
	// 	const style = document.getElementById('jss-server-side');

	// 	if (style) {
	// 		style.parentNode?.removeChild(style);
	// 	}
	// }, []);

	return (
		<ApolloProvider client={client}>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}
