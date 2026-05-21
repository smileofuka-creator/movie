import { GroupMovie } from "@/components/ui/GroupMovie";
import Footer from "@/components/ui/Footer";
import CustomCarousel from "@/components/ui/CustomCarousel";

const Demo = () => {
  return;

  <div className="flex justify-center flex-col items-center">
    {/* <CustomCarousel /> */}
    <div>Hello Demo</div>
    <div>
      <GroupMovie title="upcoming"></GroupMovie>
      <GroupMovie title="top_rated"></GroupMovie>
      <GroupMovie title="popular"></GroupMovie>
      <Footer></Footer>
    </div>
  </div>;
};

export default Demo;
