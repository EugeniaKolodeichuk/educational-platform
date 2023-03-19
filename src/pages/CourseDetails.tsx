import React, { useEffect, useState } from 'react';
import ReactHlsPlayer from 'react-hls-player/dist';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { getCourseInfo } from '../service/app';
import { Course } from '../types/Course';
import LessonsItems from '../components/LessonsItems';
import Loader from '../components/Loader';

const CourseDetails = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState<Course | undefined>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (courseId) {
          const data = await getCourseInfo(courseId);
          setCourse(data);
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorMessage = error.toString().split(' ').slice(1).join(' ');
        toast.error(errorMessage);
      }
    };

    fetchData();
  }, [courseId]);

  return (
    <div className="container mx-auto flex justify-center flex-col p-5">
      {course ? (
        <div className="bg-[#ffffffd0] border border-gray-200 rounded-lg">
          <ReactHlsPlayer
            className="w-full lg:h-[850px] md:h-[400px] sm:h-72 object-cover max-w-full border border-gray-200 rounded-lg"
            src={course.meta.courseVideoPreview.link}
            poster={`${course.previewImageLink}/cover.webp`}
            autoPlay={false}
            controls={true}
          />
          <h3 className="my-2 text-2xl font-bold tracking-tight text-gray-900 px-5">
            {course.title}
          </h3>
          <p className="font-normal text-gray-700 px-5">{course.description}</p>
          <div className="p-5">
            <p className="inline-flex items-center w-full px-4 pb-2 text-md">
              This course contains {course.lessons.length}{' '}
              {course.lessons.length > 1 ? 'lessons' : 'lesson'}. Choose lesson to start and when
              you paused video - your progress will be saved.
            </p>
            <LessonsItems course={course} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </div>
  );
};

export default CourseDetails;
