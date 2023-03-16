import React, { useEffect, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player/dist';
import { useParams } from 'react-router-dom';
import { getCourseInfo } from '../service/app';
import { CourseObject, Lesson } from '../types/Course';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';

interface VideoOptions {
  courseTitle: string;
  lessonOrder: number;
  currentTime: number;
}

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseObject | undefined>();
  const [lessonNumber, setLessonNumber] = useState<number | null>(null);
  const [startAt, setStartAt] = useState<number>(0);
  const [courseTitle, setCourseTitle] = useState('');

  useEffect(() => {
    try {
      if (courseId) {
        getCourseInfo(courseId).then(data => {
          setCourse(data);
        });
      }
    } catch {
      console.error();
    }
  }, [courseId]);

  const savedVideoOptions = localStorage.getItem('videoOptions');

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
  }, [course]);

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

  const sortedLessons = course?.lessons
    ?.map(lesson => {
      return { ...lesson, order: lesson.order };
    })
    .sort((a: any, b: any) => a.order - b.order);

  return (
    <div>
      {course ? (
        <div>
          <h3>{course.title}</h3>
          <ReactHlsPlayer
            src={course.meta.courseVideoPreview.link}
            poster={`${course.previewImageLink}/cover.webp`}
            autoPlay={false}
            controls={true}
            width="300px"
            height="auto"
          />
          <p>{course.description}</p>
          <p>
            This course contains {course.lessons.length}{' '}
            {course.lessons.length > 1 ? 'lessons' : 'lesson'}:
          </p>
          {sortedLessons?.length &&
            sortedLessons.map((lesson: Lesson) => (
              <div key={lesson.id}>
                <p
                  onClick={() => onLessonVideoPlay(lesson.order)}
                  className={
                    lesson.order === lessonNumber && lesson.status === 'unlocked' ? 'font-bold' : ''
                  }
                >
                  {lesson.order}. {lesson.title}
                  <span>
                    {lesson.status === 'locked' ? <AiOutlineLock /> : <AiOutlineUnlock />}
                  </span>
                </p>
                {lesson.order === lessonNumber && lesson.status === 'unlocked' && (
                  <ReactHlsPlayer
                    src={lesson.link}
                    autoPlay={false}
                    controls={true}
                    width="300px"
                    height="auto"
                    onPause={e =>
                      onSaveVideoProgress(course.title, lesson.order, e.currentTarget.currentTime)
                    }
                    hlsConfig={{
                      startPosition:
                        savedVideoOptions &&
                        JSON.parse(savedVideoOptions).lessonOrder === lesson.order
                          ? startAt
                          : -1,
                    }}
                  />
                )}
                {lesson.order === lessonNumber && lesson.status === 'locked' && (
                  <p>This lesson locked</p>
                )}
              </div>
            ))}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CourseDetails;
