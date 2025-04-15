<<<<<<< HEAD
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({ children }) {
  return (
    <div className={inter.className}>
     
      {children} 
    </div>
  );
=======
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function AppLayout({ children }) {
  return (
    <div className={inter.className}>
     
      {children} 
    </div>
  );
>>>>>>> b43f38ca337779df3873fb8990588679676a5296
}