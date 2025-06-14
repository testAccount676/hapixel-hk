import { splitText } from "@/lib/split-text";
import { type SharedData } from "@/types";
import { Link, usePage } from "@inertiajs/react";
import { motion } from "framer-motion";
import { type PropsWithChildren } from "react";

interface AuthLayoutProps {
  title?: string;
  description?: string;
}

const appName = import.meta.env.APP_NAME || "Hapixel";
const dashTitle = appName + " Dashboard";
export default function AuthSplitLayout({ children, title, description }: PropsWithChildren<AuthLayoutProps>) {
  const { quote } = usePage<SharedData>().props;
  const charVariants = {
    hidden: { opacity: 0 },
    reveal: { opacity: 1 },
  };
  const authorChars = splitText(quote.author);
  const messageChars = splitText(quote.message);
  const titleChars = splitText(dashTitle);

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="relative grid h-dvh flex-col items-center justify-center px-8 sm:px-0 lg:max-w-none lg:grid-cols-2 lg:px-0"
    >
      <div className="bg-muted relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
        <div className="absolute inset-0 bg-zinc-900" />
        {/*<AnimatedGradientBackground />*/}
        {/*<video*/}
        {/*   autoPlay*/}
        {/*   loop*/}
        {/*   muted*/}
        {/*   playsInline*/}
        {/*   className="absolute inset-0 opacity-50 w-full h-full object-cover"*/}
        {/*>*/}
        {/*   <source src="/assets/videos/bg-video.mp4" type="video/mp4" />*/}
        {/*</video>*/}
        <Link href="#" className="relative z-20 flex items-center text-lg font-medium">
          {/*<AppLogoIcon className="mr-2 size-8 fill-current text-white" />*/}
          <div className="flex items-center gap-x-1 transition-all duration-300 hover:scale-90">
            <motion.img
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              src="/assets/images/icon.png"
              className="mr-2 h-8"
              alt="Icon"
            />
            <motion.p initial="hidden" whileInView="reveal" transition={{ staggerChildren: 0.02 }}>
              {titleChars.map((char) => (
                <motion.span key={char} variants={charVariants} transition={{ duration: 0.5 }}>
                  {char}
                </motion.span>
              ))}
            </motion.p>
          </div>
        </Link>

        {quote && (
          <div className="relative z-20 mt-auto p-2">
            <blockquote className="space-y-2">
              <motion.p initial="hidden" whileInView="reveal" transition={{ staggerChildren: 0.02 }} className="text-lg">
                &ldquo;
                {messageChars.map((char) => (
                  <motion.span key={char} variants={charVariants} transition={{ duration: 0.5 }}>
                    {char}
                  </motion.span>
                ))}
                &rdquo;
              </motion.p>
              <motion.footer initial="hidden" whileInView="reveal" transition={{ staggerChildren: 0.02 }} className="text-sm text-neutral-300">
                {authorChars.map((char) => (
                  <motion.span key={char} variants={charVariants} transition={{ duration: 0.5 }}>
                    {char}
                  </motion.span>
                ))}
              </motion.footer>
            </blockquote>
          </div>
        )}
      </div>
      <div className="w-full lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Link href="#" className="relative z-20 flex items-center justify-center lg:hidden">
            {/*<AppLogoIcon className="h-10 fill-current text-black sm:h-12" />*/}
            <img src="/assets/images/icon.png" className="mr-2 h-10" alt="Icon" />
          </Link>
          <div className="flex flex-col items-start gap-2 text-left sm:items-center sm:text-center">
            <h1 className="text-xl font-medium">{title}</h1>
            <p className="text-muted-foreground text-sm text-balance">{description}</p>
          </div>
          {children}
        </div>
      </div>
    </motion.div>
  );
}
