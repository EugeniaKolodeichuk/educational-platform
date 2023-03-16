import React, { useEffect, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player/dist';
import { useParams } from 'react-router-dom';
import { getCourseInfo } from '../service/app';
import { CourseObject, Lesson } from '../types/Course';
import { AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseObject | undefined>();
  const [videoLesson, setVideoLesson] = useState<number | null>(null);

  useEffect(() => {
    try {
      if (courseId) {
        getCourseInfo(courseId).then(data => {
          console.log('data', data);
          setCourse(data);
        });
      }
    } catch {
      console.error();
    }
    console.log('id', courseId);
  }, [courseId]);

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
          {course.lessons.length &&
            course.lessons.map((lesson: Lesson) => (
              <div key={lesson.id}>
                <p onClick={() => setVideoLesson(lesson.order)}>
                  {lesson.order}. {lesson.title}
                  <span>
                    {lesson.status === 'locked' ? <AiOutlineLock /> : <AiOutlineUnlock />}
                  </span>
                </p>
                {videoLesson === lesson.order && lesson.status === 'unlocked' && (
                  <ReactHlsPlayer
                    src={lesson.link}
                    autoPlay={true}
                    controls={true}
                    width="300px"
                    height="auto"
                  />
                )}
                {videoLesson === lesson.order && lesson.status === 'locked' && (
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
