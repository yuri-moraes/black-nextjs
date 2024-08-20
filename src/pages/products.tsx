import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { Container } from "reactstrap";
import Header from "@/components/Header";
import ProductsList from "@/components/ProductsList";
import { fetchProducts, ProductType } from "@/services/products";

export const getStaticProps: GetStaticProps = async () => {
  const products = await fetchProducts();
  return { props: { products } };
};

type ProductsPageProps = {
  products?: ProductType[];
};

const Products: NextPage<ProductsPageProps> = ({ products }) => {
  return (
    <>
      <Head>
        <title>Nossos Produtos</title>
        <meta name="description" content="Conheça todos os nossos produtos" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main>
        <Container className="mb-5">
          <h1 className="my-5">Nossos Produtos</h1>
          {products ? (
            <ProductsList products={products} />
          ) : (
            <p>Nenhum produto encontrado.</p>
          )}
        </Container>
      </main>
    </>
  );
};

export default Products;
