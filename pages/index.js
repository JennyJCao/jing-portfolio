import BaseLayout from "@/layouts/BaseLayout";
import {useGetHighlight} from '@/apollo/actions';
import { getDataFromTree } from '@apollo/react-ssr';
import withApollo from "@/hoc/withApollo";
import PortfolioCard from "@/components/portfolios/PortfolioCard";
import Link from "next/link";
import TopicLink from "@/components/forum/TopicLink";

const useGetInitialData = () => {
  const {data} = useGetHighlight({variables: {limit: 3}});
  const portfolios = (data && data.highlight.portfolios) || [];
  const topics = (data && data.highlight.topics) || [];
  return {portfolios, topics};
}

const Home = () => {

  const {portfolios, topics} = useGetInitialData();
  return (
    <BaseLayout page="Home">
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Portfolios</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="row">
          { portfolios.map(portfolio =>
              <div className="col-md-4" key={portfolio._id}>
                <Link
                  as={`/portfolios/${portfolio._id}`}
                  href="/portfolios/[id]">
                  <a className="card-link">
                    <PortfolioCard portfolio={portfolio}/>
                  </a>
                </Link>
              </div>
            )
          }
        </div>
      </section>
      <Link href="/portfolios">
        <a className="btn btn-main bg-blue ttu">See More Portfolios</a>
      </Link>
      <section className="section-title">
        <div className="px-2">
          <div className="pt-5 pb-4">
            <h1>Ask Me</h1>
          </div>
        </div>
      </section>
      <section className="pb-5">
        <div className="list-group">
          { topics.map(topic =>
              <TopicLink
                topic={topic}
                key={topic._id}/>
            )
          }
        </div>
      </section>
      <Link href="/forum/categories">
        <a className="btn btn-main bg-blue ttu">See More Posts</a>
      </Link>
    </BaseLayout>
  )
}

export default withApollo(Home, {getDataFromTree});
