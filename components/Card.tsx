import Image from "next/image";

export const Card = ({ product }: any) => {
  return (
    <div
      key={product.id}
      className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition overflow-hidden"
    >
      <div className="relative h-64 w-full">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
        />
      </div>

      <div className="p-5">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500 mt-1">${product.price}</p>

        <button className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:opacity-90 transition">
          Add to Cart
        </button>
      </div>
    </div>
  );
};
