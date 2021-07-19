// copy from https://github.com/lfades/next-with-apollo
import withApollo from 'next-with-apollo';
import moment from "moment";
import ApolloClient, { InMemoryCache } from 'apollo-boost';
import { ApolloProvider } from '@apollo/react-hooks';

export default withApollo(
  ({ initialState, headers }) => {
    return new ApolloClient({
      request: operation => {
        operation.setContext({
          fetchOptions: {
            credentials: 'include'
          },
          headers
        });
      },
      uri: 'http://localhost:3000/graphql',
      cache: new InMemoryCache().restore(initialState || {}),
      resolvers: {
        Portfolio: {
          // 服务器端计算
          daysOfExperience({startDate, endDate}, args, {cache}) {
            let now = moment().unix(); //秒数
            if (endDate) {
              now = endDate / 1000;
            }
            return moment.unix(now).diff(moment.unix(startDate / 1000), 'days');
          }
        }
      }
    });
  },
  {
    render: ({ Page, props }) => {
      return (
        <ApolloProvider client={props.apollo}>
          <Page {...props} />
        </ApolloProvider>
      );
    }
  }
);