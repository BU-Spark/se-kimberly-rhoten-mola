'use client';

import Link from 'next/link';

interface Resource {
  id: string;
  Organization_Name?: string;
  Organization_Description?: string;
  // ...any other fields
}

interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  if (!resources || resources.length === 0) {
    return <p>No resources found.</p>;
  }

  return (
    <div style={{ marginTop: '1rem' }}>
      <p>Showing {resources.length} result(s)</p>
      {resources.map((res) => (
        <div
          key={res.id}
          style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}
        >
          <h3>
            <Link href={`/resource/${res.id}`}>
              {/* Display resource name or fallback */}
              {res.Organization_Name || 'Unnamed Resource'}
            </Link>
          </h3>
          {/* Show a short snippet of the description */}
          <p>{res.Organization_Description || 'No description available.'}</p>
        </div>
      ))}
    </div>
  );
}