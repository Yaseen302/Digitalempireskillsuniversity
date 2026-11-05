import CourseVideo from "@/components/course-video";
import { publishedContent } from "@/lib/cms-server";
import ForexExperience from "@/components/forex-experience";
export const metadata={title:"Forex Trading Course in Karachi | Learn Charts & Risk Management",description:"Explore forex trading education at Digital Empire Skills University in Karachi. Learn market structure, technical analysis, demo practice and risk management. Saddar and Gulshan campuses.",alternates:{canonical:"/forex-trading"}};
export default async function ForexTrading() {
  const { courseVideos } = await publishedContent();
  return <>
    <ForexExperience />
    {courseVideos.forex && <div className="container"><CourseVideo url={courseVideos.forex} title="Forex Trading" /></div>}
  </>;
}
