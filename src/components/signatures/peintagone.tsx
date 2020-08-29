import React, { useMemo } from 'react';
import { graphql, useStaticQuery } from 'gatsby';

import { SignatureType } from '../../types/signature';

const query = graphql`
  {
    logo: contentfulAsset(title: { eq: "Logo Peintagone" }) {
      file {
        url
      }
    }
    slogan: contentfulAsset(title: { eq: "Slogan Peintagone" }) {
      file {
        url
      }
    }
  }
`;

interface Query {
  logo: {
    file: {
      url: string;
    };
  };
  slogan: {
    file: {
      url: string;
    };
  };
}

interface PeintagoneProps {
  signature: SignatureType;
}

const Peintagone: React.FC<PeintagoneProps> = ({ signature }) => {
  const color = useMemo(() => signature.color || `#535D62`, [signature]);
  const { logo, slogan } = useStaticQuery<Query>(query);

  return (
    <html
      lang="fr"
      id={`signature-${signature.firstName}-${signature.lastName}-peintagone`}
    >
      <head>
        <meta charSet="utf-8" />
        <title>Signature</title>
        <link
          href="https://fonts.googleapis.com/css?family=Montserrat:300,400,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        style={{
          fontFamily: `Montserrat, Helvetica, sans-serif`,
        }}
      >
        <table>
          <tr>
            <td>
              <table>
                <tr>
                  {signature?.avatar && (
                    <td>
                      <img
                        src={signature.avatar?.file?.url}
                        alt={`${signature.firstName} ${signature.lastName}`}
                        width="120"
                        height="120"
                      />
                    </td>
                  )}
                  <td>
                    <table>
                      <tr>
                        <td>
                          <table>
                            <tr>
                              <td
                                style={{
                                  fontWeight: `bold`,
                                  borderRight: signature?.peintagoneTitle
                                    ? `2px solid ${color}`
                                    : undefined,
                                  paddingRight: signature?.peintagoneTitle
                                    ? 5
                                    : undefined,
                                  color: `#535D62`,
                                }}
                              >
                                {signature.firstName}{' '}
                                {signature.lastName.toUpperCase()}
                              </td>
                              {signature?.peintagoneTitle && (
                                <td
                                  style={{
                                    fontSize: 12,
                                    color,
                                  }}
                                >
                                  {signature.peintagoneTitle}
                                </td>
                              )}
                            </tr>
                          </table>
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            fontSize: 12,
                            color,
                            fontWeight: `bold`,
                            paddingBottom: 5,
                            paddingLeft: 5,
                          }}
                        >
                          M : {signature.phone}
                        </td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            fontSize: 12,
                            paddingLeft: 5,
                            color: `#535D62`,
                          }}
                        >
                          Rue de Gembloux 420, BE-5002 Saint-Servais
                        </td>
                      </tr>
                      <tr>
                        <td style={{ paddingLeft: 5 }}>
                          <a
                            href="https://www.peintagone.be"
                            style={{
                              fontSize: 12,
                              color,
                              fontWeight: `bold`,
                              textDecoration: `none`,
                            }}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            www.peintagone.be
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan={2}>
              <table>
                <tr>
                  <td>
                    <img
                      src={logo.file.url}
                      alt="Logo Peintagone"
                      width="174"
                      height="31"
                    />
                  </td>
                  <td>
                    <img
                      src={slogan.file.url}
                      alt="Logo Peintagone"
                      width="285"
                      height="33"
                    />
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td colSpan={2} style={{ paddingLeft: 5, width: 450 }}>
              <p
                style={{
                  fontSize: 8,
                  color: `#ADB5BD`,
                  textAlign: `justify`,
                  width: 465,
                }}
              >
                This email and any attached files are confidential and may be
                legally privileged. If you are not the addressee, any
                disclosure, reproduction, copying, distribution, or other
                dissemination or use of this communication is strictly
                prohibited. If you have received this transmission in error
                please notify the sender immediately and then delete this email.
                Email transmission cannot be guaranteed to be secure or error
                free as information could be intercepted, corrupted, lost,
                destroyed, arrive late or incomplete, or contain viruses. The
                sender therefore does not accept liability for any errors or
                omissions in the contents of this message which arise as a
                result of email transmission. If verification is required please
                request a hard copy version.
              </p>
            </td>
          </tr>
        </table>
      </body>
    </html>
  );
};

export default Peintagone;
