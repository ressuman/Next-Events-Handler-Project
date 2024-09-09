export default function UserProfilePage({ userName }) {
  return (
    <>
      <h1>{userName}</h1>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const { params, req, res } = ctx;

  return {
    props: {
      userName: "Max",
    },
  };
}
