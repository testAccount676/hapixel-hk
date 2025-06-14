export default function Badges() {
  return (
    <div className="mx-auto grid max-w-5xl grid-cols-[repeat(auto-fill,_minmax(48px,_1fr))] gap-4">
      {Array.from({ length: 100 }, () => (
        <div className="flex h-12 w-12 items-center justify-center rounded bg-zinc-800 p-2 align-middle shadow-md">
          <img
            src="https://cdn.discordapp.com/attachments/1372375857884172399/1377292173862764564/6lWtpQX.gif?ex=68386ecb&is=68371d4b&hm=f555bb0669800d9388ba858a9c6a2c56e8b69761c92a73acb488a84c9006f3a4&"
            alt="asdada"
            className="max-h-full max-w-full"
          />
        </div>
      ))}
    </div>
  );
}
