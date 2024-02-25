'use server';

export default async function fetchQuery(query: any) {
    const res = await fetch('http://localhost:3000/api/graphql', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            query: query,
        }),
        next: { revalidate: 5 },
    });

    const { data } = await res.json();

    console.log('fetch query', data);
}
