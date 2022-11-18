import {
  ApolloClient,
  DocumentNode,
  InMemoryCache,
  QueryResult,
  useQuery,
} from "@apollo/client";
import { useEffect, useState } from "react";

export const client = new ApolloClient({
  uri: process.env.REACT_APP_API_KEY,
  cache: new InMemoryCache(),
});

export const useFetchData = <T extends any>(query: DocumentNode): T | null => {
  const [state, setState] = useState<null | T>(null);
  const { data, loading } = useQuery(query, { client });

  useEffect(() => {
    setState(data);
  }, [loading]);

  return state;
};
