// app/shops/[shopId]/products/[productId]/edit/page.tsx
import { IconBadge } from "@/components/ui/icon-badge";
import prisma from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { LayoutDashboard, ListChecks } from "lucide-react";
import { redirect } from "next/navigation";
import { Banner } from "@/components/ui/banner";
import { ProductAction } from "../../_components/product-action";
import ProductLocationForm from "../../_components/product-location-form";
import ProductDescriptionForm from "../../_components/product-description-form";
import ProductNameForm from "../../_components/product-name-form";
import ProductCategoryForm from "../../_components/product-category-form";
import ProductPriceForm from "../../_components/product-price-form";
import ProductSellerPhoneForm from "../../_components/product-seller-phone-form";
import ProductImageForm from "../../_components/product-image-form";

interface PageProps {
  params: {
    shopId: string;
    productId: string;
  };
}

export default async function Page({ params }: PageProps) {
  const { userId } = await auth();

  if (!userId) {
    return redirect("/");
  }

  const product = await prisma.product.findUnique({
    where: {
      id: params.productId,
      shopId: params.shopId,
    },
  });

  const categories = await prisma.category.findMany({
    orderBy: {
      name: "asc",
    },
  });

  if (!product) {
    return redirect(`/shops/${params.shopId}/products/create`);
  }

  const requiredFields = [product.name, product.description, product.images, product.location, product.price, product.currency, product.categoryId, product.phone];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields} / ${totalFields}) fields completed`;
  const isCompleted = requiredFields.every(Boolean);

  return (
    <>
      {!product.isPublished && <Banner label="This product is not published. It will not be visible to buyers." />}
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 lg:py-16">
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-y-2">
            <h1 className="text-2xl font-medium">Product Setup</h1>
            <span className="text-sm text-slate-700">{completionText}</span>
          </div>
          <ProductAction disabled={!isCompleted} productId={params.productId} shopId={params.shopId} isPublished={product.isPublished} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 mt-16">
          <div>
            <div className="flex items-center gap-x-2">
              <IconBadge icon={LayoutDashboard} />
              <h2 className="text-xl">Customize your product</h2>
            </div>

            <ProductNameForm initialData={product} shopId={params.shopId} productId={product.id} />
            <ProductDescriptionForm initialData={product} shopId={params.shopId} productId={product.id} />
            <ProductLocationForm
              initialData={{
                ...product,
                location: product.location ?? "",
              }}
              shopId={params.shopId}
              productId={product.id}
            />
            <ProductCategoryForm initialData={product} shopId={params.shopId} productId={product.id} options={categories.map((category) => ({ value: category.id, label: category.name }))} />
          </div>

          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={ListChecks} />
                <h2 className="text-xl">Product Details</h2>
              </div>
              <ProductPriceForm initialData={product} shopId={params.shopId} productId={product.id} />
              <ProductSellerPhoneForm
                initialData={{
                  ...product,
                  phone: product.phone ?? "",
                }}
                shopId={params.shopId}
                productId={product.id}
              />
              <ProductImageForm initialData={product} shopId={params.shopId} productId={product.id} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
