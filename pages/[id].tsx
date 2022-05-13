import type { NextPage } from 'next'
import { useState, useEffect } from 'react'

import { supabase } from '../utils/supabase'
import { Lesson } from '../types'
import Video from 'react-player'

interface Props {
  lesson: Lesson;
}

const LessonDetails: NextPage<Props> = ({ lesson }) => {
  const [videoUrl, setVideoUrl] = useState('')

  const getPremiumContent = async () => {
    const { data } = await supabase
      .from('premium_content')
      .select('video_url')
      .eq('id', lesson.id)
      .single()

    setVideoUrl(data?.video_url)
  }

  useEffect(() => {getPremiumContent()})

  return (
    <div className='w-full max-w-3xl mx-auto py-16 px-8'>
      <h1 className='text-3xl mb-6'>{lesson.title}</h1>
      <p>{lesson.description}</p>
      {videoUrl &&
      (<div className='mt-12 '>
        <Video className='mx-auto' url={videoUrl}></Video>
      </div>)
      }
    </div>
  )
}

export const getStaticPaths = async () => {
  const {data: lessons} = await supabase.from('lesson').select('id')

  const paths = lessons?.map(({id}) => ({
    params: {
      id: id.toString()
    }
  }))

  return {
    paths,
    fallback: false
  }
}

export const getStaticProps = async ({ params: { id } }: { params: { id: string } }) => {
  const { data: lesson } = await supabase
    .from('lesson')
    .select('*')
    .eq('id', id)
    .single()

  return {
    props: {
      lesson
    }
  }

}

export default LessonDetails
