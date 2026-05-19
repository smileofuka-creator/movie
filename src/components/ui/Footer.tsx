import { Film, Import } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full h-[280px] bg-[#4338CA] text-white  md:py-16 mt-[40px]  gap-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 flex flex-col md:flex-row justify-between items-start gap-10 md:gap-4">
        {/* logo heseg */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 cursor-pointer">
            <Film className="w-5 h-5" />
            <span className="font-bold text-lg italic tracking-tight">
              Movie Z
            </span>
          </div>
          <p className="text-sm text-indigo-200">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        {/* dund holboo bari */}
        <div></div>

        {/* social heseg */}
        <div></div>
      </div>
    </footer>
  );
};

export default Footer;
