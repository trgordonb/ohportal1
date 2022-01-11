import Link from 'next/link'

export default function NotFoundPage() {
  return (
      <div className='m-auto text-center content-center'>
        <h1 className='text-3xl font-bold'>404</h1>
        <h4 className='text-xl'>Sorry, there is nothing here</h4>
        <Link href='/'>Go Back Home</Link>
      </div>
  )
}