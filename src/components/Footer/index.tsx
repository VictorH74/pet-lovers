import Link from "next/link";
import {
  AiFillLinkedin,
  AiFillGithub,
  AiOutlineWhatsApp,
} from "react-icons/ai";

const Footer = () => (
  <footer className="text-center p-2">
    <div className="flex flex-row gap-1 w-fit m-auto p-14">
      <Link className="p-6" href="/">
        <AiFillLinkedin className="icon linkedin-icon" size={35} />
      </Link>
      <Link className="p-6" href="/">
        <AiFillGithub className="icon github-icon" size={35} />
      </Link>
      <Link className="p-6" href="/">
        <AiOutlineWhatsApp className="icon whatsapp-icon" size={35} />
      </Link>
    </div>
    <p className="font-noto-sans">&copy; copyright 2023</p>
  </footer>
);

export default Footer;
