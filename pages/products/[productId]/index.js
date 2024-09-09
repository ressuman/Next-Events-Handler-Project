import path from "path";
import fs from "fs/promises";

export default function ProductsDetailPage({ loadedProduct }) {
  // //This is the instance where fallback is set to true
  if (!loadedProduct) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h1>{loadedProduct.title}</h1>
      <p>{loadedProduct.description}</p>
    </>
  );
}

async function getData() {
  const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  const jsonData = await fs.readFile(filePath);
  const data = JSON.parse(jsonData);

  return data;
}

export async function getStaticProps(context) {
  const { params } = context;

  const productId = params.productId;

  //Loading the data manually
  // const filePath = path.join(process.cwd(), "data", "dummy-backend.json");
  // const jsonData = await fs.readFile(filePath);
  // const data = JSON.parse(jsonData);

  //Loading the data dynamically
  const data = await getData();

  const product = data.products.find((product) => product.id === productId);

  if (!product) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      loadedProduct: product,
    },
  };
}

// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: {
//           productId: "p1",
//         },
//       },
//       {
//         params: {
//           productId: "p2",
//         },
//       },
//       {
//         params: {
//           productId: "p3",
//         },
//       },
//       {
//         params: {
//           productId: "p4",
//         },
//       },
//     ],
//     fallback: false,
//   };
// }

// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: {
//           productId: "p1",
//         },
//       },
//     ],
//     fallback: true,
//   };
// }

// export async function getStaticPaths() {
//   return {
//     paths: [
//       {
//         params: {
//           productId: "p1",
//         },
//       },
//     ],
//     fallback: "blocking",
//   };
// }

export async function getStaticPaths() {
  const data = await getData();

  const ids = data.products.map((product) => product.id);

  const pathWithParams = ids.map((id) => ({
    params: {
      productId: id,
    },
  }));

  return {
    paths: pathWithParams,
    fallback: true,
  };
}
