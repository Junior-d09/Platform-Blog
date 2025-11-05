export default function TestAvatar() {
  return (
    <div className="p-8 flex flex-col items-center gap-6">
      <h1 className="text-2xl font-bold">Test Avatar Tailwind</h1>

      {/* Avatar avec fond rouge */}
      <div className="w-24 h-24 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-xl">
        JD
      </div>

      {/* Avatar avec fond bleu */}
      <div className="w-24 h-24 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xl">
        AB
      </div>

      {/* Avatar avec fond vert */}
      <div className="w-24 h-24 rounded-full bg-green-500 flex items-center justify-center text-white font-bold text-xl">
        XY
      </div>
    </div>
  );
}
