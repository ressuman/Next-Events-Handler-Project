export default function UserProfileDetailsPage({ id }) {
  return (
    <div>
      <h1>{id}</h1>
    </div>
  );
}

export async function getServerSideProps({ params }) {
  //const { params } = ctx;
  const userId = params.userProfileId;

  return {
    props: {
      id: "userId" + userId,
    },
  };
}
