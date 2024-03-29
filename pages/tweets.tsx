import Container from 'components/Container';
import Tweet from 'components/Tweet';
import { getBookmarkedTweets } from 'lib/twitter';

export default function Tweets({ tweets }) {
  return (
    <Container
      title="Tweets"
      description="A collection of tweets that inspire me, make me laugh, and make me think."
      image="unsplash/photo-1463003160077-801f9fd8d095"
      ogTitle="Tweets that inspire me, make me laugh, and make me think."
      preTitle="Check out these Tweets"
    >
      <div className="mx-auto mb-16 flex max-w-2xl flex-col items-start justify-center">
        <h1 className="mb-4 text-3xl font-bold text-black dark:text-white md:text-5xl">
          /tweets
        </h1>
        <p className="mb-4 text-gray-600 dark:text-gray-400">
          This is a collection of tweets I've enjoyed.
        </p>
        {tweets?.map((tweet) => (
          <Tweet key={tweet.id} {...tweet} />
        ))}
      </div>
    </Container>
  );
}

export async function getStaticProps() {
  const tweets = await getBookmarkedTweets();
  // const tweets = await getTweets([
  //   '1308509070140162048',
  //   '1247031847952891904',
  //   '1402689156434776069',
  //   '992629481578745856',
  //   '1471558914579722245',
  //   '1578193236832579585',
  //   '1599544717943123969',
  //   '1595085193253355521',
  //   '1578101851114729472'
  // ]);
  // ids of particular tweets that can be get from the tweet URL

  return { props: { tweets }, revalidate: 60 * 60 * 6 };
}
