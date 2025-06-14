export function Footer() {
  return (
    <footer className="mb-2 bg-transparent p-4 text-black/30 dark:text-zinc-200">
      <div className="container my-auto">
        <div className="copyright my-auto flex flex-col items-center justify-center text-center text-sm">
          <div>
            <span>
              &copy; All rights reserved, Hapixel Team. Powered by{" "}
              <a href="#" className="underline duration-200 hover:text-blue-500">
                Whyvern Server
              </a>
            </span>
          </div>

          <div>
            <p className="flex items-center">
              Developed by{" "}
              <a href="#" className="underline duration-200 hover:text-blue-500">
                &nbsp;Matthew&nbsp;
              </a>{" "}
              | Server Status: <div className="ml-1 h-3 w-3 animate-pulse rounded-full bg-emerald-500 duration-500 hover:bg-emerald-400"></div>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
