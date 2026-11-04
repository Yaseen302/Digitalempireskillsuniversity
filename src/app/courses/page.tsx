import { PageIntro, CTA } from "@/components/ui";
import { courses } from "@/data/courses";
import { site } from "@/data/site";
import CourseBrowser from "@/components/course-browser";
export const metadata = {
  title: "Digital Skills, E-commerce & Marketing Courses in Karachi",
  description:
    "Explore Shopify, Amazon, Etsy, Daraz, WordPress, Meta Ads, graphic design and video editing courses in Karachi. Ask Digital Empire about fees and schedules.",
  alternates: { canonical: "/courses" },
};
export default function Courses() {
  return (
    <>
      <PageIntro
        label="EXPLORE YOUR POSSIBILITIES"
        title="Digital skills courses in Karachi"
        text="Find a learning path that brings your interests, ambitions, and next steps together."
      />
      <CourseBrowser />
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({"@context":"https://schema.org","@type":"ItemList",itemListElement:courses.map((c,i)=>({"@type":"ListItem",position:i+1,url:site.url+"/courses/"+c.slug,item:{"@type":"Course",name:c.title,description:c.description,url:site.url+"/courses/"+c.slug,provider:{"@type":"EducationalOrganization",name:site.name,"@id":site.url+"/#organization"}}}))})}}/><CTA />
    </>
  );
}
