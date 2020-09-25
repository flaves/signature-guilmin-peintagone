import React, { useCallback, useMemo, useState } from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/layout';
import SEO from '../components/helpers/seo';
import Peintagone from '../components/signatures/peintagone';
import Guilmin from '../components/signatures/guilmin';

import { SignatureType } from '../types/signature';

export const query = graphql`
  {
    allContentfulSignature(filter: { node_locale: { eq: "fr-BE" } }) {
      edges {
        node {
          id
          firstName
          lastName
          guilminTitle
          peintagoneTitle
          phone
          color
          noAddress
          avatar {
            file {
              url
            }
          }
        }
      }
    }
  }
`;

interface HomeProps {
  data: {
    allContentfulSignature: {
      edges: {
        node: SignatureType;
      }[];
    };
  };
}

const Home: React.FC<HomeProps> = ({ data }) => {
  const [guilmin, setGuilmin] = useState<boolean>(false);

  const signatures = useMemo(
    () => data.allContentfulSignature.edges.map((a) => a.node),
    [data]
  );

  const copyToClipboard = useCallback(
    async (signature: SignatureType) => {
      const content = document.getElementById(
        `signature-${signature.firstName}-${signature.lastName}-${
          guilmin ? `guilmin` : `peintagone`
        }`
      )?.innerHTML;

      content && (await navigator.clipboard.writeText(content));
    },
    [guilmin]
  );

  const renderSignatures = useCallback(
    () => (
      <ul
        style={{
          listStyle: `none`,
          margin: 0,
          padding: 0,
          display: `flex`,
          flexWrap: `wrap`,
        }}
      >
        {signatures.map((signature) => (
          <li key={signature.id} style={{ marginBottom: 30 }}>
            {guilmin ? (
              <Guilmin signature={signature} />
            ) : (
              <Peintagone signature={signature} />
            )}
            <button onClick={() => copyToClipboard(signature)}>
              Copy code to clipboard
            </button>
          </li>
        ))}
      </ul>
    ),
    [guilmin, signatures]
  );

  return (
    <Layout>
      <SEO title="Home" />
      <button onClick={() => setGuilmin(!guilmin)}>Guilmin</button>
      <div>{renderSignatures()}</div>
    </Layout>
  );
};

export default Home;
