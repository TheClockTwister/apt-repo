import { Container, MantineProvider, Text, Title, Tooltip, Code } from '@mantine/core';
import { DataTable } from 'mantine-datatable';
import { useEffect, useState } from 'react';
import { formatBytes } from './conversions';
import { CodeHighlight } from '@mantine/code-highlight';

const SCHEME = window.location.protocol
const DOMAIN = window.location.host
const DOMAIN_FRIENDLY = DOMAIN.replace(/:.+/g, '')

interface PackageRaw {
  package?: string
  version?: string
  maintainer?: string
  size?: string
  filename?: string
  description?: string
  mD5sum?: string
  sHA1?: string
  sHA256?: string
  architecture?: string
}

interface PackageGroup {
  package?: string
  version?: string
  maintainer?: string
  description?: string

  architectures: {
    size?: string
    filename?: string
    mD5sum?: string
    sHA1?: string
    sHA256?: string
    architecture?: string
  }[]
}

const bashCode = `
wget -q -O /etc/apt/trusted.gpg.d/${DOMAIN_FRIENDLY}.gpg ${SCHEME}//${DOMAIN}/public.gpg
echo "deb ${SCHEME}//${DOMAIN}/repo /" > /etc/apt/sources.list.d/${DOMAIN_FRIENDLY}.list
apt update
`;


function parseAptPackages(aptOutput: string) {
  const packages: PackageRaw[] = [];
  const packageEntries = aptOutput.split("\n\n");

  packageEntries.forEach(entry => {
    const lines = entry.split("\n");
    const packageObj: any = {};
    lines.forEach(line => {
      const [key, ...valueParts] = line.split(": ");
      const value = valueParts.join(": ");
      // Normalize the key to camelCase
      const normalizedKey = key.replace(/(-)(.)/g, (_, __, letter) => letter.toUpperCase()).replace(/^(.)/, letter => letter.toLowerCase());
      packageObj[normalizedKey] = value;

    });
    if (Object.keys(packageObj).length > 0) { packages.push(packageObj); }

  });

  return packages;
}

function cleanAuthor(author: string) {
  return author
    .replace(/<[^>]+>/g, '')  // Remove the email address
    .replace(/\s\s+/g, ' ')    // Replace multiple spaces with a single space
    .trim();                   // Trim leading and trailing whitespace
}


function groupPackages(packages: PackageRaw[]) {
  const groupedPackages: { [key: string]: PackageGroup } = {};

  packages.forEach(pkg => {
    const key = `${pkg.package}-${pkg.version}`;

    if (!groupedPackages[key]) {
      groupedPackages[key] = {
        package: pkg.package,
        version: pkg.version,
        maintainer: cleanAuthor(pkg.maintainer ?? ''),
        description: pkg.description,
        architectures: []
      };
    }

    const architectureData = {
      size: pkg.size,
      filename: pkg.filename,
      mD5sum: pkg.mD5sum,
      sHA1: pkg.sHA1,
      sHA256: pkg.sHA256,
      architecture: pkg.architecture,
    };

    if (pkg.package != undefined && pkg.version != undefined)
      groupedPackages[key].architectures.push(architectureData);
  });

  return Object.values(groupedPackages);
}



const CustomBadge = ({ left, right, link }: any) => {
  return <a href={link} className='text-xs border border-solid border-gray-600 rounded-lg overflow-hidden no-underline'>
    <div className=' flex '>
      <div className='bg-indigo-600 text-white px-1'>{left}</div>
      <div className='text-indigo-300 px-1'>{right}</div>
    </div>
  </a>
}

export default function App() {

  const [packages, setPackages] = useState<PackageGroup[] | undefined>(undefined)

  useEffect(() => {
    fetch('/repo/Packages').then(res => {
      if (!res.ok) throw new Error("Failed to fetch Packages");
      res.text().then(text => {
        setPackages(groupPackages(parseAptPackages(text)))
      })
    }).catch(() => setPackages([]))
  }, [])

  return (
    <MantineProvider defaultColorScheme="dark">
      <div className='h-screen w-screen py-[10vh] flex flex-col items-center justify-center'>

        <Title mb={'2rem'} order={1} className='mb-1 underline'>{DOMAIN_FRIENDLY} • APT Repository</Title>

        <Title mb={'1rem'} order={2}>Integration into APT</Title>
        <CodeHighlight mb={'2rem'} className="rounded-lg pr-8" code={bashCode} language="bash" />

        <Title mb={'0.5rem'} order={2}>Package Index</Title>
        <Text mb={'1rem'} className='text-sm text-indigo-300'>Use CTRL+F to search. Hover over package title to see description. Click badge to download.</Text>
        <Container size="xl">
          <DataTable
            withTableBorder
            columns={[
              { accessor: 'package', render: p => <Tooltip label={p.description} position="bottom-start" color="dark"><div>{p.package}</div></Tooltip> },
              { accessor: 'version' },
              { accessor: 'maintainer' },
              {
                accessor: 'architectures', title: 'Architectures / Downloads', render: p =>
                  <div className='flex flex-row gap-2'> {
                    p.architectures.map(a => <CustomBadge
                      key={a.architecture} link={`${SCHEME}//${DOMAIN}/repo/${a.filename}`}
                      left={a.architecture} right={formatBytes(Number(a.size), 1)}
                    />)}
                  </div>
              }
            ]}
            records={packages ?? []}
            fetching={packages === undefined}
            emptyState={<Text>No packages detected. Be sure to run the <Code>update-repo</Code> command in the container</Text>}
            loaderColor='grey'
            loaderType='dots'
            minHeight={"30vh"}
            miw="50vw"
          />
        </Container>
        <Text mt={'3rem'} mb={'2rem'} c='dimmed'>
          <a className='no-underline text-indigo-300' target="_blank" href='https://github.com/TheClockTwister/apt-repo'>APT Repo Docker</a> by TheClockTwister | Licensed under MIT</Text>
      </div>
    </MantineProvider>
  );
}
