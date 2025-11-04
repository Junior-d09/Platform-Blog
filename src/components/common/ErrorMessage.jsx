export default function ErrorMessage({ error }) {
  return (
    <div className="bg-red-100 text-red-800 p-4 rounded-md my-4">
      <strong>Erreur :</strong> {error?.message || String(error)}
    </div>
  );
}
