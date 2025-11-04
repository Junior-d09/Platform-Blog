export default function Pagination({ page, total, onPrev, onNext, onGoTo }) {
  const pages = Array.from({length: total}, (_, i) => i + 1);
  return (
    <div className="flex items-center gap-2 justify-center mt-6">
      <button onClick={onPrev} disabled={page===1} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Prev</button>
      {pages.map(p=>(
        <button key={p} onClick={()=>onGoTo(p)} className={`px-3 py-1 rounded ${p===page ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}>{p}</button>
      ))}
      <button onClick={onNext} disabled={page===total} className="px-3 py-1 rounded bg-gray-200 disabled:opacity-50">Next</button>
    </div>
  );
}
