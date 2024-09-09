import { useEffect, useState } from "react";
import useSWR from "swr";

export default function LastSalesPage() {
  const [sales, setSales] = useState();
  const [loading, setLoading] = useState(false);
  const [isError, setIsError] = useState(null);

  const url = process.env.NEXT_PUBLIC_FB_RTDB_REF_URL;

  const { data, error, isLoading } = useSWR(`${url}/sales.json`);

  useEffect(() => {
    setLoading(true);

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
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setIsError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading..</p>;
  }

  if (isError) {
    return <p>{isError}</p>;
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
