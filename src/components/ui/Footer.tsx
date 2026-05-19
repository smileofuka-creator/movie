import { Film, Import, Mail, Phone } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full h-[280px] bg-[#4338CA] text-white  md:py-16 mt-[40px]  gap-12">
      <div className="max-w-[1440px] mx-auto px-4 md:px-16 flex flex-col md:flex-row justify-between  gap-10 md:gap-4">
        {/* logo heseg */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 cursor-pointer">
            <Film className="w-5 h-5" />
            <span className="font-bold text-lg italic tracking-tight">
              Movie Z
            </span>
          </div>
          <p className="text-sm text-[#FAFAFA]">
            © 2024 Movie Z. All Rights Reserved.
          </p>
        </div>

        {/* dund holboo bari */}
        <div className="flex gap-24 ">
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-[#FAFAFA]">
              Contact Information
            </h4>

            <div className="space-y-3 text-sm">
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4  text-[#FAFAFA]" />
                <div>
                  <p className="font-medium text-[#FAFAFA]">Email:</p>
                  <p className="text-[#FAFAFA] ">support@movieZ.com</p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Phone className="w-4 h-4 mt-0.5 text-[#FAFAFA]" />
              <div>
                <p className="font-medium text-[#FAFAFA]">Phone:</p>
                <p className="text-[#FAFAFA]">+976 (11) 123-4567</p>
              </div>
            </div>
          </div>

          {/* social heseg */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-wider text-[#FAFAFA]">
              Follow us
            </h4>
            <div className="flex flex-col md:flex-row gap-4 md:gap-6 text-sm text-[#FAFAFA]">
              <a
                href="#"
                className="hover:text-white transition-colors font-medium"
              >
                Facebook
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors font-medium"
              >
                Instagram
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors font-medium"
              >
                Twitter
              </a>
              <a
                href="#"
                className="hover:text-white transition-colors font-medium"
              >
                Youtube
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
