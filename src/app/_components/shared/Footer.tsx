import React, { FC } from "react";
import Link from "next/link";

const Footer: FC = () => {
  return (
    <div className="w-full mt-10">
      <div className="w-full flex flex-wrap lg:justify-start items-center min-h-14 text-xs h-full bg-transparent py-4 px-4">
        <span className="w-full text-center">&copy; {new Date().getFullYear()} Powered by <Link href="https://openweathermap.org/" target="_blank">OpenWeather</Link> <span className="mx-1">•</span>
            Developed by <Link href="https://www.linkedin.com/in/quon-shen-wong-20452016a/" target="_blank">Wong Quon Shen</Link>
        </span>
      </div>
    </div>
  );
};

export default Footer;
