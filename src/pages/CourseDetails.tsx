import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getCourseInfo } from '../service/app';
import { CourseObject, Lesson } from '../types/Course';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<CourseObject | undefined>();

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
          <img src={`${course.previewImageLink}/cover.webp`} alt="courseImage" />
          <div>
            <video id="video" width="600" data-setup="{}" controls>
              <source src={course.meta.courseVideoPreview.link} type="application/x-mpegURL" />
            </video>
          </div>

          <p>{course.description}</p>
          <p>
            This course contains {course.lessons.length}{' '}
            {course.lessons.length > 1 ? 'lessons' : 'lesson'}:
          </p>
          {course.lessons.length &&
            course.lessons.map((lesson: Lesson) => <p key={lesson.id}>{lesson.title}</p>)}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CourseDetails;
