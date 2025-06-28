import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/AdminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <>
      <div className="flex bg-[#0d0f1b] min-h-screen text-white">
        <ToastContainer theme="dark" />
        <Sidebar />
        <div className="flex flex-col w-full">
          <div className="flex items-center justify-between w-full py-6 px-8 sm:px-12 border-b border-gray-700 bg-[#1a1d2d] shadow-md">
            <h3 className="text-xl font-semibold gradient-text">Admin Panel</h3>
            <Image src={assets.profile_icon} width={40} height={40} alt='Admin Profile' className="rounded-full" />
          </div>
          <main className="p-5 sm:p-8">{children}</main>
        </div>
      </div>
    </>
  );
}
