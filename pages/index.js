import { createClient } from "next-sanity";

export default function IndexPage({ pets }) {
  return (
    <>
      <header>
        <h1>Sanity + Next.js</h1>
      </header>
      <main>
        <h2>pets</h2>
        { pets.length > 0 && (
          <ul>
            { pets.map((pet) => (
              <li key={ pet._id }>{ pet?.name }</li>
            )) }
          </ul>
        ) }
        { !pets.length > 0 && <p>No pets to show</p> }
        { pets.length > 0 && (
          <div>
            <pre>{ JSON.stringify(pets, null, 2) }</pre>
          </div>
        ) }
        { !pets.length > 0 && (
          <div>
            <div>¯\_(ツ)_/¯</div>
            <p>
              Your data will show up here when you've configured everything
              correctly
            </p>
          </div>
        ) }
      </main>
    </>
  );
}

const client = createClient({
  projectId: "bvh7sjvw",
  dataset: "production",
  apiVersion: "2021-10-25",
  useCdn: false,
});

export async function getStaticProps() {
  const pets = await client.fetch(`*[_type == "animal"]`);

  return {
    props: {
      pets,
    },
  };
}
