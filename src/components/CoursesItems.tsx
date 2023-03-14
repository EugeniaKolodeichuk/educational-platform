import React from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../types/Courses';

interface Props {
  currentCourses?: Course[];
}

const CoursesItems = ({ currentCourses }: Props) => {
  const sortedCourses = currentCourses
    ?.map(course => {
      return { ...course, date: new Date(course.launchDate) };
    })
    .sort((a: any, b: any) => b.date - a.date);

  const getTextFormatting = (text: string) => text.charAt(0).toUpperCase() + text.slice(1);

  return (
    <div>
      <h2>Courses</h2>
      <p>Please choose the course to see information about it</p>
      {currentCourses ? (
        sortedCourses?.map((course: Course) => (
          <div key={course.id}>
            <h3>{course.title}</h3>
            <img src={`${course.previewImageLink}/cover.webp`} width="300px" alt="preview" />
            <p>{course.description}</p>
            <p>
              {`${course.lessonsCount}`} <b>{course.lessonsCount > 1 ? 'lessons' : 'lesson'}</b>
            </p>
            <p>
              <b>rating:</b> {course.rating}
            </p>
            {course.meta?.skills?.length ? (
              <div>
                <b>necessary skills:</b>
                {course.meta.skills.map(skill => (
                  <ul key={uuidv4()}>
                    <li>{getTextFormatting(skill)}</li>
                  </ul>
                ))}
              </div>
            ) : (
              <b>For beginners</b>
            )}
            {course.containsLockedLessons && <b>This course contains locked lessons</b>}
          </div>
        ))
      ) : (
        <p>null</p>
      )}
    </div>
  );
};

export default CoursesItems;
