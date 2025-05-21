'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

interface Resource {
  id: string;
  Organization_Name?: string;
  Organization_Description?: string;
  Organization_Address?: string;
  City?: string;
  State?: string;
  Zip_Code?: string;
  Type_Of_Service?: string;
  // ...any other fields
}

interface ResourceListProps {
  resources: Resource[];
}

export default function ResourceList({ resources }: ResourceListProps) {
  const searchParams = useSearchParams();
  const filters = searchParams.get('filters');
  const search = searchParams.get('search');
  
  // Determine what to display in the header
  let filterDisplay = 'All Categories';
  if (filters) {
    // If there are multiple filters, join them with commas
    filterDisplay = filters.split(',').join(', ');
  } else if (search) {
    // If there's a search term but no filters
    filterDisplay = `"${search}"`;
  }

  if (!resources || resources.length === 0) {
    return (
      <p style={{ color: "#000", fontSize: "16px", fontWeight: 500 }}>
        No resources found.
      </p>
    );
  }


  const styles = {
    container: {
      marginTop: '2rem',
      fontFamily: 'Arial, sans-serif',
    },
    header: {
      fontSize: '1.2rem',
      fontWeight: 'normal',
      color: '#333',
      marginBottom: '1.5rem',
      borderBottom: '1px solid #e0e0e0',
      paddingBottom: '1rem',
    },
    resourceList: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '2rem',
    },
    resourceItem: {
      padding: '1.5rem 0',
      borderBottom: '1px solid #e0e0e0',
    },
    resourceHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      marginBottom: '1.5rem',
    },
    resourceTitle: {
      fontSize: '1.75rem',
      fontWeight: 'bold',
      color: '#000',
      margin: 0,
      textDecoration: 'none',
    },
    resourceSubtitle: {
      fontSize: '1.25rem',
      color: '#333',
      margin: '0.5rem 0 0 0',
    },
    resourceAddress: {
      textAlign: 'right' as const,
      fontSize: '1rem',
      lineHeight: '1.5',
    },
    resourceDescription: {
      fontSize: '1rem',
      lineHeight: '1.6',
      color: '#333',
      margin: 0,
    },
    link: {
      textDecoration: 'none',
      color: 'inherit',
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.header}>
        Showing {resources.length} results for: {filterDisplay}
      </h2>
      
      <div style={styles.resourceList}>
        {resources.map((res) => (
          <div key={res.id} style={styles.resourceItem}>
            <div style={styles.resourceHeader}>
              <div>
                <Link href={`/resource/${res.id}`} style={styles.link}>
                  <h3 style={styles.resourceTitle}>
                    {res.Organization_Name || 'Unnamed Resource'}
                  </h3>
                </Link>
                <p style={styles.resourceSubtitle}>
                  {res.Type_Of_Service || ''}
                </p>
              </div>
              
              <div style={styles.resourceAddress}>
                {res.Organization_Address && (
                  <>
                    <div>{res.Organization_Address}</div>
                    <div>
                      {[res.City, res.State, res.Zip_Code]
                        .filter(Boolean)
                        .join(', ')}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            <p style={styles.resourceDescription}>
              {res.Organization_Description || 'No description available.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
