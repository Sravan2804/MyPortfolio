import Image from 'next/image'
import Link from 'next/link'
import { JSX } from 'react';
import highlight from 'sugar-high'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'
import Counter from '@/components/counter'
import { propagateServerField } from 'next/dist/server/lib/render-server';

function Code{children, ...props}: any){
  let codeHTML = highlight(children)
  return <code dangerouslySetInnerHTML={{__html: codeHTML}} {...pr ops} />
}
// You can map HTML elements to custom React components here
const components = {
  code: Code,
  Counter,
}




export default function MDXContent({ source }: { source: string }) {
  return (
    <MDXRemote {...props}
    source={source} components={{...components, ...Code(propagateServerField.components || {})  }} />
  )
}
