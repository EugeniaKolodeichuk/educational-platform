import React, { useEffect, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player/dist';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';
import { Course, Lesson } from '../types/Course';

interface VideoOptions {
  courseTitle: string;
  lessonOrder: number;
  currentTime: number;
}

interface Props {
  course?: Course;
}

const LessonsItems = ({ course }: Props) => {
  const [lessonNumber, setLessonNumber] = useState<number | null>(null);
  const [startAt, setStartAt] = useState<number>(0);
  const [courseTitle, setCourseTitle] = useState('');

  const savedVideoOptions = localStorage.getItem('videoOptions');
  const currentLesson = savedVideoOptions && JSON.parse(savedVideoOptions).lessonOrder;

  useEffect(() => {
    if (savedVideoOptions) {
      const videoOptions: VideoOptions = JSON.parse(savedVideoOptions);
      setCourseTitle(videoOptions.courseTitle);
      if (courseTitle === course?.title) {
        setStartAt(videoOptions.currentTime);
        setLessonNumber(videoOptions.lessonOrder);

        onLessonVideoPlay(videoOptions.lessonOrder);
      }
    }
  }, [course, courseTitle]);

  const sortedLessons = course?.lessons?.sort((a: Lesson, b: Lesson) => a.order - b.order);

  const onLessonVideoPlay = (lessonOrder: number) => {
    setLessonNumber(lessonOrder);
  };

  const onSaveVideoProgress = (courseTitle: string, lessonOrder: number, currentTime: number) => {
    const videoOptions: VideoOptions = {
      courseTitle,
      lessonOrder,
      currentTime,
    };
    localStorage.setItem('videoOptions', JSON.stringify(videoOptions));
  };

  return (
    <div className="w-full text-gray-900 px-5">
      {course &&
        sortedLessons?.length &&
        sortedLessons.map((lesson: Lesson) => (
          <div key={lesson.id} className="flex flex-col">
            <div className="flex items-center w-full px-4 py-2 sm:font-normal md:text-md max-[767px]:flex-col">
              <p
                className={
                  lesson.order === lessonNumber && lesson.status === 'unlocked' ? 'font-bold' : ''
                }
              >
                Lesson {lesson.order}. {lesson.title}
              </p>
              <span className="pl-2">
                {lesson.status === 'locked' ? <AiOutlineLock /> : <AiOutlineUnlock />}
              </span>
              <button
                disabled={lesson.status === 'locked'}
                type="button"
                className="flex md:ml-auto max-[767px]:mx-auto max-[767px]:mt-1 text-[#FD8469] bg-white border border-[#FD8469] hover:border-gray-300 focus:outline-none hover:bg-[#FD8469] hover:text-white focus:ring-4 focus:ring-gray-200 rounded-lg px-4 py-2 font-medium disabled:cursor-not-allowed disabled:border-gray-500 disabled:text-gray-500 disabled:hover:bg-white"
                onClick={() => onLessonVideoPlay(lesson.order)}
              >
                {lesson.status === 'locked' ? 'Lesson locked' : 'Open Lesson'}
              </button>
            </div>
            {lesson.order === lessonNumber && lesson.status === 'unlocked' && (
              <ReactHlsPlayer
                className="w-full object-cover lg:h-[850px] md:h-[400px] max-[767px]:h-72 max-w-full border border-gray-200 rounded-lg"
                src={lesson.link}
                autoPlay={false}
                controls={true}
                poster={`${lesson.previewImageLink}/lesson-${lesson.order}.webp`}
                onPause={e =>
                  onSaveVideoProgress(course.title, lesson.order, e.currentTarget.currentTime)
                }
                hlsConfig={{
                  startPosition: currentLesson === lesson.order ? startAt : -1,
                }}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default LessonsItems;
