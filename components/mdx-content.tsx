import { highlight } from 'sugar-high'
import { MDXRemote, MDXRemoteProps } from 'next-mdx-remote/rsc'

function Code({ children, ...props }: React.HTMLAttributes<HTMLElement>) {
  return (
    <code
      dangerouslySetInnerHTML={{ __html: highlight(children as string) }}
      {...props}
    />
  )
}

export default function MDXContent(props: MDXRemoteProps) {
  return (
    <MDXRemote
      {...props}
      components={{ code: Code, ...props.components }}
    />
  )
}
