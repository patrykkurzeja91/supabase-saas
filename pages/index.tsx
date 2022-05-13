import type { NextPage } from 'next'
import Link from 'next/link'

import { supabase } from '../utils/supabase'
import { Lesson } from '../types'
import { useUser } from '../context/user'
interface Props {
  lessons: Lesson[];
}
const Home: NextPage<Props> = ({ lessons }) => {
  const { user } = useUser()
  console.log(user);
  return (
    <div className="w-full max-w-3xl mx-auto my-16 px-2">
      {lessons.map(lesson => (
        <Link key={lesson.id} href={`/${lesson.id}`}>
          <a className="p-8 min-h-20 mb-4 rounded shadow text-xl flex">
            {lesson.title}
          </a>
        </Link>
      )
      )}
    </div>
  )
}

export default Home

export const getStaticProps = async () => {
  const { data: lessons } = await supabase.from('lesson').select('*')

  return {
    props: {
      lessons,
    }
  }
}
