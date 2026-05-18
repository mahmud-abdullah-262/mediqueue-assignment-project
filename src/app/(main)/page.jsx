import AboutUs from '@/components/AboutUs';
import Banner from '@/components/Banner'
import Categories from '@/components/Categories';
import Comments from '@/components/Comments';
import Counts from '@/components/Counts';
import FeaturedToutors from '@/components/FeaturedTutors';

export default function Home() {
  return (

    <>
    <Banner></Banner>
    <FeaturedToutors></FeaturedToutors>
    <Categories></Categories>
    <Comments></Comments>
    <Counts></Counts>
    <AboutUs></AboutUs>
    </>
  );
}
