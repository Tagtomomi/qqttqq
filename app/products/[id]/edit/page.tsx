import Link from "next/link";
import { notFound } from "next/navigation";
import ProductForm from "@/components/ProductForm";
import { getProductById } from "@/lib/products";
import { updateProductAction } from "../../actions";

interface EditProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProductPage({
  params,
}: EditProductPageProps) {
  const { id } = await params;
  const product = await getProductById(id);

  if (!product) {
    notFound();
  }

  const handleUpdate = updateProductAction.bind(null, id);

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 sm:px-6 sm:py-8">
      <div className="mb-6">
        <Link
          href={`/products/${id}`}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← 상세로
        </Link>
        <h1 className="mt-2 text-2xl font-bold text-gray-900">상품 수정</h1>
      </div>

      <ProductForm initialData={product} onSubmit={handleUpdate} />
    </div>
  );
}
