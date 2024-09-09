import { useEffect, useState } from "react";

export default function LastSalesPage() {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const url = process.env.NEXT_PUBLIC_FB_RTDB_REF_URL;
  useEffect(() => {
    setIsLoading(true);

    fetch(`${url}/sales.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        return response.json();
      })
      .then((data) => {
        const transformedSalesIntoArray = [];

        for (const key in data) {
          transformedSalesIntoArray.push({
            id: key,
            userName: data[key].userName,
            volume: data[key].volume,
          });
        }

        setSales(transformedSalesIntoArray);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(err.message);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <p>Loading..</p>;
  }

  if (!sales || sales.length === 0) {
    return <p>No data yet</p>;
  }

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
