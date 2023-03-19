import React, { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { toast } from 'react-hot-toast';
import { getAllCourses } from '../service/app';
import { Course } from '../types/Course';
import CoursesItems from '../components/CoursesItems';
import Loader from '../components/Loader';

interface Props {
  itemsPerPage?: number;
}

const Courses = ({ itemsPerPage = 10 }: Props) => {
  const [courses, setCourses] = useState<Course[] | undefined>([]);
  const [currentItems, setCurrentItems] = useState<Course[] | undefined>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getAllCourses();
        setCourses(data);

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      } catch (error: any) {
        const errorMessage = error.toString().split(' ').slice(1).join(' ');
        toast.error(errorMessage);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    if (courses) {
      setCurrentItems(courses.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(courses.length / itemsPerPage));
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [itemOffset, itemsPerPage, courses]);

  const handlePageChange = (event: { selected: number }) => {
    if (courses) {
      const newOffset = (event.selected * itemsPerPage) % courses.length;
      setItemOffset(newOffset);
    }
  };

  return (
    <>
      {currentItems?.length ? (
        <>
          <CoursesItems currentCourses={currentItems} />
          <ReactPaginate
            nextLabel=">"
            onPageChange={handlePageChange}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="<"
            pageClassName="page-item pagination-page"
            pageLinkClassName="page-link"
            previousClassName="page-item previous"
            previousLinkClassName="page-link"
            nextClassName="page-item next"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="page-item active"
            disabledClassName="disabled-page"
          />
        </>
      ) : (
        <Loader />
      )}
    </>
  );
};

export default Courses;
