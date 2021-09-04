import {supabase} from '../lib/constants/api';

// Get students by course id
const getInfoById = async (table, colums, colum, id) => {
  try {
    const {data} = await supabase.from(table).select(colums).eq(colum, id);
    return (
      (data &&
        data.length && {
          length: data.length,
          data: [...data],
        }) ||
      []
    );
  } catch (e) {
    return [];
  }
};

const getSectionsByCourseId = async (course_id, section_id, sectionName) => {
  try {
    const {data, error} = await supabase
      .from('user_courses')
      .select('course_id')
      .eq('course_id', course_id)
      .eq('section_id', section_id);

    return (
      (data &&
        data.length && {
          total: data.length,
          data: [...data],
          name: sectionName,
        }) ||
      []
    );
  } catch (e) {
    return [];
  }
};

export const getCourseDataChart = async () => {
  // Get all courses
  const {data: courses} = await supabase
    .from('courses')
    .select('course_id,name');

  // Get users by course
  const response = await Promise.all(
    courses.map(item =>
      getInfoById('user_courses', 'course_id', 'course_id', item.course_id),
    ),
  );

  // Create the array for the Course Chart
  return courses.map((item, index) => ({
    x: item.name,
    y: response[index].length,
  }));
};

export const getSectionChartData = async () => {
  // Get all sections
  const {data: sections} = await supabase
    .from('sections')
    .select('section_id,name');

  // Get all courses
  const {data: courses} = await supabase
    .from('courses')
    .select('course_id,name');

  // Get users by course
  const response = await Promise.all(
    courses.map(async item =>
      Promise.all(
        sections.map(element =>
          getSectionsByCourseId(
            item.course_id,
            element.section_id,
            element.name,
          ),
        ),
      ),
    ),
  );

  const data = [];

  // Create data for sections
  response.forEach((item, index) => {
    const courseInfo = courses[index];
    const sectionsByCourse = item.filter(element => element.total > 0);

    data.push({
      course: courseInfo,
      sections: sectionsByCourse.map(item2 => ({
        x: item2.name,
        y: item2.total,
      })),
    });
  });

  return data;
};
