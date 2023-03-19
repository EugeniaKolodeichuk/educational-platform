import React from 'react';
import ReactHlsPlayer from 'react-hls-player';
import { Link } from 'react-router-dom';
import { BsFileEarmarkLock2 } from 'react-icons/bs';
import { v4 as uuidv4 } from 'uuid';
import { Course } from '../types/Course';
import Loader from './Loader';

interface Props {
  currentCourses?: Course[];
}

const CoursesItems = ({ currentCourses }: Props) => {
  const sortedCourses = currentCourses
    ?.map(course => {
      return { ...course, date: new Date(course.launchDate) };
    })
    .sort((a: Course, b: Course) => b.date - a.date);

  const getTextFormatting = (text: string) => text.charAt(0).toLowerCase() + text.slice(1);

  return (
    <div className="container mx-auto flex justify-center p-5">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center py-4">
        {currentCourses ? (
          sortedCourses?.map((course: Course) => (
            <div
              key={course.id}
              className="max-w-sm bg-[#ffffffd0] border border-gray-200 rounded-lg shadow"
            >
              <img
                className="rounded-t-lg object-cover h-64"
                src={`${course.previewImageLink}/cover.webp`}
                alt="preview"
                width="100%"
              />
              <div className="p-5">
                <h3 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                  {course.title}
                </h3>
                <p className="mb-3 font-normal text-gray-700">{course.description}</p>
                <div className=" w-full text-gray-900 bg-white border border-gray-200 rounded-lg ">
                  <p className="inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200 rounded-t-lg ">
                    {`${course.lessonsCount}`}

                    <b className="pl-1">
                      {course.lessonsCount && course.lessonsCount > 1 ? 'lessons' : 'lesson'}
                    </b>
                  </p>
                  <p className="inline-flex items-center w-full px-4 py-2 text-sm font-medium border-b border-gray-200">
                    <b className="pr-1">rating:</b> {course.rating}
                  </p>
                  {course.meta?.skills?.length ? (
                    <div className="flex flex-col w-full px-4 py-2 text-sm rounded-b-lg">
                      <b>necessary skills:</b>
                      {course.meta.skills.map(skill => (
                        <ul className="flex flex-col" key={uuidv4()}>
                          <li className="pl-1">{getTextFormatting(skill)}</li>
                        </ul>
                      ))}
                    </div>
                  ) : (
                    <b className="flex flex-col w-full px-4 py-2 text-sm rounded-b-lg">
                      For beginners
                    </b>
                  )}
                </div>
                <div className="bt-1">
                  <b className="flex justify-center w-full px-4 py-2 font-medium pb-1">
                    Lesson preview
                  </b>
                  <ReactHlsPlayer
                    className="w-full max-w-full rounded-lg object-cover h-40"
                    src={course?.meta?.courseVideoPreview?.link}
                    poster={`${course.previewImageLink}/cover.webp`}
                    autoPlay={false}
                    controls={false}
                    width="300px"
                    height="auto"
                    muted
                    onMouseOver={event => event?.currentTarget?.play()}
                    onMouseOut={event => event?.currentTarget?.pause()}
                  />
                </div>
                {course.containsLockedLessons && (
                  <div className="flex items-center">
                    <BsFileEarmarkLock2 />
                    <b className="items-center w-full px-1 py-2 text-sm font-medium">
                      This course contains locked lessons
                    </b>
                  </div>
                )}
                <button
                  type="button"
                  className="flex mt-4 mr-auto ml-auto text-[#FD8469] bg-white border border-[#FD8469] hover:border-gray-300 focus:outline-none hover:bg-[#FD8469] hover:text-white focus:ring-4 focus:ring-gray-200 rounded-lg px-4 py-2 font-medium "
                >
                  <Link to={`/${course.id}`}>More information</Link>
                </button>
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
};

export default CoursesItems;
