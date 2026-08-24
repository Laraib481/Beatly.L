function CollectionCard({ item }) {
  return (
    <div
      className="bg-zinc-900 rounded-3xl overflow-hidden
      hover:-translate-y-2 transition"
    >
      <img
        src={item.image}
        className="h-56 w-full object-cover"
        alt=""
      />

      <div className="p-6">
        <h2 className="text-2xl font-bold">
          {item.title}
        </h2>

        <p className="text-gray-400 mt-2">
          {item.description}
        </p>

        <p className="mt-4 text-amber-300">
          {item.tracks} tracks
        </p>
      </div>
    </div>
  );
}

export default CollectionCard;