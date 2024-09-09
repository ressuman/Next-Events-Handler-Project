import { useEffect, useState } from "react";
import useSWR from "swr";

// export default function LastSalesPage() {
//   const [sales, setSales] = useState();
//   // const [loading, setLoading] = useState(false);
//   // const [isError, setIsError] = useState(null);

//   // Fetcher function for useSWR
//   const fetcher = (url) => fetch(url).then((res) => res.json());

//   const url = process.env.NEXT_PUBLIC_FB_RTDB_REF_URL;

//   const { data, error, isLoading } = useSWR(`${url}/sales.json`, fetcher);

//   useEffect(() => {
//     if (data) {
//       const transformedSalesIntoArray = [];

//       for (const key in data) {
//         transformedSalesIntoArray.push({
//           id: key,
//           userName: data[key].userName,
//           volume: data[key].volume,
//         });
//       }

//       setSales(transformedSalesIntoArray);
//     }
//   }, [data]);

//   // useEffect(() => {
//   //   setLoading(true);

//   //   fetch(`${url}/sales.json`)
//   //     .then((response) => {
//   //       if (!response.ok) {
//   //         throw new Error("Failed to fetch data");
//   //       }
//   //       return response.json();
//   //     })
//   //     .then((data) => {
//   //       const transformedSalesIntoArray = [];

//   //       for (const key in data) {
//   //         transformedSalesIntoArray.push({
//   //           id: key,
//   //           userName: data[key].userName,
//   //           volume: data[key].volume,
//   //         });
//   //       }

//   //       setSales(transformedSalesIntoArray);
//   //       setLoading(false);
//   //     })
//   //     .catch((error) => {
//   //       console.error(error);
//   //       setIsError(error.message);
//   //       setLoading(false);
//   //     });
//   // }, []);

//   // if (loading) {
//   //   return <p>Loading..</p>;
//   // }

//   // if (isError) {
//   //   return <p>{isError}</p>;
//   // }

//   // if (!sales || sales.length === 0) {
//   //   return <p>No data yet</p>;
//   // }

//   if (error) return <p>Failed to load</p>;

//   //if (isLoading) return <p>Loading...</p>;

//   if (!data || !sales || isLoading) return <p>Loading...</p>;

//   return (
//     <>
//       <ul>
//         {sales.map((sale) => (
//           <li key={sale.id}>
//             {sale.userName} - ${sale.volume}
//           </li>
//         ))}
//       </ul>
//     </>
//   );
// }

export default function LastSalesPage(props) {
  const [sales, setSales] = useState(props.sales);

  const fetcher = (url) => fetch(url).then((res) => res.json());

  const url = process.env.NEXT_PUBLIC_FB_RTDB_REF_URL;

  const { data, error, isLoading } = useSWR(`${url}/sales.json`, fetcher);

  useEffect(() => {
    if (data) {
      const transformedSalesIntoArray = [];

      for (const key in data) {
        transformedSalesIntoArray.push({
          id: key,
          userName: data[key].userName,
          volume: data[key].volume,
        });
      }

      setSales(transformedSalesIntoArray);
    }
  }, [data]);

  if (error) return <p>Failed to load</p>;

  if (!data && !sales) return <p>Loading...</p>;

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.userName} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
}

export async function getStaticProps() {
  const url = process.env.NEXT_PUBLIC_FB_RTDB_REF_URL;

  // return fetch(`${url}/sales.json`)
  //   .then((response) => {
  //     if (!response.ok) {
  //       throw new Error("Failed to fetch data");
  //     }
  //     return response.json();
  //   })
  //   .then((data) => {
  //     const transformedSalesIntoArray = [];

  //     for (const key in data) {
  //       transformedSalesIntoArray.push({
  //         id: key,
  //         userName: data[key].userName,
  //         volume: data[key].volume,
  //       });
  //     }

  //     return {
  //       props: {
  //         sales: transformedSalesIntoArray,
  //       },
  //       revalidate: 5,
  //     };
  //   });

  const response = await fetch(`${url}/sales.json`);

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  const transformedSalesIntoArray = [];

  for (const key in data) {
    transformedSalesIntoArray.push({
      id: key,
      userName: data[key].userName,
      volume: data[key].volume,
    });
  }

  return {
    props: {
      sales: transformedSalesIntoArray,
    },
    //revalidate: 5,
  };

  // return {
  //   props: {
  //     sales: transformedSalesIntoArray,
  //   },
  //   revalidate: 5,
  // };
}
