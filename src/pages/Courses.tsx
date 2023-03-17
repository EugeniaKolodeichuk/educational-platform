import { useEffect, useState } from 'react';
import ReactPaginate from 'react-paginate';
import { getAllCourses } from '../service/app';
import { Course } from '../types/Courses';
import CoursesItems from '../components/CoursesItems';

const Courses = ({ itemsPerPage = 10 }) => {
  const [courses, setCourses] = useState<Course[] | undefined>([]);
  const [currentItems, setCurrentItems] = useState<Course[] | undefined>([]);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    try {
      getAllCourses().then(data => setCourses(data));
    } catch {
      console.error();
    }
  }, []);

  useEffect(() => {
    const endOffset = itemOffset + itemsPerPage;
    if (courses) {
      setCurrentItems(courses.slice(itemOffset, endOffset));
      setPageCount(Math.ceil(courses.length / itemsPerPage));
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [itemOffset, itemsPerPage, courses]);

  const handlePageClick = (event: { selected: number }) => {
    if (courses) {
      const newOffset = (event.selected * itemsPerPage) % courses.length;
      setItemOffset(newOffset);
    }
  };

  return (
    <>
      <CoursesItems currentCourses={currentItems} />
      {currentItems?.length && (
        <ReactPaginate
          nextLabel=">"
          onPageChange={handlePageClick}
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
      )}
    </>
  );
};

export default Courses;
