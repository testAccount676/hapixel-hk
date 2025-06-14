import { appName } from "@/app";

export default function AppLogo() {
  return (
    <>
      <div className="text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-md">
        {/*<AppLogoIcon className="size-5 fill-current text-white dark:text-black" />*/}
        <img src="/assets/images/icon.png" className="bg-transparent" alt="Icon" />
      </div>
      <div className="ml-1 grid flex-1 text-left text-sm">
        <span className="mb-0.5 truncate leading-none font-semibold">{appName} Dashboard</span>
      </div>
    </>
  );
}
