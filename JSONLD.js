export default {
  '@context': 'http://schema.org/',
  '@type': 'WebApplication',
  name: 'Glif Faucet',
  description: 'Granting FIL to users for testing and development.',
  url: 'https://faucet.glif.io',
  applicationCategory: 'Blockchain wallet',
  operatingSystem: 'All',
  knowsAbout: [
    {
      '@type': 'SoftwareApplication',
      name: 'Filecoin',
      url: 'https://filecoin.io',
      applicationCategory: 'Blockchain network',
      operatingSystem: 'All'
    },
    {
      '@type': 'WebApplication',
      name: 'Glif Wallet',
      description:
        'A web wallet to manage your Filecoin on your Ledger device.',
      applicationCategory: 'Blockchain wallet',
      operatingSystem: 'All'
    },
  ],
  parentOrganization: {
    '@type': 'Organization',
    name: 'Open Work Labs',
    description:
      'A product studio building tools for open work and the distributed web.',
    url: 'https://openworklabs.com',
    sameAs: [
      'https://github.com/openworklabs',
      'https://twitter.com/openworklabs',
      'https://www.are.na/open-work-labs'
    ]
  }
}
